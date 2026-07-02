"""Claude-powered chat turn with a manual capture_lead tool loop."""
import os

import anthropic

from catalog import SYSTEM_PROMPT, CAPTURE_LEAD_TOOL
import database

MODEL = os.environ.get('BROWNE_MODEL', 'claude-haiku-4-5')

_client = anthropic.AsyncAnthropic(api_key=os.environ.get('ANTHROPIC_API_KEY'))


async def respond(session_id, history, page):
    """history is a list of {"role","content"} dicts. Returns the assistant's
    reply text, running the capture_lead tool loop as needed."""
    messages = list(history)

    for _ in range(4):  # safety cap on tool round-trips
        resp = await _client.messages.create(
            model=MODEL,
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            tools=[CAPTURE_LEAD_TOOL],
            messages=messages,
        )

        text_parts = [b.text for b in resp.content if b.type == 'text']
        tool_uses = [b for b in resp.content if b.type == 'tool_use']

        if not tool_uses:
            return ' '.join(t.strip() for t in text_parts if t.strip()).strip() \
                or ("Happy to help! Want me to have our team send you a free GHK-Cu sample and a "
                    "quote? What's the best email to reach you at?")

        # Execute the capture_lead tool(s), feed results back, loop for the final text
        messages.append({'role': 'assistant', 'content': resp.content})
        results = []
        for tu in tool_uses:
            if tu.name == 'capture_lead':
                database.upsert_chat_lead(session_id, tu.input or {}, source_page=page)
                results.append({
                    'type': 'tool_result',
                    'tool_use_id': tu.id,
                    'content': 'Saved. Thank the visitor and let them know the team will follow up.',
                })
            else:
                results.append({
                    'type': 'tool_result',
                    'tool_use_id': tu.id,
                    'content': 'Unknown tool.',
                    'is_error': True,
                })
        messages.append({'role': 'user', 'content': results})

    return ("Thanks! I've noted that down and the team will follow up soon. What's the best "
            "email for them to reach you at?")
