import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'dev-insecure-change-me')
DEBUG = os.environ.get('DJANGO_DEBUG', 'False').lower() == 'true'
ALLOWED_HOSTS = ['*']

# Behind nginx + Certbot TLS on brownebioactives.com
CSRF_TRUSTED_ORIGINS = [
    'https://brownebioactives.com',
    'https://www.brownebioactives.com',
]
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'leads',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'brownebackend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'brownebackend.wsgi.application'

# Shared SQLite file (also written to by the FastAPI chat agent). WAL mode is
# enabled via a connection_created signal in leads/apps.py for concurrent access.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.environ.get('DB_PATH', str(BASE_DIR / 'data' / 'browne.sqlite3')),
        'OPTIONS': {'timeout': 20},
    }
}

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.environ.get('STATIC_ROOT', str(BASE_DIR / 'staticfiles'))
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Admin lives under /bb-admin/ (see urls.py); force login redirects there too.
LOGIN_URL = '/bb-admin/login/'

# GeoIP + lead-notification config (read by leads/geo.py and leads/notify.py)
GEOIP_DB = os.environ.get('GEOIP_DB', '/data/geoip/GeoLite2-City.mmdb')
LEAD_NOTIFY_EMAIL = os.environ.get('LEAD_NOTIFY_EMAIL', '')

# Email (optional). If EMAIL_HOST_USER is unset, notify() no-ops.
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.environ.get('SMTP_PORT', '587'))
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('SMTP_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
DEFAULT_FROM_EMAIL = os.environ.get('SMTP_FROM', EMAIL_HOST_USER or 'noreply@brownebioactives.com')

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {'console': {'class': 'logging.StreamHandler'}},
    'root': {'handlers': ['console'], 'level': 'INFO'},
}
