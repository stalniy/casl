import { html } from 'lit-element';
import { LOCALES, defaultLocale } from '../services/i18n';
import { loadPages, renderPage } from '../services/pageController';

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
        name: 'examples',
        path: 'examples/:id?',
        resolve: loadPages(params => ({
          ...params,
          id: `examples/${params.id}`,
          categories: ['example']
        })),
        respond: renderPage,
      },
      {
        name: 'page',
        path: ':id([\\w/-]+)',
        pathOptions: {
          compile: { encode: x => x }
        },
        resolve: loadPages(params => ({
          ...params,
          categories: ['guide', 'advanced', 'package', 'cookbook']
        })),
        respond: renderPage
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
