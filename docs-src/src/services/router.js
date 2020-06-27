import { prepareRoutes, createRouter } from '@curi/router';
import { browser, createBase } from '@hickory/browser';
import { html } from 'lit-element';
import routesConfig from '../config/routes.yml';
import config from '../config/app';
import { locale, LOCALES, defaultLocale } from './i18n';
import { loadPages, renderPage } from './pageController';
import * as queryString from './querystring';

function buildPath(rawRoute) {
  if (!rawRoute.restrictions) {
    return rawRoute.path;
  }

  return rawRoute.path.replace(/:([\w_-]+)(\?)?/g, (_, name, questionMark = '') => {
    const restriction = rawRoute.restrictions[name];
    return restriction ? `:${name}(${restriction})${questionMark}` : name + questionMark;
  });
}

function buildRoutes(rawRoutes, controllers) {
  return rawRoutes.map((rawRoute) => {
    const buildController = controllers[rawRoute.controller];

    if (!buildController) {
      throw new Error(`Did you forget to specify controller for route "${rawRoute.name}"?`);
    }

    const route = {
      name: rawRoute.name,
      path: buildPath(rawRoute),
      ...buildController(rawRoute),
    };

    if (rawRoute.meta && rawRoute.meta.encode === false) {
      route.pathOptions = {
        compile: { encode: x => x }
      };
    }

    if (rawRoute.children) {
      route.children = buildRoutes(rawRoute.children, controllers);
    }

    return route;
  });
}

function interpolate(template, object) {
  return template.replace(/:([\w_-]+)\??/g, (_, name) => {
    if (!object[name] || object[name] === 'undefined') {
      throw new Error(`Undefined template parameter "${name}"`);
    }
    return object[name];
  });
}

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

    return {
      resolve: loadPages(({ params }) => ({
        ...params,
        id: interpolate(route.path, params),
        categories,
      })),
      respond: renderPage,
    };
  }
}).concat({
  name: 'notFound',
  path: '(.*)',
  respond({ match }) {
    const { pathname } = match.location;
    const index = pathname.indexOf('/', 1);
    const lang = index === -1 ? pathname.slice(1) : pathname.slice(1, index);

    if (!LOCALES.includes(lang)) {
      const { search: query, hash } = window.location;
      return {
        redirect: { url: `/${defaultLocale}${pathname}${query}${hash}` }
      };
    }

    return {
      body: html`<app-page name="notfound"></app-page>`
    };
  }
});
const router = createRouter(browser, prepareRoutes(routes), {
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
