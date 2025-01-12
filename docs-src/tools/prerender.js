const http = require('http');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { promisify } = require('util');
const { createServer } = require('history-server');

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
  const basePath = `${__dirname}/../dist`;
  const app = createServer([
    { path: BASE_URL || '/', root: basePath },
    { path: '/', root: basePath },
  ]);
  const server = http.createServer(app);

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
