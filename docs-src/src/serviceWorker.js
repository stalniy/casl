// Service worker registration for Vite PWA
const { navigator, location } = window;
const isLocalhost = location.hostname === 'localhost'
  || location.hostname === '[::1]'
  || location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/);
const isSupportedServiceWorker = 'serviceWorker' in navigator;

const log = (...args) => console.log(...args); // eslint-disable-line no-console

function notifyAboutNewWorker(worker, config) {
  if (!worker) {
    return;
  }

  worker.onstatechange = () => {
    log('new worker state', worker.state);

    if (worker.state !== 'installed') {
      return;
    }

    if (navigator.serviceWorker.controller) {
      log('New content is available and will be used when all '
        + 'tabs for this page are closed.');

      if (config && config.onUpdate) {
        config.onUpdate(worker);
      }
    } else {
      log('Content is cached for offline use.');

      if (config && config.onSuccess) {
        config.onSuccess(worker);
      }
    }
  };
}

function registerValidSW(swUrl, config) {
  let isRefreshing = false;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!isRefreshing) {
      isRefreshing = true;
      location.reload();
    }
  });

  return navigator.serviceWorker.register(swUrl)
    .then((registration) => {
      log('service worker is registered');
      registration.onupdatefound = () => notifyAboutNewWorker(
        registration.installing,
        config
      );
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
