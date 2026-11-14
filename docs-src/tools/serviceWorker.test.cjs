const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '../src/serviceWorker.js'), 'utf8')
  .replace(/^import .*;\n/gm, '').replace(/export function /g, 'function ');

function setup(registration, readyState = 'loading') {
  const events = {};
  const updates = [];
  const navigator = { serviceWorker: {
    controller: {},
    addEventListener() {},
    register: async () => registration,
  } };
  const context = vm.createContext({
    window: { navigator, location: { hostname: 'casl.js.org' },
      addEventListener: (name, listener) => { events[name] = listener; } },
    document: { readyState },
    console: { log() {}, error() {} },
    process: { env: { BASE_URL: '/v5' } },
  });
  vm.runInContext(source, context);
  context.register({ onUpdate: worker => updates.push(worker) });
  return { events, updates };
}

test('offers an update for a worker already waiting when the page opens', async () => {
  const worker = { state: 'installed' };
  const { events, updates } = setup({ waiting: worker });
  await events.load();
  assert.deepEqual(updates, [worker]);
});

test('registers even when window.load has already fired', async () => {
  const worker = { state: 'installed' };
  const { updates } = setup({ waiting: worker }, 'complete');
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(updates, [worker]);
});

test('offers updates that finish installing after registration', async () => {
  const worker = { state: 'installing' };
  const registration = { installing: worker };
  const { events, updates } = setup(registration);
  await events.load();
  registration.onupdatefound();
  assert.deepEqual(updates, []);
  worker.state = 'installed';
  worker.onstatechange();
  assert.deepEqual(updates, [worker]);
});
