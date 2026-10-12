import { bootstrap } from './app.js';
import { register } from './serviceWorker.js';

window.__isAppExecuted__ = true;
const app = bootstrap('casl-docs');
const fallback = document.getElementById('prerender-fallback');
app.addEventListener('route-ready', ({ detail }) => {
  if (!fallback || detail.path !== `${window.location.pathname}${window.location.search}${window.location.hash}`) return;
  fallback.hidden = true;
  fallback.setAttribute('aria-hidden', 'true');
  fallback.setAttribute('inert', '');
});
register({
  onUpdate(worker) {
    app.notify('updateAvailable', {
      onClick() {
        worker.postMessage({ type: 'SKIP_WAITING' });
      }
    });
  }
});

window.onShareThisLoaded = () => {
  window.__sharethis__.config['sticky-share-buttons'].id = 'share-buttons';
}
