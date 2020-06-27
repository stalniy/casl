import { html } from 'lit-element';
import content from './content';

function respondWithError(error) {
  if (error.code === 'NOT_FOUND') {
    return {
      body: html`<app-page name="notfound"></app-page>`
    };
  }

  throw error;
}

async function loadFirstPage(loader, params) {
  if (!params.categories) {
    return loader.at(params.lang, 0);
  }

  const byCategories = await loader.byCategories(params.lang, params.categories);
  const firstCategory = params.categories.find(category => byCategories[category].length);

  return byCategories[firstCategory][0];
}

const identity = x => x;
export const loadPages = (transformParams = identity) => async (match) => {
  const vars = transformParams(match);
  const loader = content('page');

  if (!vars.id) {
    const firstPage = await loadFirstPage(loader, vars);
    vars.redirectTo = firstPage.id;
  } else {
    [vars.page, vars.byCategories, vars.nav] = await Promise.all([
      loader.load(vars.lang, vars.id),
      vars.categories.length ? loader.byCategories(vars.lang, vars.categories) : null,
      loader.getNearestFor(vars.lang, vars.id, vars.categories)
    ]);
  }

  return vars;
};

export const respondWithPage = render => ({ match, error, resolved }) => {
  if (error) {
    return respondWithError(error);
  } if (resolved.redirectTo) {
    return {
      redirect: {
        name: 'page',
        params: {
          id: resolved.redirectTo,
          lang: match.params.lang,
        }
      }
    };
  }

  return { body: render(resolved, match.params) };
};

export const renderPage = respondWithPage(vars => ({
  main: html`
    <app-page name="${vars.id}" .nav="${vars.nav}"></app-page>
  `,
  sidebar: vars.byCategories
    ? html`<pages-by-categories .items="${vars.byCategories}"></pages-by-categories>`
    : null
}));
