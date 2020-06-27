const yaml = require('js-yaml');
const childProcess = require('child_process');
const { promisify } = require('util');
const fs = require('fs');

const exec = promisify(childProcess.exec);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const WEBSITE = (process.env.SITEMAP_WEBSITE || 'http://localhost:8080') + (process.env.LIT_APP_PUBLIC_PATH || '');
const CONTENT_PATH = `${__dirname}/../src/content`;
const DIST_PATH = `${__dirname}/../dist`;

const jsonCache = {};
async function parseJSON(pathToFile) {
  if (!jsonCache[pathToFile]) {
    const rawContent = await readFile(pathToFile, 'utf8');
    jsonCache[pathToFile] = JSON.parse(rawContent);
  }

  return jsonCache[pathToFile];
}

const sitemapEntriesProviders = {
  async pages({ route, parentItem }) {
    const content = await parseJSON(`${DIST_PATH}/assets/content_pages_summaries.${parentItem.lang}.json`);
    const categories = route.meta ? route.meta.categories : null;
    let items = content.items;

    if (Array.isArray(categories)) {
      const hasCategory = categories.includes.bind(categories);
      items = items.filter(item => item.categories.some(hasCategory));
    }

    const shouldIgnoreIdPrefix = route.meta && route.meta.ignoreIdPrefix;

    return items.map((item) => {
      const doc = { ...item };

      if (shouldIgnoreIdPrefix) {
        doc.id = doc.id.slice(doc.id.indexOf('/') + 1);
      }

      return {
        doc,
        lastmodFrom: `pages/${item.id}/${parentItem.lang}.md`
      };
    });
  },
  route({ route, parentItem }) {
    return [{
      doc: { id: route.path },
      lastmodFrom: `pages/${route.path}/${parentItem.lang}.md`
    }];
  },
  langs() {
    return [
      {
        doc: { lang: 'en' },
        lastmodFrom: 'app/en.yml'
      }
    ];
  }
};

function getSitemapEntriesProviderFor(route) {
  const hasPlaceholders = route.path.includes(':');
  const entriesProvider = route.sitemap ? route.sitemap.provider : null;

  if (hasPlaceholders && !entriesProvider) {
    throw new Error(`Cannot generate sitemap.xml. Please specify placeholder "sitemap.provider" property for ${route.path}.`)
  }

  if (hasPlaceholders && !sitemapEntriesProviders[entriesProvider]) {
    throw new Error(`Unknown sitemap.provider "${route.provider}"`);
  }

  return sitemapEntriesProviders[entriesProvider];
}

const urlEntry = (value) => `
  <url>
    <loc>${WEBSITE}/${value.path}</loc>
    <lastmod>${value.lastmod}</lastmod>
    <changefreq>${value.changefreq}</changefreq>
    <priority>${value.priority}</priority>
  </url>
`.trimEnd();

async function getLastModified(path) {
  const { stdout, stderr } = await exec(`git log -1  --format="%aI" ${CONTENT_PATH}/${path}`);

  if (stderr) {
    throw new Error(stderr);
  }

  const rawDate = stdout.trim();
  const date = rawDate ? new Date(rawDate) : new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, 0),
    String(date.getDate()).padStart(2, 0)
  ].join('-');
}

async function urlEntriesFrom(route, context = {}) {
  const basePath = context.basePath || '';
  const details = {
    path: basePath + (Array.isArray(route.path) ? route.path[0] : route.path),
    changefreq: route.sitemap.changefreq,
    priority: route.sitemap.priority,
  };
  const getItems = getSitemapEntriesProviderFor(route);
  let items;

  if (getItems) {
    items = await getItems({ contentPath: CONTENT_PATH, route, ...context });
  } else {
    items = [{ doc: {}, lastmodFrom: route.sitemap.lastmodFrom }];
  }

  const regexp = /:([\w_-]+)\??/g
  const parseItems = items.map(async ({ doc, lastmodFrom }) => {
    const path = details.path.replace(regexp, (_, prop) => doc[prop]);
    const itemEntry = urlEntry({
      ...details,
      path,
      lastmod: await getLastModified(lastmodFrom)
    });

    if (!route.children) {
      return itemEntry;
    }

    const childContext = { basePath: `${path}/`, parentItem: doc };
    const parseChildren = route.children
      .map(childRoute => urlEntriesFrom(childRoute, childContext));
    const childrenUrls = await Promise.all(parseChildren);

    return childrenUrls.concat(itemEntry);
  });
  const urls = await Promise.all(parseItems);
  return urls.flat(2);
}

async function generate() {
  const { routes } = yaml.load(fs.readFileSync(`${__dirname}/../src/config/routes.yml`));
  const requests = routes.map(route => urlEntriesFrom(route));
  const urls = await Promise.all(requests);
  const content = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.flat(2).join('\n')}
    </urlset>
  `.trim();

  await writeFile(`${__dirname}/../dist/sitemap.xml`, content);
}

generate()
  .then(() => console.log(`sitemap.xml has been successfully generated for ${WEBSITE}`)) // eslint-disable-line no-console
  .catch((error) => console.error(error)) // eslint-disable-line no-console
