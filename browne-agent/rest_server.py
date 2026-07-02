"""FastAPI WebSocket chat server. Simple phased lead-capture flow, modeled on
MenteeCollege: greeting -> name -> phone -> free chat. One short question at a
time; collect the lead first, then answer GHK-Cu questions.

Protocol: client sends {"page": ..., "session_id": ...} first, then
{"message": ..., "page": ...}; server replies {"type": "bot_message", "message": ...}."""
import logging
import re

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

import agent
import database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title='BrowneBioactives Chat Agent')
app.add_middleware(
    CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'],
)

GREETING = ("Hey, thanks for checking out BrowneBioactives! We make Copper Tripeptide (GHK-Cu) "
            "here in the USA. Can I get your name so our team can follow up?")

QUESTION_HINTS = ('?', 'how', 'what', 'price', 'cost', 'much', 'tell me', 'do you', 'can you',
                  'is it', 'ghk', 'sample', 'ship', 'moq', 'purity', 'where')


def _looks_like_question(msg):
    m = msg.lower()
    return any(h in m for h in QUESTION_HINTS)


def _clean_name(msg):
    m = re.sub(r"(?i)^(hi|hey|hello|my name is|i am|i'm|this is|it's|name is)\b[\s,:-]*", '', msg).strip()
    return (m or msg).strip()[:120]


@app.get('/health')
async def health():
    return {'status': 'ok'}


@app.websocket('/ws/chat/')
async def chat(ws: WebSocket):
    await ws.accept()
    history = []
    session_id = None
    page = None
    phase = 'name'
    lead = {}

    async def say(text):
        await ws.send_json({'type': 'bot_message', 'message': text})
        database.save_transcript(session_id, 'assistant', text, page)

    try:
        first = await ws.receive_json()
        page = first.get('page')
        session_id = first.get('session_id') or f'ws-{id(ws)}'
        await say(GREETING)

        while True:
            data = await ws.receive_json()
            user_msg = (data.get('message') or '').strip()
            page = data.get('page', page)
            if not user_msg:
                continue
            database.save_transcript(session_id, 'user', user_msg, page)

            # --- Phase: collect name ---
            if phase == 'name':
                if _looks_like_question(user_msg):
                    reply = await _safe_respond(session_id, history, page, user_msg)
                    await say(reply + " By the way, what's your name?")
                    continue
                lead['name'] = _clean_name(user_msg)
                database.upsert_chat_lead(session_id, lead, source_page=page)
                phase = 'phone'
                await say(f"Thanks, {lead['name']}! What's the best phone number for our team to reach you at?")
                continue

            # --- Phase: collect phone ---
            if phase == 'phone':
                if _looks_like_question(user_msg) and not re.search(r'\d{3}', user_msg):
                    reply = await _safe_respond(session_id, history, page, user_msg)
                    await say(reply + " And what's a good phone number for you?")
                    continue
                lead['phone'] = user_msg[:40]
                database.upsert_chat_lead(session_id, lead, source_page=page)
                phase = 'chat'
                await say("Perfect, we'll be in touch. Anything you want to know about GHK-Cu while you're here?")
                continue

            # --- Phase: free chat (GHK-Cu Q&A, still capturing any details) ---
            history.append({'role': 'user', 'content': user_msg})
            reply = await _safe_respond_hist(session_id, history, page)
            history.append({'role': 'assistant', 'content': reply})
            await say(reply)

    except WebSocketDisconnect:
        return
    except Exception:
        logger.exception('websocket error')
        try:
            await ws.close()
        except Exception:
            pass


async def _safe_respond(session_id, history, page, one_off):
    """Answer a single question without disturbing the collect-info flow."""
    return await _safe_respond_hist(session_id, history + [{'role': 'user', 'content': one_off}], page)


async def _safe_respond_hist(session_id, history, page):
    try:
        return await agent.respond(session_id, history, page)
    except Exception:
        logger.exception('agent.respond failed')
        return ("Sorry, I hit a snag. You can also use the sample-request form and the team "
                "will reach out.")
