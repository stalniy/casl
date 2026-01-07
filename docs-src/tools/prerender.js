import http from 'http';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { promisify } from 'util';
import { dirname, resolve, join, extname } from 'path';
import { fileURLToPath } from 'url';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

function createStaticServer(root) {
  return (req, res) => {
    let filePath = join(root, req.url === '/' ? 'index.html' : req.url);

    // Try to serve the file directly, or fall back to index.html for SPA routing
    if (!fs.existsSync(filePath)) {
      filePath = join(root, 'index.html');
    } else if (fs.statSync(filePath).isDirectory()) {
      filePath = join(filePath, 'index.html');
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  };
}

const __dirname = dirname(fileURLToPath(import.meta.url));

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
let LOCAL_APP = 'http://localhost:';
const BASE_URL = process.env.LIT_APP_PUBLIC_PATH || '';

async function readSitemapUrls(browser) {
  const page = await browser.newPage();
  await page.goto(LOCAL_APP);

  return page.evaluate(async () => {
    const response = await fetch('/sitemap.xml');
    const source = await response.text();
    const doc = (new DOMParser()).parseFromString(source, 'application/xml');

    return Array.from(doc.querySelectorAll('loc'))
      .map((loc) => {
        const index = loc.textContent.indexOf('://');
        const startIndex = loc.textContent.indexOf('/', index + 3);
        return loc.textContent.slice(startIndex);
      });
  });
}

async function renderPage({ page, iterator }, options) {
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const isAbortedRequest = req.resourceType() === 'stylesheet' ||
      req.resourceType() === 'font' ||
      req.resourceType() === 'image' ||
      req.resourceType() === 'script' && !req.url().startsWith('http://localhost');

    if (isAbortedRequest) {
      req.abort()
    } else {
      req.continue()
    }
  });

  for (const url of iterator) {
    console.log(`[fetching]: ${url}`);
    await page.goto(LOCAL_APP + url, { waitUntil: 'networkidle2' });

    const html = await page.content();
    const fullPath = options.basePath + url.slice(BASE_URL.length);

    console.log(`[saving]: ${url}`);
    await mkdir(fullPath, { recursive: true });
    await writeFile(`${fullPath}/index.html`, html);
    console.log(`[saved]: ${url}`);
  }
}

async function render(options) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const urls = await readSitemapUrls(browser);
    console.log('read urls from sitemap');
    const iterator = urls.values();
    const createWorkers = Array.from({ length: 16 }).map(async () => ({
      iterator,
      page: await browser.newPage()
    }));
    const workers = await Promise.all(createWorkers);
    const jobs = workers.map(w => renderPage(w, options));

    await Promise.all(jobs);
    await Promise.allSettled(workers.map(w => w.page.close()));
  } finally {
    await browser.close();
  }
}

async function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, () => {
      LOCAL_APP += server.address().port;
      console.log(`started http server on port ${LOCAL_APP}`);
      resolve();
    });
  });
}

async function run() {
  const basePath = resolve(__dirname, '../dist');
  const server = http.createServer(createStaticServer(basePath));

  try {
    await listen(server);
    await render({ basePath });
  } finally {
    server.close();
  }
}

run()
  .then(() => console.log('successfully finished prerendering'))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
