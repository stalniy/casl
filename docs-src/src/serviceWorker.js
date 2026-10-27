// Service worker registration for Vite PWA
import { watchRegistration, reloadOnControllerChange } from './serviceWorkerUpdates.js';

const { navigator, location } = window;
const isLocalhost = location.hostname === 'localhost'
  || location.hostname === '[::1]'
  || location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/);
const isSupportedServiceWorker = 'serviceWorker' in navigator;

const log = (...args) => console.log(...args);

const UPDATE_CHECK_INTERVAL_MS = 5 * 60 * 1000;

function checkForUpdatesWhenVisible(registration) {
  let lastCheck = Date.now();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible' || Date.now() - lastCheck < UPDATE_CHECK_INTERVAL_MS) {
      return;
    }

    lastCheck = Date.now();
    registration.update().catch(() => {});
  });
}

function registerValidSW(swUrl, config) {
  reloadOnControllerChange(navigator.serviceWorker, () => location.reload());

  // sw.js itself is always revalidated by browsers; "none" also applies this
  // to scripts imported by it. CDN caching of sw.js is outside our control.
  return navigator.serviceWorker.register(swUrl, { updateViaCache: 'none' })
    .then((registration) => {
      log('service worker is registered');
      watchRegistration(registration, navigator.serviceWorker, config);
      checkForUpdatesWhenVisible(registration);
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

export function register(config) {
  if (!isSupportedServiceWorker) {
    return;
  }

  // Only register in production
  if (import.meta.env.MODE !== 'production') {
    log('Service worker registration skipped in development mode');
    return;
  }

  window.addEventListener('load', () => {
    const swUrl = `${import.meta.env.BASE_URL_PATH || ''}/sw.js`;

    if (isLocalhost) {
      // Check if service worker exists
      fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
        .then((response) => {
          const contentType = response.headers.get('content-type') || '';
          if (response.status === 404 || contentType.indexOf('javascript') === -1) {
            log('Service worker not found');
            navigator.serviceWorker.ready
              .then(registration => registration.unregister())
              .then(() => location.reload());
          } else {
            registerValidSW(swUrl, config);
          }
        })
        .catch(() => {
          log('No internet connection found. App is running in offline mode.');
        });
    } else {
      registerValidSW(swUrl, config);
    }
  });
}

export function unregister() {
  if (isSupportedServiceWorker) {
    navigator.serviceWorker.ready
      .then(registration => registration.unregister())
      .catch(error => console.error(error.message));
  }
}
