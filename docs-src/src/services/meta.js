import { t } from './i18n';

export function setTitle(title) {
  const prefix = title ? `${title} - ` : '';
  document.title = prefix + t('name');
}

function getMetaTag(name) {
  let meta = document.head.querySelector(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }

  return meta;
}

export function setMeta(name, content) {
  if (typeof name === 'object') {
    Object.keys(name).forEach(key => setMeta(key, name[key]));
    return;
  }

  const defaultValue = t(`meta.${name}`);
  const value = Array.isArray(content)
    ? content.concat(defaultValue).join(', ')
    : content || defaultValue;

  getMetaTag(name).setAttribute('content', value);
}

export function setRouteMeta({ response }) {
  const html = document.documentElement;

  if (html.lang !== response.params.lang) {
    html.lang = response.params.lang;
  }

  if (!response.meta) {
    return;
  }

  const prefix = `${response.meta.scope}.${response.name}`;

  setTitle(t(`${prefix}.title`));
  setMeta('keywords', t(`${prefix}.keywords`));
  setMeta('description', t(`${prefix}.description`));
}
