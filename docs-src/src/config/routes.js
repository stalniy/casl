import { html } from 'lit-element';
import { LOCALES, defaultLocale } from '../services/i18n';

const page = (name) => () => ({
  body: {
    main: html`<app-page name="${name}"></app-page>`,
    sidebar: html`menu here`,
  }
});

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
        name: 'guide',
        path: 'guide',
        respond: page('guide')
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
