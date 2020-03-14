import { fetch } from './http';
import { notFoundError } from './error';
import { pages, summaries } from '../content/pages.pages';

export async function loadPage(locale, name) {
  const url = pages[locale][name];

  if (!url) {
    throw notFoundError(`Page with ${name} is not found`);
  }

  return fetch(url);
}

function getSummary(locale) {
  return fetch(summaries[locale]);
}

export async function getNearestPagesFor(locale, name) {
  const { items } = await getSummary(locale);
  const index = items.findIndex(item => item.id === name);

  if (index === -1) {
    return [];
  }

  const prevIndex = index - 1;
  const nextIndex = index + 1;

  return [
    prevIndex < 0 ? undefined : items[prevIndex],
    nextIndex >= items.length ? undefined : items[nextIndex]
  ];
}

export async function getPagesByCategories(locale) {
  const { items } = await getSummary(locale);
  const groups = new Map();

  items.forEach((item) => {
    item.categories.forEach((category) => {
      if (!groups.has(category)) {
        groups.set(category, []);
      }

      groups.get(category).push(item);
    });
  });

  return groups;
}
