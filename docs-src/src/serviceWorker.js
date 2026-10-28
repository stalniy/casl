import { Workbox } from 'workbox-window';

export function register(config = {}) {
  if ((!import.meta.env.PROD && !import.meta.env.PWA_DEV_ENABLED) || !('serviceWorker' in navigator)) {
    return;
  }

  const filename = import.meta.env.DEV ? 'dev-sw.js?dev-sw' : 'sw.js';
  const swUrl = `${import.meta.env.BASE_URL_PATH || ''}/${filename}`;
  const workbox = new Workbox(swUrl, {
    updateViaCache: 'none',
    type: import.meta.env.DEV ? 'module' : 'classic',
  });

  workbox.addEventListener('waiting', () => {
    if (navigator.serviceWorker.controller && config.onUpdate) {
      config.onUpdate(() => workbox.messageSkipWaiting());
    }
  });

  const reload = (event) => {
    if (event.isUpdate) {
      workbox.removeEventListener('controlling', reload);
      window.location.reload();
    }
  };
  workbox.addEventListener('controlling', reload);

  // Workbox waits for window.load and handles workers already waiting at registration.
  return workbox.register()
    .then(() => checkForUpdatesWhenVisible(workbox))
    .catch(error => console.error('Error during service worker registration:', error));
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => registration.unregister())
      .catch(error => console.error(error.message));
  }
}

const UPDATE_CHECK_INTERVAL_MS = 5 * 60 * 1000;

function checkForUpdatesWhenVisible(workbox) {
  let lastCheck = Date.now();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible' || Date.now() - lastCheck < UPDATE_CHECK_INTERVAL_MS) {
      return;
    }

    lastCheck = Date.now();
    workbox.update().catch(() => {});
  });
}
