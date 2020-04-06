import { html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { mdCss, pageCss, codeCss } from '../styles';
import I18nElement from './I18nElement';
import { interpolate, locale } from '../services/i18n';
import { setPageMeta } from '../services/articles';
import content from '../services/content';
import { tryToNavigateElement, scrollToSectionIn } from '../hooks/scrollToSection';

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
    nav: { type: Array }
  };

  constructor() {
    super();

    this._page = null;
    this.nav = [];
    this.name = null;
    this.vars = {};
    this.type = 'page';
    this.content = renderContent;
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener('click', (event) => {
      tryToNavigateElement(this.shadowRoot, event.target);
    }, false);
  }

  async updated(changed) {
    if (this._page === null || changed.has('name') || changed.has('type')) {
      await this.reload();
    }
  }

  async reload() {
    this._page = await content(this.type).load(locale(), this.name);
    setPageMeta(this._page);
    this.requestUpdate();
    await this.updateComplete;
    scrollToSectionIn(this.shadowRoot);
  }

  _renderNav() {
    const [prev, next] = this.nav;
    return html`
      <app-page-nav pageType="${this.type}" .prev="${prev}" .next="${next}"></app-page-nav>
    `;
  }

  render() {
    if (!this._page) {
      return null;
    }

    return html`
      <article itemscope itemtype="http://schema.org/Article">
        <h1>${interpolate(this._page.title)}</h1>
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
    app-page-nav {
      margin-top: 20px;
    }
  `
];
