"""Raw SQLite writes into the Django-owned database (shared file, WAL mode).
Mirrors mentee_agent/database.py — the chat agent persists transcripts and
chat-captured leads directly into the tables Django created."""
import json
import os
import sqlite3
from datetime import datetime, timezone

DB_PATH = os.environ.get('DB_PATH', '/data/browne.sqlite3')


def _now():
    return datetime.now(timezone.utc).isoformat()


def _connect():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.execute('PRAGMA busy_timeout=5000;')
    return conn


def save_transcript(session_id, role, content, page=None):
    """Append one chat turn to leads_chattranscript."""
    try:
        conn = _connect()
        conn.execute(
            'INSERT INTO leads_chattranscript '
            '(session_id, role, content, page, created_at) VALUES (?, ?, ?, ?, ?)',
            (session_id, role, content, page, _now()),
        )
        conn.commit()
        conn.close()
    except Exception as e:
        print(f'[db] save_transcript failed: {e}', flush=True)


def upsert_chat_lead(session_id, fields, source_page=None):
    """Insert or update the kind='chat' lead for this session."""
    name = fields.get('name')
    email = fields.get('email')
    company = fields.get('company')
    message = fields.get('interest') or fields.get('notes')
    try:
        conn = _connect()
        cur = conn.cursor()
        cur.execute(
            "SELECT id FROM leads_lead WHERE kind='chat' AND session_id=? LIMIT 1",
            (session_id,),
        )
        row = cur.fetchone()
        if row:
            cur.execute(
                'UPDATE leads_lead SET '
                'name=COALESCE(?, name), email=COALESCE(?, email), '
                'company=COALESCE(?, company), message=COALESCE(?, message) '
                'WHERE id=?',
                (name, email, company, message, row[0]),
            )
        else:
            cur.execute(
                'INSERT INTO leads_lead '
                '(kind, created_at, name, email, phone, company, company_website, '
                'industry, country, subject, inquiry_type, product_ids, quantity, '
                'estimated_annual_volume, delivery_timeline, target_price, '
                'quality_requirements, application, message, extra, source_page, '
                'session_id, ip) '
                "VALUES ('chat', ?, ?, ?, NULL, ?, NULL, NULL, NULL, NULL, NULL, "
                "'[]', NULL, NULL, NULL, NULL, NULL, NULL, ?, ?, ?, ?, NULL)",
                (_now(), name, email, company, message,
                 json.dumps(fields), source_page, session_id),
            )
        conn.commit()
        conn.close()
    except Exception as e:
        print(f'[db] upsert_chat_lead failed: {e}', flush=True)
