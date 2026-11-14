import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const component = readFileSync(new URL('../src/components/QuickSearch.js', import.meta.url), 'utf8')
  .replace(/^import .*;\n/gm, '')
  .replace('export default class QuickSearch', 'globalThis.QuickSearch = class QuickSearch');
const analytics = readFileSync(new URL('../src/services/analytics.js', import.meta.url), 'utf8')
  .replaceAll('process.env.UMAMI_ID', '"test-website"')
  .replaceAll('export function ', 'function ');
const page = { doc: { id: 'guide/intro', title: 'Introduction', categories: ['guide'], headings: [{ id: 'first', title: 'First steps' }] }, hints: {} };

function fixture(search, choice = 'accepted') {
  const events = [];
  const queries = [];
  const context = vm.createContext({
    LitElement: class {
      dispatchEvent() {}
      shadowRoot = { querySelector: () => ({ close() {} }) };
    },
    html: () => '', css: () => '', debounce: fn => fn,
    navigator: { platform: 'Linux' },
    document: { body: { style: { overflow: '' } } },
    CustomEvent: class {},
    localStorage: {
      getItem: () => JSON.stringify({ version: 1, choice, timestamp: Date.now() }),
      setItem() {},
    },
    window: { umami: { track: (name, data) => events.push({ name, ...data }) } },
    locale: () => 'en',
    content: () => ({ search: (...args) => { queries.push(args); return search(...args); } }),
  });
  vm.runInContext(analytics + '\n' + component, context);
  const instance = new context.QuickSearch();
  instance._open = true;
  return { instance, events, queries };
}

const plain = value => JSON.parse(JSON.stringify(value));

test('tracks trimmed queries with page counts rather than expanded heading counts', async () => {
  const f = fixture(async () => [page]);
  f.instance.value = '  ability  ';
  await f.instance._search();
  assert.deepEqual(plain(f.queries), [['en', 'ability', { prefix: true }]]);
  assert.equal(f.instance._suggestions.length, 2);
  assert.deepEqual(plain(f.events), [{ name: 'search', search_term: 'ability', result_count: 1 }]);
});

test('includes the examples suggestion in the Umami result count, as main does', async () => {
  const f = fixture(async () => [page]);
  f.instance.value = 'ExAmP';
  await f.instance._search();
  assert.equal(f.instance._suggestions[0].url, 'https://github.com/stalniy/casl-examples');
  assert.deepEqual(plain(f.events), [{ name: 'search', search_term: 'ExAmP', result_count: 2 }]);
});

test('tracks zero matches and presents recommendations', async () => {
  const f = fixture(async () => []);
  f.instance.value = 'nomatches';
  await f.instance._search();
  assert.equal(f.events[0].result_count, 0);
  assert.equal(f.instance._items().length, 4);
});

test('search works without consent but does not send analytics', async () => {
  for (const choice of [null, 'rejected']) {
    const f = fixture(async () => [page], choice);
    f.instance.value = 'ability';
    await f.instance._search();
    assert.equal(f.instance._suggestions.length, 2);
    assert.equal(f.events.length, 0);
  }
});

test('blank input and closed dialogs do not search or track', async () => {
  const f = fixture(async () => [page]);
  f.instance.value = '   ';
  await f.instance._search();
  f.instance.value = 'ability';
  f.instance._open = false;
  await f.instance._search();
  assert.equal(f.queries.length, 0);
  assert.equal(f.events.length, 0);
});

test('superseded and closed searches do not publish results or analytics', async () => {
  for (const close of [false, true]) {
    let resolve;
    const f = fixture(() => new Promise(done => { resolve = done; }));
    f.instance.value = 'ability';
    const pending = f.instance._search();
    if (close) f.instance._close();
    else f.instance._requestId += 1;
    resolve([page]);
    await pending;
    assert.equal(f.instance._suggestions, null);
    assert.equal(f.events.length, 0);
  }
});

test('search errors show a fallback without sending a successful search event', async () => {
  const f = fixture(async () => { throw new Error('Offline'); });
  f.instance.value = 'ability';
  f.instance._loading = true;
  await f.instance._search();
  assert.equal(f.instance._error, true);
  assert.equal(f.instance._loading, false);
  assert.equal(f.instance._items().length, 4);
  assert.equal(f.events.length, 0);
});
