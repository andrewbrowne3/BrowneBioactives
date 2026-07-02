import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSessionId } from '../api/client';

// Ported from MenteeCollege tracker.js: beacon a pageview on entry and the
// time spent on exit/route-change, to POST /api/track (GeoIP-enriched server-side).
function detectDevice() {
  const ua = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  let os = 'Unknown';
  if (isIOS) os = 'iOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'MacOS';
  else if (ua.includes('Linux')) os = 'Linux';
  let browser = 'Unknown';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  return { ua, isMobile, os, browser };
}

function beacon(data: Record<string, unknown>) {
  try {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    if (navigator.sendBeacon) navigator.sendBeacon('/api/track', blob);
    else {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/track', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
    }
  } catch {
    /* ignore */
  }
}

export function usePageTracker() {
  const location = useLocation();

  useEffect(() => {
    const { ua, isMobile, os, browser } = detectDevice();
    const start = Date.now();
    const base = {
      session_id: getSessionId(),
      page_url: window.location.href,
      page_path: location.pathname,
      timestamp: new Date().toISOString(),
      referrer_url: document.referrer || 'Direct',
      user_agent: ua,
      device_type: isMobile ? 'Mobile' : 'Desktop',
      device_os: os,
      browser_name: browser,
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
    };

    beacon({ ...base, time_spent: 0 });

    const onLeave = () => {
      const timeSpent = Math.round((Date.now() - start) / 1000);
      if (timeSpent > 0) beacon({ ...base, time_spent: timeSpent });
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') onLeave();
    };

    window.addEventListener('pagehide', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      onLeave();
      window.removeEventListener('pagehide', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [location.pathname]);
}
