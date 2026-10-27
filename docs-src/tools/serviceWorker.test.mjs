import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { watchRegistration, reloadOnControllerChange } from '../src/serviceWorkerUpdates.js';

class Emitter {
  listeners = {};
  addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
  emit(type) { (this.listeners[type] || []).forEach(fn => fn()); }
}

const makeWorker = state => Object.assign(new Emitter(), { state });
const makeRegistration = (props = {}) => Object.assign(new Emitter(), { waiting: null, installing: null }, props);
const makeConfig = () => {
  const calls = { update: [], success: [] };
  return {
    calls,
    onUpdate: w => calls.update.push(w),
    onSuccess: w => calls.success.push(w),
  };
};

test('notifies about a worker that is already waiting', () => {
  const waiting = makeWorker('installed');
  const config = makeConfig();
  watchRegistration(makeRegistration({ waiting }), { controller: {} }, config);

  assert.deepEqual(config.calls.update, [waiting]);
});

test('notifies once when an in-progress installation finishes', () => {
  const installing = makeWorker('installing');
  const registration = makeRegistration({ installing });
  const config = makeConfig();
  watchRegistration(registration, { controller: {} }, config);
  assert.equal(config.calls.update.length, 0);

  installing.state = 'installed';
  installing.emit('statechange');
  installing.emit('statechange');
  registration.waiting = installing;
  registration.emit('updatefound');

  assert.deepEqual(config.calls.update, [installing]);
});

test('handles future updatefound events without duplicates', () => {
  const registration = makeRegistration();
  const config = makeConfig();
  watchRegistration(registration, { controller: {} }, config);

  const next = makeWorker('installing');
  registration.installing = next;
  registration.emit('updatefound');
  registration.emit('updatefound');
  next.state = 'installed';
  next.emit('statechange');

  assert.deepEqual(config.calls.update, [next]);
});

test('does not announce the same worker as waiting and installing', () => {
  const worker = makeWorker('installed');
  const config = makeConfig();
  watchRegistration(makeRegistration({ waiting: worker, installing: worker }), { controller: {} }, config);

  assert.equal(config.calls.update.length, 1);
});

test('first installation reports success instead of an update', () => {
  const installing = makeWorker('installing');
  const config = makeConfig();
  watchRegistration(makeRegistration({ installing }), { controller: null }, config);
  installing.state = 'installed';
  installing.emit('statechange');

  assert.equal(config.calls.update.length, 0);
  assert.deepEqual(config.calls.success, [installing]);
});

test('reloads exactly once after controllerchange', () => {
  const container = Object.assign(new Emitter(), { controller: {} });
  let reloads = 0;
  reloadOnControllerChange(container, () => reloads++);
  container.emit('controllerchange');
  container.emit('controllerchange');

  assert.equal(reloads, 1);
});

test('does not reload when the page was not controlled before (first install)', () => {
  const container = Object.assign(new Emitter(), { controller: null });
  let reloads = 0;
  reloadOnControllerChange(container, () => reloads++);
  container.emit('controllerchange');

  assert.equal(reloads, 0);
});

test('generated production service worker serves navigation NetworkFirst with offline fallback', async (t) => {
  const distDir = path.resolve(import.meta.dirname, '..', process.env.LIT_APP_DIST_FOLDER || 'dist');
  let sw;
  try {
    sw = await readFile(path.join(distDir, 'sw.js'), 'utf8');
  } catch {
    return t.skip('run a production build first');
  }

  assert.doesNotMatch(sw, /NavigationRoute|createHandlerBoundToURL/);
  assert.match(sw, /"navigate"===\w+\.mode,new \w+\.NetworkFirst\(/);
  assert.match(sw, /PrecacheFallbackPlugin\(\{fallbackURL:"[^"]*\/app-shell\.html"\}\)/);
  assert.match(sw, /\{url:"app-shell\.html",revision:"[a-f0-9]+"\}/);
  assert.doesNotMatch(sw, /\{url:"index\.html"/);

  const [shell, built] = await Promise.all([
    readFile(path.join(distDir, 'app-shell.html'), 'utf8'),
    readFile(path.join(distDir, 'sw-cleanup.js'), 'utf8'),
  ]);
  assert.match(shell, /<div id="app"|<body/);
  assert.match(built, /caches\.delete/);
});
