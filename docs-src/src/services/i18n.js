import { registerTranslateConfig, use, get, listenForLangChanged } from 'lit-translate';
import { memoize } from './utils';
import { fetch } from './http';
import { pages as langUrls } from '../lang.i18n';

function lookup(path, config) {
  const keys = path.split('.');
  let pointer = config.strings;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (!pointer || !pointer[key]) {
      return undefined;
    }

    pointer = pointer[key];
  }

  return pointer;
}

function missingKey(path) {
  console.warn(`missing i18n key: ${path}`); // eslint-disable-line no-console
  return path;
}

const VAR_REGEXP = /%\{(\w+)\}/g;

export function interpolate(string, vars) {
  return string.replace(VAR_REGEXP, (_, varName) => vars[varName]);
}

const i18n = registerTranslateConfig({
  async loader(lang) {
    const response = await fetch(langUrls[lang].default);
    return response.body;
  },
  lookup,
  interpolate,
  empty: missingKey,
});

const dateTime = memoize((locale, format) => new Intl.DateTimeFormat(locale, get(`dateTimeFormats.${format}`)));

export const LOCALES = process.env.SUPPORTED_LANGS;

export const defaultLocale = LOCALES[0];

export const locale = () => i18n.lang;

export const t = get;

export const translationExists = key => !!lookup(key, i18n);

export function setLocale(lang) {
  if (!LOCALES.includes(lang)) {
    throw new Error(`Locale ${lang} is not supported. Supported: ${LOCALES.join(', ')}`);
  }

  return use(lang);
}

export function d(date, format = 'default') {
  const actualDate = typeof date === 'string' ? new Date(date) : date;
  return dateTime(i18n.lang, format).format(actualDate);
}

export {
  listenForLangChanged
};
