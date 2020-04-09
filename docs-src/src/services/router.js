import { prepareRoutes, createRouter } from '@curi/router';
import { browser, createBase } from '@hickory/browser';
import { routes } from '../config/routes';
import { locale } from './i18n';
import config from '../config/app';

function parse(querystring) {
  return querystring
    ? JSON.parse(`{"${querystring.replace(/&/g, '","').replace(/=/g, '":"')}"}`)
    : {};
}

function stringify(querystring) {
  if (!querystring) {
    return '';
  }

  return Object.keys(querystring)
    .reduce((qs, key) => {
      qs.push(`${key}=${querystring[key]}`);
      return qs;
    }, [])
    .join('&');
}

const router = createRouter(browser, prepareRoutes(routes), {
  history: {
    base: config.baseUrl ? createBase(baseUrl) : undefined,
    query: { parse, stringify }
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
