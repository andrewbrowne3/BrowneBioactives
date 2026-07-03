import { useEffect, useRef, useState, useCallback } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { chatSocketUrl, getSessionId } from '../api/client';
import './ChatWidget.css';

interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
}

// React port of MenteeCollege's chat.js: auto-opens after a delay, connects to
// the FastAPI agent over WebSocket, shows a typing indicator.
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const openedOnce = useRef(false);

  const connect = useCallback(() => {
    if (socketRef.current) return;
    const ws = new WebSocket(chatSocketUrl());
    socketRef.current = ws;
    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({ page: window.location.pathname, session_id: getSessionId() }));
      setTyping(true);
    };
    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        if (data.type === 'bot_message') {
          setTyping(false);
          setMessages((m) => [...m, { from: 'bot', text: data.message }]);
        }
      } catch {
        /* ignore */
      }
    };
    ws.onclose = () => {
      setConnected(false);
      socketRef.current = null;
    };
    ws.onerror = () => setTyping(false);
  }, []);

  const openChat = useCallback(() => {
    setOpen(true);
    openedOnce.current = true;
    connect();
  }, [connect]);

  // Auto-open once, either on exit-intent (cursor leaving toward the tab bar)
  // or after a longer idle delay. Catches visitors about to bounce without
  // nagging serious evaluators the moment they land.
  useEffect(() => {
    const maybeOpen = () => {
      if (!openedOnce.current) openChat();
    };
    // Exit-intent: pointer leaves the top of the viewport (toward tabs/back).
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) maybeOpen();
    };
    // Idle fallback (also covers touch devices that never fire mouseout).
    const t = setTimeout(maybeOpen, 25000);
    document.addEventListener('mouseout', onMouseOut);
    return () => {
      clearTimeout(t);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [openChat]);

  // Keep scrolled to the latest message
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [messages, typing]);

  useEffect(() => () => socketRef.current?.close(), []);

  const send = () => {
    const text = input.trim();
    const ws = socketRef.current;
    if (!text || !ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ message: text, page: window.location.pathname }));
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');
    setTyping(true);
  };

  if (!open) {
    return (
      <button className="bb-chat-launch" onClick={openChat} aria-label="Open chat">
        <MessageCircle size={26} />
      </button>
    );
  }

  return (
    <div className="bb-chat">
      <div className="bb-chat-header">
        <span>BrowneBioactives Assistant</span>
        <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
      </div>
      <div className="bb-chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`bb-msg ${m.from}`}>
            <div className="bb-bubble">{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="bb-msg bot">
            <div className="bb-bubble bb-typing"><span></span><span></span><span></span></div>
          </div>
        )}
      </div>
      <div className="bb-chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          placeholder={connected ? 'Ask about our ingredients…' : 'Connecting…'}
          disabled={!connected}
        />
        <button onClick={send} disabled={!connected} aria-label="Send"><Send size={18} /></button>
      </div>
    </div>
  );
}
