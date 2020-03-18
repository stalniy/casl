import { prepareRoutes, createRouter } from '@curi/router';
import { browser } from '@hickory/browser';
import { routes } from '../config/routes';
import { locale } from './i18n';

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
    query: { parse, stringify }
  }
});

const originalUrl = router.url;
router.url = (options) => {
  const params = { lang: locale(), ...options.params };
  return originalUrl({ ...options, params });
};

if ('scrollRestoration' in window.history) {
  history.scrollRestoration = 'manual';
}

export default router;
