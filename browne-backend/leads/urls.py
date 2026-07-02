from django.urls import path

from . import views

urlpatterns = [
    path('health', views.health, name='health'),
    path('leads', views.create_lead, name='create-lead'),
    path('track', views.track_page_view, name='track-page'),
]
