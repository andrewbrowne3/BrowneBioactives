"""FastAPI WebSocket chat server. Protocol matches the ported chat widget:
client sends {"page": ...} first, then {"message": ..., "page": ...};
server replies {"type": "bot_message", "message": ...}."""
import logging

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

GREETING = ("Hey, thanks for stopping by BrowneBioactives! We make Copper Tripeptide (GHK-Cu) "
            "right here in the USA. What are you formulating? I'd love to get a free sample and "
            "a quote sent your way.")


@app.get('/health')
async def health():
    return {'status': 'ok'}


@app.websocket('/ws/chat/')
async def chat(ws: WebSocket):
    await ws.accept()
    history = []
    session_id = None
    page = None
    try:
        # First frame carries the current page for context + the session id
        first = await ws.receive_json()
        page = first.get('page')
        session_id = first.get('session_id') or f'ws-{id(ws)}'
        await ws.send_json({'type': 'bot_message', 'message': GREETING})
        database.save_transcript(session_id, 'assistant', GREETING, page)

        while True:
            data = await ws.receive_json()
            user_msg = (data.get('message') or '').strip()
            page = data.get('page', page)
            if not user_msg:
                continue

            history.append({'role': 'user', 'content': user_msg})
            database.save_transcript(session_id, 'user', user_msg, page)

            try:
                reply = await agent.respond(session_id, history, page)
            except Exception as e:
                logger.exception('agent.respond failed')
                reply = "Sorry, I hit a snag. Please try again, or use the sample-request form and the team will reach out."
                await ws.send_json({'type': 'bot_message', 'message': reply})
                continue

            history.append({'role': 'assistant', 'content': reply})
            database.save_transcript(session_id, 'assistant', reply, page)
            await ws.send_json({'type': 'bot_message', 'message': reply})

    except WebSocketDisconnect:
        return
    except Exception:
        logger.exception('websocket error')
        try:
            await ws.close()
        except Exception:
            pass
