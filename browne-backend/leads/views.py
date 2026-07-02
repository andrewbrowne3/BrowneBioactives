import json
import logging

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from . import geo
from .models import Lead, PageVisit
from .notify import notify_new_lead

logger = logging.getLogger(__name__)

# Map the frontend form field names (camelCase from react-hook-form) onto Lead
# columns. Anything not listed here is preserved in Lead.extra.
FIELD_MAP = {
    'name': 'name',
    'contactName': 'name',
    'email': 'email',
    'phone': 'phone',
    'company': 'company',
    'companyName': 'company',
    'companyWebsite': 'company_website',
    'industry': 'industry',
    'country': 'country',
    'subject': 'subject',
    'inquiryType': 'inquiry_type',
    'productIds': 'product_ids',
    'quantity': 'quantity',
    'estimatedAnnualVolume': 'estimated_annual_volume',
    'deliveryTimeline': 'delivery_timeline',
    'targetPrice': 'target_price',
    'qualityRequirements': 'quality_requirements',
    'application': 'application',
    'message': 'message',
    'interest': 'message',  # QuickInquiry "what are you looking for?"
}

VALID_KINDS = {'contact', 'sample', 'bulk_quote', 'chat', 'quick'}


def _client_ip(request):
    ip = request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR'))
    if ip:
        ip = ip.split(',')[0].strip()
    return ip


def health(request):
    return JsonResponse({'status': 'ok'})


@csrf_exempt
@require_POST
def create_lead(request):
    try:
        data = json.loads(request.body or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    kind = data.get('kind', 'contact')
    if kind not in VALID_KINDS:
        kind = 'contact'

    fields = {}
    extra = {}
    for key, value in data.items():
        if key in ('kind', 'source_page', 'sourcePage', 'session_id', 'sessionId'):
            continue
        col = FIELD_MAP.get(key)
        if col and not fields.get(col):
            fields[col] = value
        elif not col:
            extra[key] = value

    # product_ids must be a list
    pids = fields.get('product_ids')
    if pids and not isinstance(pids, list):
        fields['product_ids'] = [pids]

    lead = Lead.objects.create(
        kind=kind,
        source_page=data.get('source_page') or data.get('sourcePage'),
        session_id=data.get('session_id') or data.get('sessionId'),
        ip=_client_ip(request),
        extra=extra,
        **fields,
    )

    try:
        notify_new_lead(lead)
    except Exception as e:
        logger.warning('notify_new_lead failed: %s', e)

    return JsonResponse({'ok': True, 'id': lead.id})


@csrf_exempt
@require_POST
def track_page_view(request):
    """Ported from MenteeCollege viewscookies.track_page_view, extended to also
    persist the client-derived device/UA fields the beacon sends."""
    try:
        data = json.loads(request.body or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    session_id = data.get('session_id')
    page_url = data.get('page_url')
    page_path = data.get('page_path')
    timestamp = data.get('timestamp')
    if not all([session_id, page_path, timestamp]):
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    ip_address = _client_ip(request)
    g = geo.lookup(ip_address)

    PageVisit.objects.create(
        session_id=session_id,
        page_url=page_url,
        page_path=page_path,
        timestamp=timestamp,
        time_spent=int(data.get('time_spent') or 0),
        ip_address=ip_address,
        country=g['country'], region=g['region'], city=g['city'],
        latitude=g['latitude'], longitude=g['longitude'],
        referrer_url=data.get('referrer_url') or request.META.get('HTTP_REFERER'),
        user_agent=data.get('user_agent'),
        device_type=data.get('device_type'),
        device_os=data.get('device_os'),
        browser_name=data.get('browser_name'),
        screen_width=data.get('screen_width'),
        screen_height=data.get('screen_height'),
    )
    return JsonResponse({'ok': True, 'geo': g})
