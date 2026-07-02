# Task Management Module - Implementation Plan

**Project:** Browne Bioactives
**Scope:** First-class task tracking for lab work, orders, deadlines, and operational TODOs. Tasks are auto-generated from batch/inventory/order events; the operator's daily view is a filtered task list.

---

## Critical context: backend does not exist yet

`~/projects/BrowneBioactives/` currently contains two **Vite/React/TS frontends** (`browne-bioactives` + `browne-bioactives-consumer`), served as static files by nginx. **There is no Django backend in this project.**

Therefore, this is not "add a tasks app" - it is **"stand up the entire backend, with Tasks as the first feature."** The plan reflects that.

The spec also references `Construct`, `Strain`, `Sample`, `BatchEvent`, `Inventory`, `Order` entities that do not exist as models. Auto-generation signals require a source. Approach: stub minimal versions of each FK target now, flesh them out later.

---

## Open questions (answer before code)

1. **Tenancy** - single-tenant for now, or real multi-tenancy from day one? (Affects architecture: row-level filter vs `django-tenants` schema-per-tenant.)
2. **Auth source of truth** - fresh Django auth, or share user table with `thestemcenter` backend? (Recommend fresh - different product.)
3. **Existing entity sketches** - is there a schema doc for `Construct/Strain/Sample/BatchEvent/Inventory/Order` to read? Otherwise stubs are `(id, name, tenant_id, created_at)` only.
4. **Daily digest 7am "local time"** - per-user timezone, or one server-wide TZ?
5. **Slack integration** - per-user webhook, or org-wide webhook?
6. **Production host** - same server as everything else, in a new docker-compose stack? Or elsewhere?

---

## Phase 0 - Backend bootstrap (prerequisite)

Create `~/projects/BrowneBioactives/browne-bioactives-api/`:

- Django 5 project named `bbcore`
- DRF + django-filter + drf-spectacular (OpenAPI)
- PostgreSQL 16 (reuse existing postgres container, separate database)
- Redis (already running) + Celery + Celery Beat
- `django-environ`, `simplejwt` for JWT auth (frontend) + DRF session auth (admin)
- Containerize: `Dockerfile`, `docker-compose.yml` (api + worker + beat)
- Nginx: new subdomain `api.brownebioactives.com` → proxy to container

**Deliverable:** healthy `GET /api/healthz` and `GET /api/schema/` responding.

---

## Phase 1 - Domain stubs (so signals can fire)

New apps, each with a stub model exposing only `(id, name, tenant_id, timestamps)`:

```
apps/
  constructs/
  strains/
  samples/
  batches/        # contains BatchEvent
  inventory/
  orders/
```

`BatchEvent` carries the discriminator field `kind` ∈ `{INOCULATION, INDUCTION, HARVEST, HPLC_RUN, ...}` and a JSONB `payload` so signal handlers can pull `duration_h` etc. without proper schemas existing yet.

**Deliverable:** stub admin pages for each entity; FKs work.

---

## Phase 2 - Tasks app (core feature)

`apps/tasks/`:

### Models

- **`Task`** - fields per spec (status, priority, category enums; due/started/completed timestamps; estimated/actual minutes; assignee, created_by; tenant_id; deleted_at for soft delete; nullable FKs to all six domain entities; `parent_task_id` for subtasks; `blocked_by` M2M with `through` model for audit; `recurrence_rule` (RRULE string); `recurrence_parent_id`; `checklist` JSONB array of `{text, done, done_at, done_by}`; `tags` M2M)
- **`TaskComment`** - append-only audit trail (markdown body)
- **`TaskTemplate`** - name, category, defaults, default_checklist (JSONB), default_tags
- **`Tag`** - use `django-taggit` rather than rolling our own

### Indexes

- `(status, due_date)`, `(assignee, status)`, `(category, status)`

### Helpers

- `Task.next_occurrence()` - parses `recurrence_rule` via `dateutil.rrule.rrulestr`
- Custom default manager filters `deleted_at IS NULL`

### API

Standard DRF ModelViewSet plus custom actions:

| Endpoint | Method | Behavior |
|---|---|---|
| `/api/tasks/today` | GET | assignee=me, due today or overdue, status not done/cancelled, sorted by priority then due_date |
| `/api/tasks/board` | GET | grouped by status (Kanban) |
| `/api/tasks/upcoming?days=7` | GET | next N days |
| `/api/tasks/blocked` | GET | unresolved blocked_by |
| `/api/tasks/{id}/start` | POST | sets started_at, status=in_progress |
| `/api/tasks/{id}/complete` | POST | sets completed_at, status=done; accepts actual_minutes |
| `/api/tasks/from-template/{template_id}` | POST | instantiate from template |
| `/api/tasks/bulk-update` | POST | change status/assignee/priority for many |

**Filter params:** status, priority, category, assignee, due_before, due_after, has_tag, linked_to_construct, linked_to_batch, search (full-text title+description).

**Sparse fieldsets:** use `drf-flex-fields` for `?fields=title,status,priority,...` (recommended over rolling our own).

### Permissions

- Within tenant scope: assignee or creator can edit; others read-only.

### Seed templates (fixture)

`apps/tasks/fixtures/task_templates.json`:

- "Inoculate starter culture" - category: expression, est: 15 min, checklist: [pull glycerol stock, prep LB+kan, inoculate 5 mL, label, 37°C overnight]
- "Run HPLC sample" - category: qc, est: 30 min
- "Reorder kanamycin" - category: ordering
- "Weekly freezer check" - category: maintenance, recurrence: weekly
- "Pack and ship customer order" - category: sales

