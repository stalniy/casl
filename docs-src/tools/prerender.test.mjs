import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { execFile as execFileCallback } from 'node:child_process';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { promisify } from 'node:util';
import puppeteer from 'puppeteer';
import { getComposedSnapshot } from './prerender.js';

// This suite runs after build.sitemap and prerender, against the same generated
// files that are shipped to GitHub Pages.
const root = path.resolve(import.meta.dirname, '../dist');
const docsRoot = path.resolve(import.meta.dirname, '..');
const basePath = `/${(process.env.LIT_APP_PUBLIC_PATH || '').split('/').filter(Boolean).join('/')}`.replace(/^\/$/, '');
const routeFile = route => path.join(root, route.replace(basePath, '').replace(/^\/+|\/+$/g, ''), 'index.html');
const execFile = promisify(execFileCallback);
const articleRoute = `${basePath}/en/guide/intro` || '/en/guide/intro';

async function runPrerenderFixture({ timeout, breakEntrypoint = false, failArticle = false, missingContent = false, escapeMetadata = false, repeat = 1 }) {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'casl-prerender-'));
  const dist = path.join(temporaryRoot, 'dist');
  const fixtureRoute = missingContent ? `${basePath}/en/guide/missing-readiness-fixture` : articleRoute;
  const snapshot = path.join(dist, fixtureRoute.replace(basePath, '').replace(/^\/+|\/+$/g, ''), 'index.html');
  await cp(root, dist, { recursive: true });
  await rm(path.join(dist, 'en'), { recursive: true, force: true });
  await writeFile(path.join(dist, 'sitemap.xml'),
    `<urlset><url><loc>https://docs.example${fixtureRoute}</loc></url></urlset>`);
  if (breakEntrypoint) {
    const indexFile = path.join(dist, 'index.html');
    const indexHtml = await readFile(indexFile, 'utf8');
    await writeFile(indexFile, indexHtml.replace(/<script type="module"[^>]*><\/script>/, ''));
  }
  if (failArticle) {
    const assets = await readdir(path.join(dist, 'assets/guide'));
    const article = assets.find(file => file.startsWith('intro.en-') && file.endsWith('.json'));
    await writeFile(path.join(dist, 'assets/guide', article), 'null');
  }
  if (escapeMetadata) {
    const assets = await readdir(path.join(dist, 'assets/guide'));
    const article = assets.find(file => file.startsWith('intro.en-') && file.endsWith('.json'));
    const source = JSON.parse(await readFile(path.join(dist, 'assets/guide', article), 'utf8'));
    source.title = 'A & <Test> "Title"';
    source.meta.description = 'First line\nsecond line';
    await writeFile(path.join(dist, 'assets/guide', article), JSON.stringify(source));
  }

  try {
    let stdout = '';
    let stderr = '';
    for (let run = 0; run < repeat; run += 1) {
      const result = await execFile(process.execPath, ['tools/prerender.js'], {
        cwd: docsRoot,
        timeout: 20000,
        maxBuffer: 1024 * 1024,
        env: {
          ...process.env,
          LIT_APP_PUBLIC_PATH: basePath,
          LIT_APP_DIST_FOLDER: dist,
          LIT_APP_RENDER_TIMEOUT_MS: String(timeout),
        },
      });
      stdout += result.stdout;
      stderr += result.stderr;
    }
    return { code: 0, stdout, stderr, snapshot, temporaryRoot };
  } catch (error) {
    return {
      code: error.code || 1,
      stdout: error.stdout || '',
      stderr: error.stderr || '',
      snapshot,
      temporaryRoot,
    };
  }
}

