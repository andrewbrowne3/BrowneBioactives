#!/bin/sh
set -e

# Ensure the shared SQLite dir exists (volume-mounted at /data)
mkdir -p "$(dirname "${DB_PATH:-/data/browne.sqlite3}")"

python manage.py makemigrations leads --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput

# Create the admin superuser from env if it doesn't already exist
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
  python manage.py createsuperuser --noinput \
    --username "$DJANGO_SUPERUSER_USERNAME" \
    --email "${DJANGO_SUPERUSER_EMAIL:-admin@brownebioactives.com}" 2>/dev/null || true
fi

exec gunicorn brownebackend.wsgi:application \
  --bind 0.0.0.0:"${PORT:-5030}" --workers 3 --timeout 60
