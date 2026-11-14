import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/services/analytics.js', import.meta.url), 'utf8')
  .replaceAll('import.meta.env.UMAMI_ID', 'UMAMI_ID')
  .replaceAll('export function ', 'function ');
const key = 'casl:analytics-consent';
const savedChoice = (choice, timestamp = Date.now()) => JSON.stringify({ version: 1, choice, timestamp });

function fixture(saved = null, blockedStorage = false, websiteId = 'test-website') {
  const storage = new Map(saved === null ? [] : [[key, saved]]);
  const scripts = [];
  const events = [];
  const listeners = new Map();
  let reloads = 0;
  const context = vm.createContext({
    UMAMI_ID: websiteId,
    localStorage: {
      getItem: name => {
        if (blockedStorage) throw new Error('Storage blocked');
        return storage.get(name) ?? null;
      },
      setItem: (name, value) => {
        if (blockedStorage) throw new Error('Storage blocked');
        storage.set(name, value);
      },
    },
    document: {
      head: { appendChild: script => scripts.push(script) },
      createElement: () => ({
        dataset: {},
        addEventListener(name, callback) { this[name] = callback; },
        remove() { scripts.splice(scripts.indexOf(this), 1); },
      }),
    },
    window: {
      location: { reload: () => reloads++ },
      addEventListener: (name, listener) => listeners.set(name, listener),
      dispatchEvent: event => listeners.get(event.type)?.(event),
      umami: { track: (...args) => events.push(args) },
    },
    Event,
  });
  vm.runInContext(source, context);
  return { context, storage, scripts, events, listeners, reloads: () => reloads };
}

test('analytics remains off until acceptance, then loads only once and persists the choice', () => {
  const f = fixture();
  f.context.initializeAnalytics();
  f.context.trackEvent('search', { search_term: 'ability' });
  assert.equal(f.context.analyticsConsent(), null);
  assert.equal(f.scripts.length, 0);
  assert.equal(f.events.length, 0);
  f.context.setAnalyticsConsent('rejected');
  assert.equal(f.scripts.length, 0);
  f.context.setAnalyticsConsent('accepted');
  f.context.initializeAnalytics();
  f.context.setAnalyticsConsent('accepted');
  assert.equal(f.scripts.length, 1);
  assert.equal(f.scripts[0].dataset.websiteId, 'test-website');
  assert.equal(JSON.parse(f.storage.get(key)).choice, 'accepted');
  const data = { search_term: 'ability', result_count: 3 };
  f.context.trackEvent('search', data);
  assert.deepEqual(f.events, [['search', data]]);
});

test('valid saved acceptance loads the tracker; expired, future, invalid and rejected choices do not', () => {
  for (const saved of [null, '{invalid', savedChoice('rejected'), savedChoice('accepted', 0), savedChoice('accepted', Date.now() + 60_000), JSON.stringify({ version: 2, choice: 'accepted', timestamp: Date.now() })]) {
    const f = fixture(saved);
    f.context.initializeAnalytics();
    assert.equal(f.scripts.length, 0);
  }
  const f = fixture(savedChoice('accepted'));
  f.context.initializeAnalytics();
  assert.equal(f.scripts.length, 1);
});

test('withdrawal blocks custom and automatic events immediately and removes the tracker by reloading', () => {
  const f = fixture(savedChoice('accepted'));
  f.context.initializeAnalytics();
  f.context.setAnalyticsConsent('rejected');
  f.context.trackEvent('search', {});
  assert.equal(f.context.window.caslAnalyticsBeforeSend('event', {}), false);
  assert.equal(f.events.length, 0);
  assert.equal(f.reloads(), 1);
});

test('changes and storage clearing in another tab update consent', () => {
  const f = fixture();
  f.context.initializeAnalytics();
  f.storage.set(key, savedChoice('accepted'));
  f.listeners.get('storage')({ key });
  assert.equal(f.scripts.length, 1);
  f.storage.clear();
  f.listeners.get('storage')({ key: null });
  assert.equal(f.context.analyticsConsent(), null);
  assert.equal(f.context.window.caslAnalyticsBeforeSend('event', {}), false);
  assert.equal(f.reloads(), 1);
});

test('blocked storage honors consent for this visit and unavailable trackers do not break events', () => {
  const f = fixture(null, true);
  f.context.initializeAnalytics();
  f.context.setAnalyticsConsent('accepted');
  assert.equal(f.scripts.length, 1);
  delete f.context.window.umami;
  assert.doesNotThrow(() => f.context.trackEvent('search', {}));
  assert.equal(f.context.analyticsConsent(), 'accepted');
});

test('a failed script can be retried and preference observers can unsubscribe', () => {
  const f = fixture();
  const choices = [];
  const unsubscribe = f.context.observeAnalyticsConsent(choice => choices.push(choice));
  f.context.setAnalyticsConsent('accepted');
  f.scripts[0].error();
  assert.equal(f.scripts.length, 0);
  f.context.setAnalyticsConsent('accepted');
  assert.equal(f.scripts.length, 1);
  unsubscribe();
  f.context.setAnalyticsConsent('rejected');
  assert.deepEqual(choices, ['accepted', 'accepted']);
});

test('an unconfigured website ID keeps the tracker disabled', () => {
  const f = fixture(savedChoice('accepted'), false, '');
  f.context.initializeAnalytics();
  assert.equal(f.scripts.length, 0);
});
