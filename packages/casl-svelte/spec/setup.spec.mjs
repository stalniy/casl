import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { test } from 'node:test';
import { URL, pathToFileURL } from 'node:url';
import { compile } from 'svelte/compiler';
import { render } from 'svelte/server';

const fixture = new URL('./fixtures/Smoke.svelte', import.meta.url);

for (const generate of ['server', 'client']) {
  test(`compiles and imports a Svelte ${generate} fixture`, async () => {
    // Keep generated modules beside the tests so their Svelte imports resolve normally.
    const directory = await mkdtemp(new URL('./.fixture-', import.meta.url));

    try {
      const source = await readFile(fixture, 'utf8');
      const { js, warnings } = compile(source, { filename: fixture.pathname, generate });
      assert.deepEqual(warnings, []);
      const moduleUrl = new URL('Smoke.mjs', pathToFileURL(`${directory}/`));
      await writeFile(moduleUrl, js.code);
      const { default: Component } = await import(moduleUrl.href);
      assert.equal(typeof Component, 'function');

      if (generate === 'server') {
        const output = render(Component, { props: { message: 'CASL Svelte setup' } });
        assert.match(output.body, /<p>CASL Svelte setup<\/p>/);
      }
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
}

test('published entry and declarations resolve', async () => {
  await import('@casl/svelte');
  const declarations = await readFile(new URL('../dist/types/index.d.ts', import.meta.url), 'utf8');
  assert.ok(declarations.length > 0);
});