async function runMarkdownFailureFixture({ source, files = {}, artifacts = [] }) {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'casl-markdown-prerender-'));
  const isolatedRoot = path.join(temporaryRoot, 'repo');
  const isolatedDocs = path.join(isolatedRoot, 'docs-src');
  const dist = path.join(isolatedDocs, 'dist');
  const route = `${basePath}/en/guide/intro`;
  const output = path.join(dist, 'en/guide/intro');
  await mkdir(path.join(isolatedDocs, 'tools'), { recursive: true });
  await cp(root, dist, { recursive: true });
  await rm(path.join(dist, 'en/guide/intro'), { recursive: true, force: true });
  await writeFile(path.join(dist, 'sitemap.xml'), `<urlset><url><loc>https://docs.example${route}</loc></url></urlset>`);
  await cp(path.join(docsRoot, 'tools/prerender.js'), path.join(isolatedDocs, 'tools/prerender.js'));
  await cp(path.join(docsRoot, 'tools/markdownExport.js'), path.join(isolatedDocs, 'tools/markdownExport.js'));
  await cp(path.join(docsRoot, 'package.json'), path.join(isolatedDocs, 'package.json'));
  await symlink(path.join(docsRoot, 'node_modules'), path.join(isolatedDocs, 'node_modules'), 'dir');
  if (source !== undefined) {
    const sourceFile = path.join(isolatedDocs, 'src/content/pages/guide/intro/en.md');
    await mkdir(path.dirname(sourceFile), { recursive: true });
    await writeFile(sourceFile, source);
  }
  for (const [relative, contents] of Object.entries(files)) {
    const target = path.join(isolatedRoot, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, contents);
  }
  await mkdir(output, { recursive: true });
  for (const artifact of artifacts) {
    const target = path.join(output, artifact.name);
    if (artifact.directory) await mkdir(target, { recursive: true });
    else await writeFile(target, artifact.bytes);
  }
  try {
    const result = await execFile(process.execPath, ['tools/prerender.js'], {
      cwd: isolatedDocs,
      timeout: 20000,
      maxBuffer: 1024 * 1024,
      env: { ...process.env, LIT_APP_PUBLIC_PATH: basePath, LIT_APP_RENDER_TIMEOUT_MS: '12000' },
    });
    return { code: 0, stdout: result.stdout, stderr: result.stderr, html: path.join(output, 'index.html'), temporaryRoot };
  } catch (error) {
    return { code: error.code || 1, stdout: error.stdout || '', stderr: error.stderr || '', html: path.join(output, 'index.html'), temporaryRoot };
  }
}

test('composed serializer resolves nested shadow roots, slots and fallback in order', async (t) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  t.after(() => browser.close());
  const page = await browser.newPage();
  await page.setContent('<x-outer id="root"><b slot="named">Named &amp; safe</b><strong slot="article">Article</strong>text <span slot="orphan">unassigned</span></x-outer>');
  await page.evaluate(() => {
    customElements.define('x-inner', class extends HTMLElement {
      constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML = '<i>nested</i>'; }
    });
    customElements.define('x-fallback', class extends HTMLElement {
      constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML = '<p><slot>fallback text</slot></p>'; }
    });
    customElements.define('x-outer', class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = '<nav><slot name="named">nav fallback</slot></nav><main><nav>in-content navigation</nav><div>A<x-inner></x-inner><slot name="article">article fallback</slot><slot>default fallback</slot><x-fallback></x-fallback><script>bad()</script><style>bad{}</style></div></main>';
      }
    });
  });
  const source = `(${getComposedSnapshot.toString()})`;
  const composed = await page.evaluate((functionSource) =>
    Function(`return ${functionSource}`)()(document.querySelector('#root')),
  source);
  assert.equal(composed, '<div class="prerender-navigation"><nav><b slot="named">Named &amp; safe</b></nav></div><main><nav>in-content navigation</nav><div>A<i>nested</i><strong slot="article">Article</strong>text <p>fallback text</p></div></main>');
  assert.doesNotMatch(composed, /unassigned|<script|<style|<slot|nav fallback|article fallback|default fallback/);
});

