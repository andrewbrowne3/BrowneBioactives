from django.apps import AppConfig
from django.db.backends.signals import connection_created
from django.dispatch import receiver


class LeadsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'leads'


@receiver(connection_created)
def enable_sqlite_wal(sender, connection, **kwargs):
    """WAL mode lets the FastAPI chat agent write to the same SQLite file
    concurrently with Django without locking errors."""
    if connection.vendor == 'sqlite':
        cursor = connection.cursor()
        cursor.execute('PRAGMA journal_mode=WAL;')
        cursor.execute('PRAGMA busy_timeout=5000;')
