import assert from 'node:assert/strict';
/* global test, afterAll */
import { render } from 'svelte/server';
import { Ability, createMongoAbility, subject } from '@casl/ability';
import { fixtures, countListeners } from './helpers.mjs';

const suite = await fixtures('server');
afterAll(suite.cleanup);

function adapterFor(ability) {
  let adapter;
  const output = render(suite.Tree, { props: { ability, capture: (name, value) => {
    if (name === 'provider') adapter = value;
  } } });
  assert.ok(output.body);
  return adapter;
}

test('delegates all destructured methods without modifying the supplied ability', () => {
  const ability = createMongoAbility([
    { action: 'read', subject: 'Post', conditions: { owner: 1 }, reason: 'owner' },
    { action: 'read', subject: 'Post', fields: ['secret'], inverted: true },
  ]);
  const before = Object.getOwnPropertyDescriptors(ability);
  const adapter = adapterFor(ability);
  assert.deepEqual(Object.keys(adapter).sort(), ['can', 'cannot', 'relevantRuleFor', 'update']);
  assert.deepEqual(Object.getOwnPropertyDescriptors(ability), before);
  const { can, cannot, relevantRuleFor, update } = adapter;
  for (const item of [subject('Post', { owner: 1 }), subject('Post', { owner: 2 }), 'Post']) {
    for (const field of [undefined, 'title', 'secret']) {
      assert.equal(can('read', item, field), ability.can('read', item, field));
      assert.equal(cannot('read', item, field), ability.cannot('read', item, field));
      assert.equal(relevantRuleFor('read', item, field), ability.relevantRuleFor('read', item, field));
    }
  }
  assert.equal(relevantRuleFor('delete', 'Post'), null);
  assert.equal(update([]), undefined);
  assert.equal(ability.can('read', 'Post'), false);
  ability.update([{ action: 'read', subject: 'Post' }]);
  assert.equal(can('read', 'Post'), true);
});

test('preserves custom subject detection, condition matching, overrides, and core errors', () => {
  class Document {}
  const item = new Document();
  const ability = new Ability([{ action: 'read', subject: Document, conditions: { allowed: true } }], {
    detectSubjectType: value => value.constructor,
    conditionsMatcher: conditions => Object.assign(value => value.allowed === conditions.allowed, { ast: {} }),
  });
  const adapter = adapterFor(ability);
  item.allowed = true;
  assert.equal(adapter.can('read', item), true);
  item.allowed = false;
  assert.equal(adapter.can('read', item), false);
  const failure = new Error('custom core failure');
  ability.can = function () { assert.equal(this, ability); throw failure; };
  assert.throws(() => adapter.can('read', item), error => error === failure);
  ability.update = function () { assert.equal(this, ability); throw failure; };
  assert.throws(() => adapter.update([]), error => error === failure);
});

test('shares context, isolates nested providers and server trees, and leaves no listeners', () => {
  const ability = createMongoAbility([{ action: 'read', subject: 'Post' }]);
  const nested = createMongoAbility([]);
  const counts = countListeners(ability);
  const nestedCounts = countListeners(nested);
  const captured = {};
  const output = render(suite.Tree, { props: { ability, nested, capture: (name, value) => { captured[name] = value; } } });
  assert.ok(output.body);
  assert.equal(captured.provider, captured.first);
  assert.equal(captured.first, captured.second);
  assert.equal(captured.nested, captured.nestedReader);
  assert.notEqual(captured.first, captured.nested);
  assert.match(output.body, /data-id="first">true:false:none:true/);
  assert.match(output.body, /data-id="nested">false:true:none:false/);
  assert.match(render(suite.Tree, { props: { ability: nested } }).body, /data-id="first">false:true:none:false/);
  assert.equal(counts.started, 0);
  assert.equal(nestedCounts.started, 0);
  assert.throws(() => render(suite.Reader, { props: { id: 'missing' } }).body, /provideAbility/);
});