test('generated home and article snapshots expose content and native navigation without JavaScript', async (t) => {
  const homePath = `${basePath}/en` || '/en';
  const articlePath = `${basePath}/en/guide/intro` || '/en/guide/intro';
  const [home, article] = await Promise.all([
    readFile(routeFile(homePath), 'utf8'),
    readFile(routeFile(articlePath), 'utf8'),
  ]);
  assert.match(home, /id="prerender-fallback"[^>]*>/);
  assert.match(home, /<main>[\s\S]*?Isomorphic Authorization/);
  assert.match(home, /href="[^"]*guide\/intro[^"]*"/);
  assert.match(article, /<main>[\s\S]*?<h1[^>]*>Introduction/);
  assert.match(article, /<nav[\s\S]*?href="[^"]+"/);
  assert.match(article, /<pre[\s\S]*?<code[\s\S]*?Ability/);
  assert.match(article, /<html[^>]*lang="en"/);
  assert.match(article, /<title>Introduction/);
  assert.match(article, /<meta name="keywords" content="[^"]+"/);
  const articleAssets = await readdir(path.join(root, 'assets/guide'));
  const articleAsset = articleAssets.find(file => file.startsWith('intro.en-') && file.endsWith('.json'));
  assert.ok(articleAsset, 'compiled article content is present');
  const sourcePage = JSON.parse(await readFile(path.join(root, 'assets/guide', articleAsset), 'utf8'));

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  t.after(() => browser.close());
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.setContent(article);
  assert.match(await page.$eval('main', main => main.innerText), /Introduction/);
  assert.ok(await page.$$eval('main pre code', nodes => nodes.length));
  const expectedCode = await page.evaluate(content => {
    const source = document.createElement('div');
    source.innerHTML = content;
    return Array.from(source.querySelectorAll('pre code'), node => node.textContent);
  }, sourcePage.content);
  const actualCode = await page.$$eval('main pre code', nodes => nodes.map(node => node.textContent));
  assert.deepEqual(actualCode, expectedCode, 'code text and whitespace match the compiled content source');
  const headingId = await page.$eval('main h2[id]', heading => heading.id);
  assert.ok(headingId);
  const nativeLinks = await page.$$eval('.prerender-navigation a[href]', anchors =>
    anchors.map(anchor => ({ href: anchor.getAttribute('href'), label: anchor.textContent.trim() })));
  assert.ok(nativeLinks.length);
  assert.ok(nativeLinks.some(({ href, label }) => href && label));
  assert.ok(nativeLinks.some(({ href }) => href.startsWith(`${basePath}/`) || href.startsWith('/en')),
    'native links retain the deployed version prefix or root route');
});

test('saved snapshots have final unique Open Graph metadata and route-local Markdown discovery', async (t) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  t.after(() => browser.close());
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  const routes = [
    'en',
    'en/guide/intro',
    'en/api/casl-ability',
    'en/support-casljs',
    'en/package/casl-prisma',
  ];
  for (const route of routes) {
    const htmlPath = path.join(root, route.replace(basePath, '').replace(/^\/+|\/+$/g, ''), 'index.html');
    const html = await readFile(htmlPath, 'utf8');
    await page.setContent(html);
    const metadata = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      ogTitles: Array.from(document.querySelectorAll('meta[property="og:title"]'), tag => tag.content),
      ogDescriptions: Array.from(document.querySelectorAll('meta[property="og:description"]'), tag => tag.content),
      markdownLinks: Array.from(document.head.querySelectorAll('link[rel="alternate"][type="text/markdown"]'), link => link.getAttribute('href')),
      notices: Array.from(document.body.querySelectorAll('[data-markdown-discovery]'), node => ({
        text: node.textContent,
        hidden: node.hidden,
        ariaHidden: node.getAttribute('aria-hidden'),
        directBodyChild: node.parentElement === document.body,
      })),
    }));
    assert.deepEqual(metadata.ogTitles, [metadata.title], `${route} has one decoded Open Graph title matching document.title`);
    assert.deepEqual(metadata.ogDescriptions, [metadata.description], `${route} has one decoded Open Graph description matching the description meta`);
    if (route === 'en') {
      assert.deepEqual(metadata.markdownLinks, []);
      assert.deepEqual(metadata.notices, []);
      assert.equal(await readFile(path.join(path.dirname(htmlPath), 'index.md')).then(() => true, () => false), false);
    } else {
      const pathname = `/${route}`;
      const expected = `${basePath}${pathname}/index.md`;
      assert.deepEqual(metadata.markdownLinks, [expected]);
      assert.deepEqual(metadata.notices, [{
        text: `Markdown version of this documentation: ${expected}`,
        hidden: true,
        ariaHidden: 'true',
        directBodyChild: true,
      }]);
      await readFile(path.join(path.dirname(htmlPath), 'index.md'));
    }
  }

  const repeated = await runPrerenderFixture({ timeout: 10000, repeat: 2 });
  t.after(() => rm(repeated.temporaryRoot, { recursive: true, force: true }));
  assert.equal(repeated.code, 0, repeated.stderr);
  await page.setContent(await readFile(repeated.snapshot, 'utf8'));
  assert.equal(await page.$$eval('meta[property="og:title"]', tags => tags.length), 1);
  assert.equal(await page.$$eval('meta[property="og:description"]', tags => tags.length), 1);
  assert.equal(await page.$$eval('link[rel="alternate"][type="text/markdown"]', tags => tags.length), 1);
  assert.equal(await page.$$eval('[data-markdown-discovery]', nodes => nodes.length), 1);

  const escaped = await runPrerenderFixture({ timeout: 10000, escapeMetadata: true });
  t.after(() => rm(escaped.temporaryRoot, { recursive: true, force: true }));
  assert.equal(escaped.code, 0, escaped.stderr);
  await page.setContent(await readFile(escaped.snapshot, 'utf8'));
  const escapedValues = await page.evaluate(() => ({
    title: document.title,
    ogTitle: document.querySelector('meta[property="og:title"]')?.content,
    description: document.querySelector('meta[name="description"]')?.content,
    ogDescription: document.querySelector('meta[property="og:description"]')?.content,
  }));
  assert.equal(escapedValues.ogTitle, escapedValues.title);
  assert.equal(escapedValues.title, 'A & <Test> "Title" - CASL');
  assert.equal(escapedValues.ogDescription, escapedValues.description);
  assert.equal(escapedValues.description, 'First line second line');
});

