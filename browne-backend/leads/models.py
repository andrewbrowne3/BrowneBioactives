from django.db import models


class Lead(models.Model):
    """One flexible table for all inquiries: the three site forms plus
    chatbot-captured leads, distinguished by `kind`."""

    KIND_CHOICES = [
        ('contact', 'Contact form'),
        ('sample', 'Sample request'),
        ('bulk_quote', 'Bulk quote'),
        ('meeting', 'Meeting request'),
        ('chat', 'Chatbot'),
        ('quick', 'Quick inquiry'),
    ]

    kind = models.CharField(max_length=20, choices=KIND_CHOICES, default='contact')
    created_at = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    company = models.CharField(max_length=255, null=True, blank=True)
    company_website = models.CharField(max_length=255, null=True, blank=True)
    industry = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)

    subject = models.CharField(max_length=255, null=True, blank=True)
    inquiry_type = models.CharField(max_length=100, null=True, blank=True)

    product_ids = models.JSONField(default=list, blank=True)
    quantity = models.CharField(max_length=255, null=True, blank=True)
    estimated_annual_volume = models.CharField(max_length=255, null=True, blank=True)
    delivery_timeline = models.CharField(max_length=255, null=True, blank=True)
    target_price = models.CharField(max_length=255, null=True, blank=True)
    quality_requirements = models.TextField(null=True, blank=True)
    application = models.TextField(null=True, blank=True)
    message = models.TextField(null=True, blank=True)

    # Anything the frontend sends that isn't mapped above (forward-compatible)
    extra = models.JSONField(default=dict, blank=True)

    source_page = models.CharField(max_length=255, null=True, blank=True)
    session_id = models.CharField(max_length=255, null=True, blank=True)
    ip = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        who = self.name or self.email or self.company or 'Anonymous'
        return f'[{self.get_kind_display()}] {who} ({self.created_at:%Y-%m-%d})'


class PageVisit(models.Model):
    """Ported from MenteeCollege — one row per page hit, GeoIP-enriched."""

    session_id = models.CharField(max_length=255, null=True, blank=True)
    page_url = models.URLField(max_length=500, null=True, blank=True)
    page_path = models.CharField(max_length=255, null=True, blank=True)
    timestamp = models.DateTimeField(null=True, blank=True)
    time_spent = models.IntegerField(null=True, blank=True)  # seconds
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    region = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    referrer_url = models.CharField(max_length=500, null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    device_type = models.CharField(max_length=50, null=True, blank=True)
    device_os = models.CharField(max_length=50, null=True, blank=True)
    browser_name = models.CharField(max_length=50, null=True, blank=True)
    screen_width = models.IntegerField(null=True, blank=True)
    screen_height = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-timestamp',)

    def __str__(self):
        loc = self.city or self.country or self.ip_address or 'unknown'
        return f'{self.page_path} from {loc} ({self.session_id})'


class ChatTranscript(models.Model):
    """One row per chat turn. Written by the FastAPI agent via raw SQLite,
    read here through the ORM for the admin dashboard."""

    session_id = models.CharField(max_length=255, null=True, blank=True)
    role = models.CharField(max_length=20)  # 'user' | 'assistant'
    content = models.TextField()
    page = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return f'{self.session_id} · {self.role}: {self.content[:40]}'
