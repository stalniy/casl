const STORAGE_KEY = 'casl:analytics-consent';
const CONSENT_VERSION = 1;
const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
const listeners = new Set();
let initialized = false;
let tracker = null;

function readConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const age = Date.now() - saved?.timestamp;
    return saved?.version === CONSENT_VERSION
      && ['accepted', 'rejected'].includes(saved.choice)
      && age >= 0 && age < CONSENT_LIFETIME ? saved.choice : null;
  } catch {
    return null;
  }
}

let consent = readConsent();

export function analyticsConsent() {
  return consent;
}

function loadTracker() {
  if (tracker || !import.meta.env.UMAMI_ID) return;

  // Also guard automatic pageviews and events after consent is withdrawn.
  window.caslAnalyticsBeforeSend = (type, payload) => consent === 'accepted' ? payload : false;
  tracker = document.createElement('script');
  tracker.src = 'https://cloud.umami.is/script.js';
  tracker.defer = true;
  tracker.dataset.websiteId = import.meta.env.UMAMI_ID;
  tracker.dataset.beforeSend = 'caslAnalyticsBeforeSend';
  tracker.addEventListener('error', () => {
    tracker.remove();
    tracker = null;
  }, { once: true });
  document.head.appendChild(tracker);
}

function applyConsent(choice) {
  const wasTracking = consent === 'accepted' && tracker;
  consent = choice;
  listeners.forEach(listener => listener(consent));
  if (consent === 'accepted') loadTracker();
  // Reload to remove the tracker and its navigation listeners completely.
  else if (wasTracking) window.location.reload();
}

export function initializeAnalytics() {
  if (initialized) return;
  initialized = true;
  if (consent === 'accepted') loadTracker();
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY || event.key === null) applyConsent(readConsent());
  });
}

export function setAnalyticsConsent(choice) {
  if (!['accepted', 'rejected'].includes(choice)) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: CONSENT_VERSION,
      choice,
      timestamp: Date.now(),
    }));
  } catch {
    // If storage is blocked, honor the choice for this page visit.
  }
  applyConsent(choice);
}

export function observeAnalyticsConsent(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function openAnalyticsPreferences() {
  window.dispatchEvent(new Event('analytics-preferences'));
}

export function trackEvent(name, data) {
  if (consent === 'accepted') window.umami?.track(name, data);
}