---

## Phase 3 - Auto-generation signals

`apps/tasks/signals.py` - Django signal handlers on `BatchEvent`/`Inventory`/`Order`:

| Trigger | Generated Task | Due-date logic |
|---|---|---|
| `BatchEvent.kind=INOCULATION` (post_save) | "Check OD600 in 3-4 hours" | `inoculation_time + 3h` |
| `BatchEvent.kind=INDUCTION` | "Harvest cells" | `induction_time + payload.duration_h` |
| `BatchEvent.kind=HARVEST` | "Lyse and load Ni-NTA column" | now + 2h |
| `BatchEvent.kind=HPLC_RUN` with QC fail | "Investigate failed QC for sample {id}" (priority=high) | now + 24h |
| `Inventory.consumed` dropping below `reorder_threshold` | "Reorder {item}" with vendor/cat# pre-filled | now + 3 days |
| `Order.shipment_scheduled` | "Pack and ship {customer}" | shipment_scheduled_for |

All auto-generated tasks:

- `tags = ['auto-generated']`
- description includes source `event_id`
- `created_by = system_user`

---

## Phase 4 - Daily digest (Celery Beat)

`apps/tasks/tasks_celery.py`:

- **`daily_digest_dispatch`** - Beat schedule: every 15 minutes. Iterates users where `local_time == 7:00am`, fans out to per-user tasks. (Cleanly handles per-user timezones without global cron.)
- **`daily_digest(user_id)`** - 
  - Pulls today + overdue tasks for that user
  - Renders Markdown → plaintext + HTML (use `markdown` + `bleach` for sanitization)
  - Sends email via Django's SMTP backend
  - If `user.profile.slack_webhook_url` set, also POSTs Slack message
- **Format example:** `"You have 4 tasks today: 1 urgent (Reorder kanamycin), 2 expression (check OD batch BB-008, harvest BB-007), 1 admin (file invoice)"`

---

## Phase 5 - Tests

`apps/tasks/tests/` - pytest + pytest-django + factory_boy:

- `test_models.py` - Task lifecycle, soft-delete, `blocked_by` graph
- `test_recurrence.py` - RRULE parsing, DST transitions, edge cases
- `test_signals.py` - parametrized: each event → correct task + due_date math
- `test_api_endpoints.py` - custom actions, filter params, sparse fieldsets
- `test_blocking.py` - completing a task with `blocked_by` relations cascades unblock to dependents
- `test_digest.py` - markdown render, timezone correctness, email + Slack mocked

---

## Phase 6 - Frontend integration prep (no UI yet)

- `drf-spectacular` generates `/api/schema/` (OpenAPI 3)
- `openapi-typescript` regenerates `bb-api.types.ts` for the React frontend
- Write `apps/tasks/README.md` mapping spec column → API source:

| Column | API Source | Notes |
|---|---|---|
| Title | `title` | Click to expand |
| Status | `status` | Color-coded badge |
| Priority | `priority` | Sortable, color-coded |
| Category | `category` | Filterable |
| Due | `due_date` | Highlight overdue red |
| Assignee | `assignee.name` | |
| Linked to | computed | "BB-007 batch" / "GHK construct" / "Sigma order" |
| Est. time | `estimated_minutes` | |
| Actual time | `actual_minutes` | Only shown if done |
| Subtasks | computed `{done}/{total}` | From children + checklist |
| Tags | `tags[]` | Pill display |
| Created | `created_at` | |
| Updated | `updated_at` | |

List endpoint MUST: aggressive `select_related` + `prefetch_related` to keep table snappy with thousands of tasks; sparse fieldsets via `?fields=` to reduce payload.

---

## Pushback / spec concerns

- **`TaskComment.edited_at` without history** silently loses prior content. Recommend: keep comments append-only; treat edits as new comments. (Or add a separate `TaskCommentEdit` table if real edit history is required.)
- **Sparse fieldsets** add complexity for marginal benefit when pages are paginated to ≤50 rows. Keep in plan but de-prioritize if Phase 2 runs long.
- **`actual_minutes` prompt on complete** is a frontend UX concern, not a backend one. Backend exposes the field; React modal handles the prompt.
- **Markdown rendering** - server stores raw markdown in description/comments; frontend renders. Server-side rendering only inside the digest job.

---

## Effort estimate

| Phase | Days |
|---|---|
| 0 - Bootstrap | 1 |
| 1 - Domain stubs | 0.5 |
| 2 - Tasks core | 2-3 |
| 3 - Signals | 1 (meaningful once events exist) |
| 4 - Daily digest | 1 |
| 5 - Tests | 1 (woven through, +1 dedicated) |
| 6 - Frontend prep | 0.5 |
| **Total (single-tenant v1)** | **~6-8 working days** |
| Multi-tenant alternative | +2-3 days |

---

## Recommended sequencing

1. Answer open questions, especially #1 (tenancy) and #3 (existing entity sketches)
2. Phase 0 in one sitting - deployable backend skeleton
3. Phase 1 stubs in parallel with starting Phase 2
4. Ship Phases 2+5 together (tasks + tests) as v1 - can be used standalone via Django admin
5. Phase 3 + 4 follow once domain events start firing in earnest
6. Phase 6 once frontend team is ready to consume the API
