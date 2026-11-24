import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { URL, pathToFileURL } from 'node:url';
import { deserialize, serialize } from 'node:v8';
import { compile } from 'svelte/compiler';

// jsdom lacks this platform API, which the Svelte 5.7 compiler uses.
globalThis.structuredClone ??= value => deserialize(serialize(value));

export async function fixtures(generate) {
  const directory = await mkdtemp(new URL('./.fixture-', import.meta.url));
  try {
    for (const name of ['Provider', 'Reader', 'Tree']) {
      const filename = new URL(`./fixtures/${name}.svelte`, import.meta.url);
      const source = await readFile(filename, 'utf8');
      const { js, warnings } = compile(source, { filename: filename.pathname, generate });
      if (warnings.length) throw new Error(JSON.stringify(warnings));
      await writeFile(`${directory}/${name}.mjs`, js.code.replaceAll('.svelte\'', '.mjs\''));
    }
    return {
      Tree: (await import(pathToFileURL(`${directory}/Tree.mjs`).href)).default,
      Reader: (await import(pathToFileURL(`${directory}/Reader.mjs`).href)).default,
      cleanup: () => rm(directory, { recursive: true, force: true }),
    };
  } catch (error) {
    await rm(directory, { recursive: true, force: true });
    throw error;
  }
}

export function countListeners(ability) {
  const on = ability.on;
  const counts = { active: 0, started: 0 };
  ability.on = function (event, listener) {
    const off = on.call(this, event, listener);
    if (event !== 'updated') return off;
    counts.active++;
    counts.started++;
    return () => { counts.active--; off(); };
  };
  return counts;
}
