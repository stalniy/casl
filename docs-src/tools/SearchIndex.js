import MiniSearch from 'minisearch';
import fs from 'fs';
import searchOptions from '../src/config/search';

function createIndexFor(lang) {
  const stopWordsPath = `${__dirname}/tools/stop-words/${lang}.txt`;
  const stopWords = new Set(fs.readFileSync(stopWordsPath, 'utf8').trim().split('\n'));

  return new MiniSearch({
    ...searchOptions,
    processTerm(rawTerm) {
      const term = rawTerm.toLowerCase();

      if (stopWords.has(term)) {
        return null;
      }

      return term;
    },
  });
}

export class SearchIndex {
  static factory(options) {
    return () => new SearchIndex(options);
  }

  constructor() {
    this._indexes = {};
    this.exportAs = 'searchIndexes';
  }

  add(item, { lang }) {
    if (item.hidden) {
      return;
    }

    this._indexes[lang] = this._indexes[lang] || createIndexFor(lang);
    this._indexes[lang].add(item);
  }

  toJSON() {
    return Object.keys(this._indexes).reduce((results, lang) => {
      results[lang] = this._indexes[lang].toJSON();
      return results;
    }, {});
  }
}
