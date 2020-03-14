import { html } from 'lit-element';
import { LOCALES, defaultLocale } from '../services/i18n';
import { loadPage } from '../services/pages';

function respond(success) {
  return ({ match, error }) => {
    if (error && error.code === 'NOT_FOUND') {
      return {
        body: html`<app-page name="notfound"></app-page>`
      };
    }

    return success(match.params);
  };
}

export const routes = [
  {
    name: 'home',
    path: `:lang(${LOCALES.join('|')})`,
    respond: () => ({
      body: {
        main: html`<home-page></home-page>`
      }
    }),
    children: [
      {
        name: 'page',
        path: ':id',
        resolve: ({ params }) => loadPage(params.lang, params.id),
        respond: respond(params => ({
          body: {
            main: html`<app-page name="${params.id}"></app-page>`,
            sidebar: html`<app-sidebar></app-sidebar>`,
          }
        }))
      },
      {
        name: 'search',
        path: 'search',
        respond: () => ({
          body: html`<app-page-search></app-page-search>`,
          meta: {
            scope: 'search'
          }
        })
      },
    ]
  },
  {
    name: 'notFound',
    path: '(.*)',
    respond({ match }) {
      const pathname = match.location.pathname;
      const index = pathname.indexOf('/', 1);
      const lang = index === -1 ? pathname.slice(1) : pathname.slice(1, index);

      if (!LOCALES.includes(lang)) {
        const { search: query, hash } = window.location;
        return {
          redirect: {
            url: `/${defaultLocale}${pathname}${query}${hash}`,
          }
        };
      }

      return {
        body: html`<app-page name="notfound"></app-page>`
      };
    }
  }
];
