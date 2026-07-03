import axios from 'axios';

// Same-origin in production (nginx proxies /api and /ws/chat to the backend).
// In dev, Vite proxies these to localhost:5030 / :5031 (see vite.config.ts).
const BASE = import.meta.env.VITE_API_BASE || '';

export const api = axios.create({ baseURL: BASE });

export type LeadKind = 'contact' | 'sample' | 'bulk_quote' | 'quick' | 'meeting';

// Submit any inquiry form. Extra props are passed through and stored server-side.
export async function postLead(kind: LeadKind, data: Record<string, unknown>) {
  const payload = {
    kind,
    source_page: typeof window !== 'undefined' ? window.location.pathname : undefined,
    session_id: getSessionId(),
    ...data,
  };
  const res = await api.post('/api/leads', payload);
  return res.data as { ok: boolean; id: number };
}

// Stable per-browser id, shared with the visitor tracker + chat widget.
export function getSessionId(): string {
  const KEY = 'bb_session_id';
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = (crypto?.randomUUID?.() as string) || 'bb_' + Math.random().toString(36).slice(2);
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return 'bb_' + Math.random().toString(36).slice(2);
  }
}

// WebSocket URL for the chat agent (same host, /ws/chat/).
export function chatSocketUrl(): string {
  if (import.meta.env.VITE_WS_URL) return import.meta.env.VITE_WS_URL as string;
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${window.location.host}/ws/chat/`;
}
