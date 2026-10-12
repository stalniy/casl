import http from 'http';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { promisify } from 'util';
import { dirname, resolve, join, extname, sep } from 'path';
import { fileURLToPath } from 'url';
import { exportMarkdown } from './markdownExport.js';

const MIME_TYPES = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.xml': 'application/xml', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const DIST_PATH = resolve(__dirname, '..', process.env.LIT_APP_DIST_FOLDER || 'dist');
const BASE_URL = normalizeBasePath(process.env.LIT_APP_PUBLIC_PATH || '');
const RENDER_TIMEOUT = Number(process.env.LIT_APP_RENDER_TIMEOUT_MS || 30000);
let LOCAL_APP = 'http://127.0.0.1:';

function normalizeBasePath(path) {
  const trimmed = `/${String(path || '').split('/').filter(Boolean).join('/')}`;
  return trimmed === '/' ? '' : trimmed;
}

function createStaticServer(root) {
  const shell = fs.readFileSync(join(root, 'index.html'));
  return (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const appPath = BASE_URL && (pathname === BASE_URL || pathname.startsWith(`${BASE_URL}/`))
      ? pathname.slice(BASE_URL.length) || '/'
      : pathname;
    let filePath = resolve(root, `.${appPath}`);
    if (!filePath.startsWith(`${resolve(root)}${sep}`) && filePath !== resolve(root)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html');
    // Route snapshots are output artifacts, never input documents for later
    // workers. Serve the original app shell retained in memory for route paths.
    if (extname(filePath) === '.html' && filePath !== join(root, 'index.html')) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(shell);
      return;
    }
    if (!fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(shell);
      return;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) return res.writeHead(404).end('Not found');
      res.writeHead(200, { 'Content-Type': MIME_TYPES[extname(filePath)] || 'application/octet-stream' });
      res.end(content);
    });
  };
}

async function readSitemapUrls(browser) {
  const sitemap = fs.readFileSync(join(DIST_PATH, 'sitemap.xml'), 'utf8');
  const page = await browser.newPage();
  try {
    return await page.evaluate((xml) => {
      const doc = new DOMParser().parseFromString(xml, 'application/xml');
      const error = doc.querySelector('parsererror');
      if (error) throw new Error('sitemap.xml is invalid XML');
      return Array.from(doc.querySelectorAll('loc')).map((loc) => {
        const url = new URL(loc.textContent);
        return `${url.pathname}${url.search}${url.hash}`;
      });
    }, sitemap);
  } finally {
    await page.close();
  }
}

