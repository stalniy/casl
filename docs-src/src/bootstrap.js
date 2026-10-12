import { bootstrap } from './app.js';
import { register } from './serviceWorker.js';

window.__isAppExecuted__ = true;
const app = bootstrap('casl-docs');
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
