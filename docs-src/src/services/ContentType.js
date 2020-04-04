import { fetch } from './http';
import { notFoundError } from './error';
import { memoize } from './utils';

export default class Content {
  constructor({ pages, summaries }) {
    this._pages = pages;
    this._summaries = summaries;
    this._getSummary = memoize(this._getSummary);
    this._getItems = memoize(this._getItems);
    this.byCategories = memoize(this.byCategories);
    this.load = memoize(this.load);
  }

  async load(locale, name) {
    const url = this._pages[locale][name];

    if (!url) {
      throw notFoundError(`Page with ${name} is not found`);
    }

    const response = await fetch(url);
    return response.body;
  }

  async _getSummary(locale) {
    const response = await fetch(this._summaries[locale]);
    return response.body;
  }

  async _getItems(locale, categories = null) {
    const groups = await this.byCategories(locale, categories);
    return Object.keys(groups)
      .reduce((all, category) => all.concat(groups[category]), []);
  }

  async getNearestFor(locale, pageId, categories = null) {
    const items = await this._getItems(locale, categories);
    const index = items.findIndex(item => item.id === pageId);

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

  async byCategories(locale, categories = null) {
    const { items } = await this._getSummary(locale);
    const groups = {};

    items.forEach((item) => {
      item.categories.forEach((category) => {
        groups[category] = groups[category] || [];
        groups[category].push(item);
      });
    });

    if (!Array.isArray(categories)) {
      return groups;
    }

    return categories.reduce((filtered, category) => {
      filtered[category] = groups[category];
      return filtered;
    }, {});
  }

  async at(locale, index) {
    const { items } = await this._getSummary(locale);
    return items[index];
  }
}
