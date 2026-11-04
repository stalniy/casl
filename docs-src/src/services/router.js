import { createRouter } from '@curi/router';
import { compile } from 'path-to-regexp';
import { browser, createBase } from '@hickory/browser';
import { html } from 'lit-element';
import routesConfig from '../config/routes.yml';
import config from '../config/app.js';
import { locale, LOCALES, defaultLocale } from './i18n.js';
import { loadPages, renderPage } from './pageController.js';
import * as queryString from './querystring.js';
import { buildRoutes, prepareRestrictedRoutes } from './routeConfig.js';

const routes = buildRoutes(routesConfig.routes, {
  Home: () => ({
    respond: () => ({
      body: {
        main: html`<home-page></home-page>`
      }
    })
  }),
  Page(route) {
    const categories = route.meta ? route.meta.categories : [];
    const toContentId = compile(route.path, { encode: false });

    return {
      resolve: loadPages(({ params }) => ({
        ...params,
        categories,
        id: route.path.includes('*id') && !params.id ? null : toContentId(params),
      })),
      respond: renderPage,
    };
  }
}).concat({
  name: 'notFound',
  path: '{*path}',
  pathOptions: { compile: { encode: false } },
  respond({ match }) {
    const { pathname } = match.location;
    const index = pathname.indexOf('/', 1);
    const lang = index === -1 ? pathname.slice(1) : pathname.slice(1, index);
    const { search: query, hash } = window.location;

    if (!LOCALES.includes(lang)) {
      return {
        redirect: { url: `/${defaultLocale}${pathname}${query}${hash}` }
      };
    }

    return {
      body: html`<app-page name="notfound"></app-page>`
    };
  }
});
const router = createRouter(browser, prepareRestrictedRoutes(routes), {
  history: {
    base: config.baseUrl ? createBase(config.baseUrl) : undefined,
    query: queryString
  }
});

const originalUrl = router.url;
router.url = (options) => {
  const params = { lang: locale(), ...options.params };
  return originalUrl({ ...options, params });
};

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export default router;
