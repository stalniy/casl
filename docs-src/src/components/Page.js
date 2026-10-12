import { html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { mdCss, pageCss, codeCss } from '../styles/index.js';
import I18nElement from './I18nElement.js';
import { interpolate, locale } from '../services/i18n.js';
import content from '../services/content.js';
import router from '../services/router.js';
import { setPageMeta } from '../services/meta.js';
import { tryToNavigateElement, scrollToSectionIn } from '../hooks/scrollToSection.js';

function renderContent(page, vars) {
  return unsafeHTML(interpolate(page.content, vars));
}

export default class Page extends I18nElement {
  static cName = 'app-page';
  static properties = {
    type: { type: String },
    name: { type: String },
    vars: { type: Object, attribute: false },
    content: { type: Function, attribute: false },
    nav: { type: Array },
    _page: { type: Object },
  };

  constructor() {
    super();

    this._page = null;
    this._loadVersion = 0;
    this.nav = [];
    this.name = null;
    this.vars = {};
    this.type = 'page';
    this.content = renderContent;
  }

  connectedCallback() {
    super.connectedCallback();
    this._unwatchRouter = router.observe(() => this.requestUpdate());
    this.shadowRoot.addEventListener('click', (event) => {
      tryToNavigateElement(this.shadowRoot, event.target);
    }, false);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unwatchRouter?.();
    this._unwatchRouter = null;
  }

  async updated(changed) {
    if (this._page === null || changed.has('name') || changed.has('type')) {
      await this.reload();
    } else if (this.hasAttribute('data-content-ready')) {
      await this._publishContentReady(this._loadVersion);
    }
  }

  async reload() {
    const loadVersion = ++this._loadVersion;
    this.removeAttribute('data-content-ready');
    this.removeAttribute('data-content-error');
    let page;
    try {
      page = await content(this.type).load(locale(), this.name);
      if (!page || typeof page !== 'object' || typeof page.content !== 'string') {
        throw new TypeError(`Page "${this.name}" did not return rendered content`);
      }
      if (loadVersion !== this._loadVersion || !this.isConnected) return;
      this._page = page;
      setPageMeta(page);
    } catch (error) {
      if (loadVersion === this._loadVersion) this._publishContentError(error);
      return;
    }
    await this._publishContentReady(loadVersion);
  }

  async _publishContentReady(loadVersion) {
    if (!this._page || loadVersion !== this._loadVersion || !this.isConnected) return;
    try {
      await this.updateComplete;
      await Promise.all(Array.from(
        this.shadowRoot.querySelectorAll('app-link, app-page-nav'),
        element => element.updateComplete
      ));
    } catch (error) {
      if (loadVersion === this._loadVersion && this.isConnected) this._publishContentError(error, 'content update failed');
      return;
    }
    if (!this._page || loadVersion !== this._loadVersion || !this.isConnected) return;
    scrollToSectionIn(this.shadowRoot);
    this.setAttribute('data-content-ready', 'true');
    this.dispatchEvent(new CustomEvent('content-ready', {
      bubbles: true,
      composed: true,
      detail: { notFound: this.name === 'notfound' },
    }));
  }

  _publishContentError(error, fallbackMessage = 'content request failed') {
    const message = error.message || fallbackMessage;
    this.setAttribute('data-content-error', message);
    this.dispatchEvent(new CustomEvent('content-error', {
      bubbles: true,
      composed: true,
      detail: { message },
    }));
  }

  _renderNav() {
    const [prev, next] = this.nav;
    return html`
      <app-page-nav pageType="${this.type}" .prev="${prev}" .next="${next}"></app-page-nav>
    `;
  }

  render() {
    if (!this._page) {
      return html``;
    }

    return html`
      <article itemscope itemtype="http://schema.org/Article">
        <h1>${interpolate(this._page.title)}</h1>
        <old-version-alert></old-version-alert>
        <div class="description md">${this.content(this._page, this.vars)}</div>
      </article>
      ${this.nav && this.nav.length ? this._renderNav() : ''}
    `;
  }
}

Page.styles = [
  pageCss,
  mdCss,
  codeCss,
  css`
    :host {
      display: block;
    }

    app-page-nav {
      margin-top: 20px;
    }
  `
];