test('browser takeover waits for route content and leaves fallback on startup failure', async (t) => {
  let failArticleResponse = false;
  let markContentRequestStarted;
  const contentRequestStarted = new Promise(resolve => { markContentRequestStarted = resolve; });
  const server = http.createServer(async (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const routePath = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname;
    const candidate = path.join(root, routePath.replace(/^\/+|\/+$/g, ''), 'index.html');
    const filePath = pathname.includes('/assets/') || pathname.endsWith('.css') || pathname.endsWith('.json')
      ? path.join(root, routePath.replace(/^\/+/, ''))
      : candidate;
    try {
      if (failArticleResponse && /\/assets\/guide\/intro\.en-.*\.json$/.test(pathname)) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end('null');
        return;
      }
      const body = await readFile(filePath);
      if (/\/assets\/guide\/intro\.en-.*\.json$/.test(pathname)) {
        markContentRequestStarted();
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      const extension = path.extname(filePath);
      const contentType = {
        '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
        '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
      }[extension] || 'application/octet-stream';
      res.writeHead(200, { 'content-type': contentType });
      res.end(body);
    } catch {
      const shell = await readFile(path.join(root, 'index.html'));
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(shell);
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => {
    server.closeAllConnections();
    server.close(resolve);
  }));
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  t.after(() => browser.close());
  const page = await browser.newPage();
  const url = `http://127.0.0.1:${server.address().port}${basePath}/en/guide/intro`;
  const origin = new URL(url).origin;
  const nativePage = await browser.newPage();
  await nativePage.setJavaScriptEnabled(false);
  await nativePage.goto(url, { waitUntil: 'domcontentloaded' });
  const nativeHeadingId = await nativePage.$eval('main h2[id]', heading => heading.id);
  await nativePage.goto(`${url}#${encodeURIComponent(nativeHeadingId)}`, { waitUntil: 'domcontentloaded' });
  await nativePage.waitForFunction(id => location.hash === `#${id}`, { polling: 25, timeout: 3000 }, nativeHeadingId);
  const nativeFragmentPosition = await nativePage.$eval(`#${nativeHeadingId}`, heading => ({
    top: heading.getBoundingClientRect().top,
    bottom: heading.getBoundingClientRect().bottom,
    viewportHeight: window.innerHeight,
  }));
  assert.ok(nativeFragmentPosition.bottom > 0 && nativeFragmentPosition.top < nativeFragmentPosition.viewportHeight,
    `native fragment navigation scrolls the preserved heading into the viewport: ${JSON.stringify(nativeFragmentPosition)}`);
  await nativePage.close();
  await page.setRequestInterception(true);
  page.on('request', request => new URL(request.url()).origin === origin ? request.continue() : request.abort());
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  let requestTimer;
  await Promise.race([
    contentRequestStarted,
    new Promise((_, reject) => { requestTimer = setTimeout(() => reject(new Error('timed out waiting for delayed article request')), 5000); }),
  ]).finally(() => clearTimeout(requestTimer));
  assert.equal(await page.$eval('#prerender-fallback', fallback => !fallback.hidden), true);
  assert.match(await page.$eval('#prerender-fallback', fallback => fallback.innerText), /Introduction/,
    'the populated fallback remains readable while route content is loading');
  await page.waitForFunction(() => document.querySelector('casl-docs')?.hasAttribute('data-rendered-route'), { timeout: 20000 });
  await page.waitForFunction(() => document.querySelector('#prerender-fallback')?.hidden, { timeout: 5000 });
  assert.equal(await page.$eval('#prerender-fallback', fallback => fallback.getAttribute('aria-hidden')), 'true');
  assert.equal(await page.$eval('#prerender-fallback', fallback => fallback.hasAttribute('inert')), true);
  assert.match(await page.$eval('casl-docs', app => {
    const read = root => Array.from(root.childNodes).map((node) => {
      if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
      if (node.nodeType !== Node.ELEMENT_NODE) return '';
      if (node.localName === 'slot') {
        const assigned = node.assignedNodes({ flatten: true });
        return read({ childNodes: assigned.length ? assigned : Array.from(node.childNodes) });
      }
      return node.shadowRoot ? read(node.shadowRoot) : read(node);
    }).join('');
    return read(app.shadowRoot);
  }), /Introduction/);

  const clickInApp = async (test) => page.evaluate((selector) => {
    const find = root => {
      for (const element of root.querySelectorAll('*')) {
        if (element.matches(selector)) return element;
        if (element.shadowRoot) {
          const found = find(element.shadowRoot);
          if (found) return found;
        }
      }
      return null;
    };
    const anchor = find(document.querySelector('casl-docs').shadowRoot);
    if (!anchor) throw new Error(`cannot find in-app anchor: ${selector}`);
    anchor.click();
    return anchor.href;
  }, test);
  const nextUrl = await clickInApp('a[href*="/guide/define-rules"]');
  assert.ok(nextUrl, 'interactive documentation links are present in the app view');
  await page.waitForFunction(url => {
    const app = document.querySelector('casl-docs');
    const current = `${location.pathname}${location.search}${location.hash}`;
    return location.href === url && app?.getAttribute('data-rendered-route') === current;
  }, { timeout: 20000 }, nextUrl);
  assert.equal(await page.$eval('#prerender-fallback', fallback => fallback.hidden), true);
  await page.evaluate(() => history.back());
  const initialPath = new URL(url).pathname;
  await page.waitForFunction(expectedPath => {
    const app = document.querySelector('casl-docs');
    const current = `${location.pathname}${location.search}${location.hash}`;
    return location.pathname === expectedPath && app?.getAttribute('data-rendered-route') === current;
  }, { timeout: 20000 }, initialPath);
  assert.equal(await page.$eval('#prerender-fallback', fallback => fallback.hidden), true);

  const fragmentHeadingId = await page.evaluate(() => {
    const find = root => {
      for (const element of root.querySelectorAll('*')) {
        if (element.matches('h2[id]')) return element;
        if (element.shadowRoot) {
          const found = find(element.shadowRoot);
          if (found) return found;
        }
      }
      return null;
    };
    const heading = find(document.querySelector('casl-docs').shadowRoot);
    if (!heading) throw new Error('cannot find an identified article heading');
    heading.click();
    return heading.id;
  });
  await page.waitForFunction(id => location.hash === `#${id}` &&
    document.querySelector('casl-docs')?.getAttribute('data-rendered-route') === `${location.pathname}${location.search}${location.hash}`,
  { polling: 25, timeout: 5000 }, fragmentHeadingId);

  const scrollPosition = await page.evaluate(async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const app = document.querySelector('casl-docs');
    const pageElement = Array.from(app.shadowRoot.querySelectorAll('*')).find(element => element.localName === 'app-page');
    const heading = pageElement?.shadowRoot?.getElementById(location.hash.slice(1));
    return { hash: location.hash, top: heading?.getBoundingClientRect().top };
  });
  assert.ok(scrollPosition.hash);
  assert.ok(Number.isFinite(scrollPosition.top), 'fragment navigation scrolls to the preserved heading ID');

  const cdp = await page.createCDPSession();
  const { nodes: accessibilityNodes } = await cdp.send('Accessibility.getFullAXTree');
  assert.equal(accessibilityNodes.filter(node => node.role?.value === 'heading' && node.name?.value === 'Introduction').length, 1,
    'the accessibility tree contains one article heading after takeover');

  const search = await page.evaluateHandle(() => {
    const find = root => {
      for (const element of root.querySelectorAll('*')) {
        if (element.matches('input')) return element;
        if (element.shadowRoot) {
          const found = find(element.shadowRoot);
          if (found) return found;
        }
      }
      return null;
    };
    return find(document.querySelector('casl-docs').shadowRoot);
  });
  assert.ok(search.asElement(), 'interactive documentation search input is rendered');
  await search.asElement().type('define');
  await page.waitForFunction(() => {
    const find = root => {
      for (const element of root.querySelectorAll('*')) {
        if (element.matches('.suggestions') && element.textContent.trim()) return element;
        if (element.shadowRoot) {
          const found = find(element.shadowRoot);
          if (found) return found;
        }
      }
      return null;
    };
    return !!find(document.querySelector('casl-docs').shadowRoot);
  }, { timeout: 10000 });

  const homeHref = await clickInApp('a[href$="/en"]');
  await page.waitForFunction(url => {
    const app = document.querySelector('casl-docs');
    const current = `${location.pathname}${location.search}${location.hash}`;
    return location.href === url && app?.getAttribute('data-rendered-route') === current;
  }, { timeout: 10000 }, homeHref);
  const restoredArticleUrl = await clickInApp('a[href*="/guide/intro"]');
  await page.waitForFunction(url => {
    const app = document.querySelector('casl-docs');
    const current = `${location.pathname}${location.search}${location.hash}`;
    return location.href === url && app?.getAttribute('data-rendered-route') === current;
  }, { timeout: 10000 }, restoredArticleUrl);
  assert.equal(new URL(restoredArticleUrl).pathname, initialPath,
    'returning from home restores the same cached article route');
  const restoredFragment = await page.evaluate(() => {
    const find = root => {
      for (const element of root.querySelectorAll('*')) {
        if (element.matches('h2[id]')) return element;
        if (element.shadowRoot) {
          const found = find(element.shadowRoot);
          if (found) return found;
        }
      }
      return null;
    };
    const heading = find(document.querySelector('casl-docs').shadowRoot);
    heading.click();
    return heading.id;
  });
  await page.waitForFunction(id => location.hash === `#${id}` &&
    document.querySelector('casl-docs')?.getAttribute('data-rendered-route') === `${location.pathname}${location.search}${location.hash}`,
  { polling: 25, timeout: 5000 }, restoredFragment);

  await page.evaluateOnNewDocument(() => {
    window.__readySources = [];
    document.addEventListener('content-ready', event => {
      if (event.composedPath().some(node => node.localName === 'home-page')) {
        window.__readySources.push('home-page');
      }
    });
    customElements.whenDefined('github-button').then(() => {
      Object.defineProperty(customElements.get('github-button').prototype, 'updateComplete', {
        configurable: true,
        get: () => new Promise(() => {}),
      });
    });
  });
  const homeUrl = `http://127.0.0.1:${server.address().port}${basePath}/en`;
  await page.goto(homeUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__readySources?.includes('home-page') &&
    document.querySelector('casl-docs')?.getAttribute('data-rendered-route') === `${location.pathname}${location.search}${location.hash}`,
  { timeout: 10000 });
  await page.waitForFunction(() => document.querySelector('#prerender-fallback')?.hidden, { timeout: 5000 });
  assert.deepEqual(await page.evaluate(() => window.__readySources), ['home-page'],
    'home-page readiness retires the fallback while the optional GitHub widget never updates');

  const failedPage = await browser.newPage();
  await failedPage.setRequestInterception(true);
  failedPage.on('request', request => request.resourceType() === 'script' ? request.abort() : request.continue());
  await failedPage.goto(url, { waitUntil: 'domcontentloaded' });
  assert.equal(await failedPage.$eval('#prerender-fallback', fallback => !fallback.hidden), true);
  await failedPage.close();

  failArticleResponse = true;
  const failedContentPage = await browser.newPage();
  await failedContentPage.setRequestInterception(true);
  failedContentPage.on('request', request => new URL(request.url()).origin === origin ? request.continue() : request.abort());
  await failedContentPage.goto(url, { waitUntil: 'domcontentloaded' });
  await failedContentPage.waitForFunction(() => document.querySelector('casl-docs')?.hasAttribute('data-content-error'), { timeout: 10000 });
  assert.equal(await failedContentPage.$eval('#prerender-fallback', fallback => !fallback.hidden), true,
    'fallback stays readable when required article content fails');
  await failedContentPage.close();
});

