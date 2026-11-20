/** @jest-environment jsdom */
/* global test, afterAll, afterEach, document */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { URL } from 'node:url';
import { createMongoAbility } from '@casl/ability';
import { flushSync, hydrate, mount, tick, unmount } from 'svelte';
import { fixtures, countListeners } from './helpers.mjs';

const suite = await fixtures('client');
afterAll(suite.cleanup);
const mounted = [];
afterEach(async () => {
  for (const instance of mounted.splice(0)) await unmount(instance);
  await tick();
  document.body.innerHTML = '';
});

function start(ability, nested) {
  const captured = {};
  const target = document.createElement('div');
  document.body.append(target);
  const instance = mount(suite.Tree, { target, props: {
    ability, nested, capture: (name, adapter) => { captured[name] = adapter; },
  } });
  mounted.push(instance);
  flushSync();
  return { instance, captured, target };
}
function text(target, id = 'first') {
  return target.querySelector(`[data-id="${id}"]`)?.textContent;
}

test('templates, derived checks, same-array updates and reactive arguments follow core state', async () => {
  const rules = [{ action: 'read', subject: 'Post', reason: 'initial' }];
  const ability = createMongoAbility(rules);
  const { instance, captured, target } = start(ability);
  assert.equal(text(target), 'true:false:initial:true');
  const { can, cannot, relevantRuleFor, update } = captured.provider;
  assert.equal(update([]), undefined);
  assert.equal(can('read', 'Post'), false);
  await tick();
  assert.equal(text(target), 'false:true:none:false');
  ability.update(rules);
  await tick();
  assert.equal(text(target), 'true:false:initial:true');
  rules[0].reason = 'changed';
  ability.update(rules);
  await tick();
  assert.equal(text(target), 'true:false:changed:true');
  assert.equal(relevantRuleFor('read', 'Post'), ability.relevantRuleFor('read', 'Post'));
  assert.equal(cannot('read', 'Post'), false);
  ability.update([{ action: 'edit', subject: 'User', fields: ['name'] }]);
  instance.check('edit', 'User', 'name');
  await tick();
  assert.equal(text(target), 'true:false:none:true');
  instance.check('edit', 'User', 'email');
  await tick();
  assert.equal(text(target), 'false:true:none:false');
});

test('readers share a listener, detach after inactivity, and resume with current rules', async () => {
  const ability = createMongoAbility([{ action: 'read', subject: 'Post' }]);
  const counts = countListeners(ability);
  const { instance, captured, target } = start(ability);
  assert.equal(captured.provider, captured.first);
  assert.equal(captured.first, captured.second);
  assert.equal(counts.active, 1);
  assert.equal(counts.started, 1);
  instance.readers(false, true);
  await tick();
  assert.equal(counts.active, 1);
  instance.readers(false, false);
  await tick();
  // Svelte 5.7 defers createSubscriber teardown through its own tick.
  await tick();
  assert.equal(counts.active, 0);
  ability.update([]);
  assert.equal(captured.provider.can('read', 'Post'), false);
  assert.equal(counts.active, 0);
  instance.readers(true, true);
  await tick();
  assert.equal(text(target), 'false:true:none:false');
  assert.equal(counts.active, 1);
  await unmount(instance);
  mounted.splice(mounted.indexOf(instance), 1);
  await tick();
  assert.equal(counts.active, 0);
});

test('nested and sibling render trees retain their own supplied ability', async () => {
  const outer = createMongoAbility([{ action: 'read', subject: 'Post' }]);
  const inner = createMongoAbility([]);
  const first = start(outer, inner);
  const sibling = start(createMongoAbility([]));
  assert.notEqual(first.captured.first, first.captured.nestedReader);
  assert.equal(text(first.target), 'true:false:none:true');
  assert.equal(text(first.target, 'nested'), 'false:true:none:false');
  assert.equal(text(sibling.target), 'false:true:none:false');
  inner.update([{ action: 'read', subject: 'Post' }]);
  outer.update([]);
  await tick();
  assert.equal(text(first.target), 'false:true:none:false');
  assert.equal(text(first.target, 'nested'), 'true:false:none:true');
  assert.equal(text(sibling.target), 'false:true:none:false');
});

test('retains the supplied instance when its application variable is reassigned', async () => {
  const ability = createMongoAbility([{ action: 'read', subject: 'Post' }]);
  const { instance, target } = start(ability);
  instance.replace(createMongoAbility([]));
  await tick();
  assert.equal(text(target), 'true:false:none:true');
  ability.update([]);
  await tick();
  assert.equal(text(target), 'false:true:none:false');
});

test('hydrates server permissions from equivalent application-supplied inputs', async () => {
  const helper = new URL('./helpers.mjs', import.meta.url).href;
  const body = execFileSync(process.execPath, ['--input-type=module', '-e', `
    import { render } from 'svelte/server';
    import { createMongoAbility } from '@casl/ability';
    import { fixtures } from ${JSON.stringify(helper)};
    const suite = await fixtures('server');
    try {
      const output = render(suite.Tree, { props: { ability: createMongoAbility([{ action: 'read', subject: 'Post' }]) } });
      process.stdout.write(output.body);
    } finally { await suite.cleanup(); }
  `], { cwd: new URL('..', import.meta.url), encoding: 'utf8' });
  const target = document.createElement('div');
  target.innerHTML = body;
  document.body.append(target);
  const initial = text(target);
  assert.equal(initial, 'true:false:none:true');
  const original = target.querySelector('[data-id="first"]');
  const ability = createMongoAbility([{ action: 'read', subject: 'Post' }]);
  const counts = countListeners(ability);
  const instance = hydrate(suite.Tree, { target, props: { ability } });
  mounted.push(instance);
  flushSync();
  assert.equal(text(target), initial);
  assert.equal(target.querySelector('[data-id="first"]'), original);
  assert.equal(counts.active, 1);
  ability.update([]);
  await tick();
  assert.equal(text(target), 'false:true:none:false');
});
