"""GeoIP lookup helper, ported from MenteeCollege. Opens the GeoLite2 reader
once and reuses it."""
import logging

from django.conf import settings

logger = logging.getLogger(__name__)

_reader = None
_reader_tried = False


def _get_reader():
    global _reader, _reader_tried
    if _reader_tried:
        return _reader
    _reader_tried = True
    try:
        import geoip2.database
        _reader = geoip2.database.Reader(settings.GEOIP_DB)
        logger.info('GeoIP database loaded: %s', settings.GEOIP_DB)
    except Exception as e:  # missing file, bad db, geoip2 not installed
        logger.warning('GeoIP unavailable (%s); visits stored without geo', e)
        _reader = None
    return _reader


def lookup(ip_address):
    """Return a dict with country/region/city/latitude/longitude (values may be
    None). Never raises."""
    geo = {'country': None, 'region': None, 'city': None,
           'latitude': None, 'longitude': None}
    if not ip_address:
        return geo
    reader = _get_reader()
    if reader is None:
        return geo
    try:
        r = reader.city(ip_address)
        geo.update({
            'country': r.country.name,
            'region': r.subdivisions.most_specific.name if r.subdivisions.most_specific else None,
            'city': r.city.name,
            'latitude': r.location.latitude,
            'longitude': r.location.longitude,
        })
    except Exception:
        # AddressNotFoundError (private/unknown IP) and anything else
        pass
    return geo
