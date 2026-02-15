import { t, translationExists } from './i18n';

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

  getMetaTag(name).setAttribute('content', value.replace(/[\n\r]+/g, ' '));
}

export function setRouteMeta({ response }) {
  const html = document.documentElement;

  if (html.lang !== response.params.lang) {
    html.lang = response.params.lang;
  }

  const prefix = `meta.${response.name}`;

  if (translationExists(prefix)) {
    setTitle(t(`${prefix}.title`));
    setMeta('keywords', t(`${prefix}.keywords`));
    setMeta('description', t(`${prefix}.description`));
  } else {
    setTitle();
    setMeta('keywords');
    setMeta('description');
  }

  updateShareButtons();
}

export function setPageMeta(page) {
  const meta = page.meta || {};

  setTitle(page.title);
  setMeta('keywords', meta.keywords || '');
  setMeta('description', meta.description || '');
  updateShareButtons();
}

export const SHARE_BUTTONS_ID = 'share-buttons';
let shareButtons;
function updateShareButtons() {
  if (!window.__sharethis__) return;
  shareButtons ??= document.getElementById(SHARE_BUTTONS_ID);
  shareButtons.setAttribute('data-url', window.location.href);
  shareButtons.setAttribute('data-title', document.title);
  shareButtons.setAttribute('data-description', getMetaTag('description').getAttribute('content'));
}
