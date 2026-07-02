from django.contrib import admin

from .models import Lead, PageVisit, ChatTranscript


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'kind', 'name', 'email', 'company', 'phone',
                    'country', 'source_page')
    list_filter = ('kind', 'country', 'created_at')
    search_fields = ('name', 'email', 'company', 'phone', 'message', 'application')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at',)


@admin.register(PageVisit)
class PageVisitAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'session_id', 'page_path', 'ip_address', 'city',
                    'region', 'country', 'time_spent', 'device_type', 'browser_name',
                    'referrer_url')
    list_filter = ('country', 'region', 'device_type', 'timestamp')
    search_fields = ('session_id', 'ip_address', 'page_path', 'city')
    ordering = ('-timestamp',)
    date_hierarchy = 'timestamp'


@admin.register(ChatTranscript)
class ChatTranscriptAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'session_id', 'role', 'short_content', 'page')
    list_filter = ('role', 'created_at')
    search_fields = ('session_id', 'content')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'

    @admin.display(description='content')
    def short_content(self, obj):
        return obj.content[:80]
