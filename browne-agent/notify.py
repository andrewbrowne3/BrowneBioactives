"""Email alert for chat-captured leads. The FastAPI agent writes leads straight
into the shared SQLite (bypassing Django), so it also has to send its own
notification. Uses the same SMTP_* / LEAD_NOTIFY_EMAIL env as Django.

Sends at most one email per chat session, and only once the lead is "real"
(has a name AND a way to reach them), so a multi-step capture doesn't spam."""
import os
import smtplib
import ssl
from email.message import EmailMessage

# Sessions we've already emailed about (in-process; a restart may re-send once).
_notified = set()


def _recipients():
    raw = os.environ.get('LEAD_NOTIFY_EMAIL', '')
    return [e.strip() for e in raw.replace(';', ',').split(',') if e.strip()]


def notify_chat_lead(lead, session_id):
    if session_id in _notified:
        return

    name = lead.get('name')
    email = lead.get('email')
    phone = lead.get('phone')
    # Only alert on a qualified lead: a name plus at least one contact method.
    if not name or not (email or phone):
        return

    host = os.environ.get('SMTP_HOST')
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')
    sender = os.environ.get('SMTP_FROM', user)
    port = int(os.environ.get('SMTP_PORT', '587'))
    recipients = _recipients()
    if not (host and user and password and recipients):
        return

    msg = EmailMessage()
    msg['Subject'] = f'New chat lead: {name}'
    msg['From'] = sender
    msg['To'] = ', '.join(recipients)
    msg.set_content('\n'.join([
        f'Name:    {name}',
        f'Email:   {email or "-"}',
        f'Phone:   {phone or "-"}',
        f'Company: {lead.get("company") or "-"}',
        f'Message: {lead.get("message") or "-"}',
        f'Session: {session_id}',
        '',
        'View in admin: https://brownebioactives.com/bb-admin/leads/lead/',
    ]))

    try:
        with smtplib.SMTP(host, port, timeout=15) as s:
            s.starttls(context=ssl.create_default_context())
            s.login(user, password)
            s.send_message(msg)
        _notified.add(session_id)
        print(f'[notify] chat lead email sent for {session_id}', flush=True)
    except Exception as e:
        print(f'[notify] chat lead email failed: {e}', flush=True)
