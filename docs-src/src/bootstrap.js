import { bootstrap } from './app';
import { register } from './serviceWorker';

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
