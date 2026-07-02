"""Optional email notification on a new lead. No-op unless SMTP creds and a
recipient are configured, so the dashboard-only path works out of the box."""
import logging

from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def notify_new_lead(lead):
    recipient = settings.LEAD_NOTIFY_EMAIL
    if not recipient or not settings.EMAIL_HOST_USER:
        return  # not configured -> silently skip

    subject = f'New {lead.get_kind_display()} lead: {lead.name or lead.email or "Anonymous"}'
    lines = [
        f'Kind:     {lead.get_kind_display()}',
        f'Name:     {lead.name or "-"}',
        f'Email:    {lead.email or "-"}',
        f'Phone:    {lead.phone or "-"}',
        f'Company:  {lead.company or "-"}',
        f'Country:  {lead.country or "-"}',
        f'Products: {", ".join(lead.product_ids) if lead.product_ids else "-"}',
        f'Message:  {lead.message or lead.application or "-"}',
        f'Page:     {lead.source_page or "-"}',
        '',
        'View in admin: https://brownebioactives.com/bb-admin/leads/lead/',
    ]
    try:
        send_mail(subject, '\n'.join(lines), settings.DEFAULT_FROM_EMAIL,
                  [recipient], fail_silently=True)
    except Exception as e:
        logger.warning('Lead notification email failed: %s', e)
