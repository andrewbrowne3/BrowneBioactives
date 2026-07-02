from django.contrib import admin
from django.urls import path, include

# Admin dashboard lives at /bb-admin/ (the "who visits & why" + leads view).
admin.site.site_header = 'Browne Bioactives'
admin.site.site_title = 'Browne Bioactives Admin'
admin.site.index_title = 'Leads, Visitors & Chat'

urlpatterns = [
    path('bb-admin/', admin.site.urls),
    path('api/', include('leads.urls')),
]
