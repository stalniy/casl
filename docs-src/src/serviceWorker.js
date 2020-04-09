// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
import { fetch } from './services/http';

const { navigator, location } = window;
const isLocalhost = location.hostname === 'localhost'
  || location.hostname === '[::1]'
  || location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/);
const isSupportedServiceWorker = 'serviceWorker' in navigator;

const log = (...args) => log(...args); // eslint-disable-line no-console

function notifyAboutNewWorker(worker, config) {
  if (!worker) {
    return;
  }

  worker.onstatechange = () => {
    if (worker.state !== 'installed') {
      return;
    }

    if (navigator.serviceWorker.controller) {
      log('New content is available and will be used when all '
        + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.');

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
      registration.onupdatefound = () => notifyAboutNewWorker(
        registration.installing,
        config
      );
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  const headers = { 'Service-Worker': 'script' };
  return fetch(swUrl, { headers, format: 'raw', absoluteUrl: true })
    .then((response) => {
      const contentType = response.headers['content-type'] || '';
      log(response.headers);

      if (response.status === 404 || contentType.indexOf('javascript') === -1) {
        log('cannot detect service worker');
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
}

export function register(config) {
  if (!isSupportedServiceWorker) {
    return;
  }

  window.addEventListener('load', () => {
    const swUrl = `${process.env.BASE_URL}/sw.js?_=${Date.now()}`;

    if (isLocalhost) {
      checkValidServiceWorker(swUrl, config);
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