test('prerender exits unsuccessfully without writing a snapshot on startup timeout or content failure', async (t) => {
  for (const fixture of [
    { name: 'startup timeout', options: { timeout: 1200, breakEntrypoint: true } },
    { name: 'content failure', options: { timeout: 5000, failArticle: true } },
    { name: 'not-found content', options: { timeout: 5000, missingContent: true } },
  ]) {
    const result = await runPrerenderFixture(fixture.options);
    t.after(() => rm(result.temporaryRoot, { recursive: true, force: true }));
    assert.notEqual(result.code, 0, `${fixture.name} returns a nonzero exit`);
    assert.match(result.stderr, /route .*guide\//);
    assert.equal(await readFile(result.snapshot).then(() => true, () => false), false,
      `${fixture.name} leaves no successful snapshot for the failing route`);
    if (fixture.name === 'content failure') assert.match(result.stderr, /did not return rendered content/);
    else if (fixture.name === 'not-found content') assert.match(result.stderr, /route resolved unexpectedly to not-found content/);
    else assert.match(result.stderr, /did not become ready before timeout/);
  }
});

test('Markdown publication failures stop the command before advertising an export', async (t) => {
  const cases = [
    { name: 'missing page source', pattern: /cannot read Markdown source/ },
    { name: 'missing include', source: '@include: absent.md\n', pattern: /cannot read included file .*absent\.md/ },
    {
      name: 'include cycle',
      source: '@include: cycle-a.md\n',
      files: { 'cycle-a.md': '@include: cycle-b.md\n', 'cycle-b.md': '@include: cycle-a.md\n' },
      pattern: /include cycle/,
    },
    { name: 'missing local image', source: '![missing](./absent.png)\n', pattern: /cannot read image reference/ },
    {
      name: 'image copy collision',
      source: '![collision](./asset.png)\n',
      files: { 'docs-src/src/content/pages/guide/intro/asset.png': Buffer.from('source image') },
      artifacts: [{ name: 'asset.png', bytes: Buffer.from('existing output artifact') }],
      pattern: /image copy would overwrite another artifact/,
    },
    {
      name: 'Markdown output write failure',
      source: 'plain Markdown\n',
      artifacts: [{ name: 'index.md', directory: true }],
      pattern: /cannot write Markdown output/,
    },
  ];
  for (const scenario of cases) {
    const result = await runMarkdownFailureFixture(scenario);
    t.after(() => rm(result.temporaryRoot, { recursive: true, force: true }));
    assert.notEqual(result.code, 0, `${scenario.name} exits nonzero`);
    assert.match(result.stderr, new RegExp(`route ${basePath.replaceAll('/', '\\/')}\\/en\\/guide\\/intro`));
    assert.match(result.stderr, scenario.pattern, scenario.name);
    assert.equal(await readFile(result.html).then(() => true, () => false), false, `${scenario.name} leaves no new HTML snapshot`);
  }
});