export function getComposedSnapshot(root = document.querySelector('casl-docs')) {
  const composedChildren = (node) => {
    if (node.nodeType === Node.ELEMENT_NODE && node.localName === 'slot') {
      const assigned = node.assignedNodes({ flatten: false });
      return assigned.length ? assigned : Array.from(node.childNodes);
    }
    if (node.nodeType === Node.ELEMENT_NODE && node.shadowRoot) return Array.from(node.shadowRoot.childNodes);
    return Array.from(node.childNodes || []);
  };
  const findAll = (root, name, output = []) => {
    for (const child of composedChildren(root)) {
      if (child.nodeType !== Node.ELEMENT_NODE) continue;
      if (child.localName === name) output.push(child);
      findAll(child, name, output);
    }
    return output;
  };
  const serialize = (node) => {
    const escapeText = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapeAttribute = value => escapeText(value).replace(/"/g, '&quot;');
    if (node.nodeType === Node.TEXT_NODE) return escapeText(node.nodeValue);
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const tag = node.localName;
    if (tag === 'script' || tag === 'style' || tag === 'template') return '';
    if (tag === 'slot' || tag.includes('-')) return composedChildren(node).map(serialize).join('');
    const attributes = Array.from(node.attributes)
      .filter(({ name }) => !name.startsWith('on') && name !== 'style')
      .map(({ name, value }) => ` ${name}="${escapeAttribute(value)}"`).join('');
    const voidElement = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/.test(tag);
    if (voidElement) return `<${tag}${attributes}>`;
    return `<${tag}${attributes}>${composedChildren(node).map(serialize).join('')}</${tag}>`;
  };
  if (!root?.shadowRoot) throw new Error('application shadow root was not created');
  const mains = findAll(root, 'main');
  if (!mains.length) throw new Error('rendered page has no main content element');
  const navs = findAll(root, 'nav').filter((nav) => {
    let ancestor = nav.assignedSlot || nav.parentNode;
    while (ancestor) {
      if (ancestor.nodeType === Node.ELEMENT_NODE && (ancestor.localName === 'main' || ancestor.localName === 'nav')) return false;
      ancestor = ancestor.assignedSlot || ancestor.parentNode?.host || ancestor.parentNode;
    }
    return true;
  });
  const content = mains.map(serialize).join('\n');
  const navigation = navs.map(serialize).join('\n');
  if (!content.trim()) throw new Error('rendered main content is empty');
  return `<div class="prerender-navigation">${navigation}</div>${content}`;
}

async function waitForRouteContent(page, url) {
  try {
    const readiness = () => {
      const app = document.querySelector('casl-docs');
      if (app?.hasAttribute('data-content-error')) return true;
      if (app?.hasAttribute('data-content-not-found')) return true;
      return app?.getAttribute('data-rendered-route') === `${location.pathname}${location.search}${location.hash}`;
    };
    const inspect = () => page.$eval('casl-docs', app => {
      return {
        location: `${location.pathname}${location.search}${location.hash}`,
        ready: app.ready,
        renderedRoute: app.getAttribute('data-rendered-route'),
        contentError: app.getAttribute('data-content-error'),
        contentNotFound: app.hasAttribute('data-content-not-found'),
        routeName: app._route?.name,
        routeParams: app._route?.params,
      };
    });
    try {
      // Worker tabs can be backgrounded, where animation-frame polling stalls.
      await page.waitForFunction(readiness, { timeout: RENDER_TIMEOUT, polling: 25 });
    } catch (error) {
      const status = await inspect().catch(() => ({ app: 'missing' }));
      throw new Error(`did not become ready before timeout (${RENDER_TIMEOUT}ms); state=${JSON.stringify(status)}`, { cause: error });
    }
    const status = await inspect();
    if (status.contentError) throw new Error(`content loading failed: ${status.contentError}`);
    if (status.routeName === 'notFound' || status.contentNotFound) {
      throw new Error('route resolved unexpectedly to not-found content');
    }
    if (!status.renderedRoute) throw new Error(`route content did not become ready; state=${JSON.stringify(status)}`);
    return status;
  } catch (error) {
    throw new Error(`route ${url}: ${error.message}`, { cause: error });
  }
}

async function renderPage({ page, iterator }, options) {
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const type = request.resourceType();
    if (['stylesheet', 'font', 'image'].includes(type) ||
      type === 'script' && !request.url().startsWith(LOCAL_APP)) request.abort();
    else request.continue();
  });

  for (const url of iterator) {
    console.log(`[fetching]: ${url}`);
    await page.goto(`${LOCAL_APP}${url}`, { waitUntil: 'domcontentloaded' });
    const routeState = await waitForRouteContent(page, url);
    const snapshot = await page.evaluate(getComposedSnapshot);
    let html = await page.evaluate((content) => {
      const fallback = document.getElementById('prerender-fallback');
      if (!fallback) throw new Error('prerender fallback container is missing');
      fallback.innerHTML = content;
      fallback.removeAttribute('hidden');
      fallback.removeAttribute('aria-hidden');
      fallback.removeAttribute('inert');
      return '<!doctype html>\n' + document.documentElement.outerHTML;
    }, snapshot);

    const pathname = new URL(url, 'http://localhost').pathname;
    if (BASE_URL && pathname !== BASE_URL && !pathname.startsWith(`${BASE_URL}/`)) {
      throw new Error(`route ${url}: sitemap URL is outside public path ${BASE_URL}`);
    }
    const outputPath = pathname.slice(BASE_URL.length).replace(/^\/+|\/+$/g, '');
    const fullPath = resolve(options.basePath, outputPath);
    if (!fullPath.startsWith(`${resolve(options.basePath)}${sep}`)) {
      throw new Error(`route ${url}: output path escapes build directory`);
    }
    console.log(`[saving]: ${url}`);
    try {
      await mkdir(fullPath, { recursive: true });
    } catch (error) {
      throw new Error(`route ${url}: cannot create output directory ${fullPath}: ${error.message}`, { cause: error });
    }
    const markdownUrl = await exportMarkdown(url, fullPath, BASE_URL, routeState);
    if (markdownUrl) {
      html = await page.evaluate((href) => {
        document.head.querySelectorAll('link[rel="alternate"][type="text/markdown"]').forEach(link => link.remove());
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.type = 'text/markdown';
        link.href = href;
        document.head.appendChild(link);
        document.body.querySelectorAll('[data-markdown-discovery]').forEach(node => node.remove());
        const notice = document.createElement('div');
        notice.hidden = true;
        notice.setAttribute('aria-hidden', 'true');
        notice.setAttribute('data-markdown-discovery', '');
        notice.textContent = `Markdown version of this documentation: ${href}`;
        document.body.appendChild(notice);
        return '<!doctype html>\n' + document.documentElement.outerHTML;
      }, markdownUrl);
    }
    try {
      await writeFile(join(fullPath, 'index.html'), html);
    } catch (error) {
      throw new Error(`route ${url}: cannot write HTML snapshot: ${error.message}`, { cause: error });
    }
    console.log(`[saved]: ${url}`);
  }
}

async function render(options) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const urls = await readSitemapUrls(browser);
    if (!urls.length) throw new Error('sitemap contains no routes');
    console.log(`read ${urls.length} urls from sitemap`);
    let index = 0;
    const iterator = { [Symbol.iterator]: () => ({ next: () => ({ value: urls[index++], done: index > urls.length }) }) };
    const workers = await Promise.all(Array.from({ length: Math.min(16, urls.length) }, async () => ({
      iterator,
      page: await browser.newPage(),
    })));
    try {
      workers.forEach(({ page }) => {
        page.setDefaultTimeout(RENDER_TIMEOUT);
        page.setDefaultNavigationTimeout(RENDER_TIMEOUT);
      });
      await Promise.all(workers.map(worker => renderPage(worker, options)));
    } finally {
      await Promise.allSettled(workers.map(worker => worker.page.close()));
    }
  } finally {
    await browser.close();
  }
}

async function listen(server) {
  await new Promise((resolveListen, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolveListen);
  });
  LOCAL_APP += server.address().port;
  console.log(`started http server on port ${LOCAL_APP}`);
}

async function run() {
  if (!Number.isFinite(RENDER_TIMEOUT) || RENDER_TIMEOUT <= 0) throw new Error('LIT_APP_RENDER_TIMEOUT_MS must be a positive number');
  const basePath = DIST_PATH;
  const server = http.createServer(createStaticServer(basePath));
  try {
    await listen(server);
    await render({ basePath });
  } finally {
    await new Promise(resolveClose => server.close(resolveClose));
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run()
    .then(() => console.log('successfully finished prerendering'))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
