import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { setTimeout } from 'node:timers/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const docsDir = fileURLToPath(new URL('..', import.meta.url));
const basePath = '/v7';

test('dev server preserves offline documents while a service worker update waits', { timeout: 180000 }, async (t) => {
  let server = await startDevServer('browser-test-A');
  t.after(() => server.stop());
  const browser = await puppeteer.launch({
    headless: true,
    // Ubuntu CI runners cannot sandbox Puppeteer's downloaded Chrome.
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  t.after(() => browser.close());
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  let navigations = 0;
  page.on('request', request => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) navigations += 1;
  });
  const origin = server.origin;
  const visited = `${origin}${basePath}/en/guide/intro`;
  const newDuringUpdate = `${origin}${basePath}/en/guide/define-rules`;
  const pagesCache = 'casl-docs-v7-pages-browser-test-A';

  await page.goto(visited);
  await page.waitForFunction(async () => !!(await navigator.serviceWorker.getRegistration())?.active);
  assert.equal(await documentBuild(page), 'browser-test-A');
  assert.equal(navigations, 1, 'first installation does not reload');
  assert.equal(await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).updateViaCache), 'none');
  await page.reload();
  await page.waitForFunction(async (name) => (await caches.open(name)).keys()
    .then(keys => keys.some(request => request.url === location.href)), {}, pagesCache);

  const port = server.port;
  await server.stop();
  server = await startDevServer('browser-test-B', port);
  await page.reload();
  assert.equal(await documentBuild(page), 'browser-test-B');
  await waitForUpdatePrompt(page);
  assert.ok(await page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration()).waiting));
  await page.goto(newDuringUpdate);
  assert.equal(await documentBuild(page), 'browser-test-B');
  await waitForUpdatePrompt(page);

  // Stop the origin as well as the page network: page-level offline emulation
  // does not consistently stop fetches made by service workers.
  await server.stop();
  await page.setOfflineMode(true);
  // Vite serves unbundled modules, which are not production precache assets.
  // Inspect the cached documents without attempting to execute those modules.
  await page.setJavaScriptEnabled(false);
  for (const url of [visited, `${origin}${basePath}/en/guide/install`, newDuringUpdate]) {
    await page.goto(url);
    assert.equal(await documentBuild(page), 'browser-test-A',
      'offline visited, unvisited, and newer routes must use the active build');
  }

  server = await startDevServer('browser-test-B', port);
  await page.setOfflineMode(false);
  await page.setJavaScriptEnabled(true);
  await page.goto(visited);
  await waitForUpdatePrompt(page);
  const beforeActivation = navigations;
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.evaluate(() => document.querySelector('app-notification').click()),
  ]);
  assert.equal(navigations, beforeActivation + 1, 'accepting the update reloads exactly once');
  assert.equal(await documentBuild(page), 'browser-test-B');
  assert.ok(!(await page.evaluate(() => caches.keys())).includes(pagesCache),
    'activation removes the previous build navigation cache');

  await server.stop();
  await page.setOfflineMode(true);
  await page.setJavaScriptEnabled(false);
  await page.goto(`${origin}${basePath}/en/guide/install`);
  assert.equal(await documentBuild(page), 'browser-test-B', 'accepting the update switches the offline shell');
});

async function startDevServer(buildId, port = 0) {
  const child = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: docsDir,
    env: {
      ...process.env,
      NO_COLOR: '1',
      LIT_APP_PUBLIC_PATH: basePath,
      LIT_APP_COMMIT_HASH: buildId,
      LIT_APP_PWA_DEV: 'true',
    },
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  const collect = chunk => { output = `${output}${chunk}`.slice(-12000); };
  child.stdout.on('data', collect);
  child.stderr.on('data', collect);

  async function stop() {
    if (child.exitCode !== null || child.signalCode !== null) return;
    const exited = once(child, 'exit');
    process.kill(-child.pid, 'SIGTERM');
    await exited;
  }

  try {
    const deadline = Date.now() + 45000;
    while (Date.now() < deadline) {
      if (child.exitCode !== null || child.signalCode !== null) break;
      const url = output.match(/http:\/\/127\.0\.0\.1:(\d+)/);
      if (url) {
        const origin = url[0];
        const response = await fetch(`${origin}${basePath}/`);
        assert.equal(response.status, 200, output);
        return { origin, port: Number(url[1]), stop };
      }
      await setTimeout(100);
    }
    throw new Error(`Dev server did not start:\n${output}`);
  } catch (error) {
    await stop();
    throw error;
  }
}

async function documentBuild(page) {
  return page.$eval('meta[name="casl-build"]', meta => meta.content);
}

async function waitForUpdatePrompt(page) {
  await page.waitForFunction(() => Array.from(document.querySelectorAll('app-notification'))
    .filter(notification => notification.message === 'updateAvailable').length === 1);
}
