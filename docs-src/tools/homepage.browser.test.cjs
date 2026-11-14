const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const puppeteer = require('puppeteer');
const { test } = require('node:test');

// Run after a production build with LIT_APP_PUBLIC_PATH=/v5/.
test('versioned homepage loads its font, hero, downloads, and interactive examples', { timeout: 30000 }, async () => {
  const dist = path.resolve(__dirname, '../dist');
  const mime = { '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml' };
  const server = http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    let file = path.resolve(dist, `.${pathname.replace(/^\/v5/, '')}`);
    if (!file.startsWith(`${dist}/`) && file !== dist) {
      response.writeHead(403).end();
      return;
    }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(dist, 'index.html');
    response.setHeader('Content-Type', mime[path.extname(file)] || 'text/html');
    response.end(fs.readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('pageerror', error => console.error(error));
    const client = await page.target().createCDPSession();
    await client.send('Network.setBypassServiceWorker', { bypass: true });
    await page.setRequestInterception(true);
    const origin = `http://127.0.0.1:${server.address().port}`;
    page.on('request', request => request.url().startsWith(origin) ? request.continue() : request.abort());
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto(`${origin}/v5/en/`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.querySelector('casl-docs')?.shadowRoot?.querySelector('home-page')?.shadowRoot?.querySelector('authorization-examples')?.shadowRoot);
    const result = await page.evaluate(async () => {
      await Promise.all([400, 700].map(weight => document.fonts.load(`${weight} 48px "Stardos Stencil"`)));
      const app = document.querySelector('casl-docs');
      const home = app.shadowRoot.querySelector('home-page');
      const examples = home.shadowRoot.querySelector('authorization-examples');
      await Promise.race([examples.updateComplete, new Promise((_, reject) => setTimeout(() => reject(new Error('examples update timeout')), 5000))]);
      const timeline = examples.shadowRoot.querySelector('authorization-timeline');
      await timeline.updateComplete;
      const tabs = [...timeline.shadowRoot.querySelectorAll('[role="tab"]')];
      tabs[4].click();
      await timeline.updateComplete;
      const usesV5Ability = examples.shadowRoot.textContent.includes('new AbilityBuilder(Ability)');
      const sql = examples.shadowRoot.querySelector('input[value="sql"]');
      sql.checked = true;
      sql.dispatchEvent(new Event('change'));
      await examples.updateComplete;
      return {
        fontsLoaded: [...document.fonts].filter(font => font.family.includes('Stardos')).every(font => font.status === 'loaded'),
        hero: home.shadowRoot.querySelector('h1').textContent.trim(),
        npm: !!home.shadowRoot.querySelector('npm-downloads-button').shadowRoot.querySelector('a[href*="npmjs.com"]'),
        tabs: tabs.length,
        selected: timeline.querySelector('[data-active]').getAttribute('data-stage'),
        usesV5Ability,
        usesV5Prisma: examples.shadowRoot.textContent.includes('new AbilityBuilder(PrismaAbility)'),
      };
    });
    assert.deepEqual(result, {
      fontsLoaded: true,
      hero: 'Define permissions once.\nEnforce them everywhere.',
      npm: true, tabs: 5, selected: 'rebac', usesV5Ability: true, usesV5Prisma: true,
    });
    await page.setViewport({ width: 375, height: 812 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
