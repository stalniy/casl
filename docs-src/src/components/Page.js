import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { mdCss, pageCss, codeCss } from '../styles';
import I18nElement from './I18nElement';
import { interpolate, locale } from '../services/i18n';
import { setPageMeta } from '../services/articles';
import { loadPage } from '../services/pages';
import { tryToNavigateElement, scrollToSectionIn } from '../hooks/scrollToSection';

function renderContent(page, vars) {
  return unsafeHTML(interpolate(page.content, vars));
}

export default class Page extends I18nElement {
  static cName = 'app-page';
  static properties = {
    name: { type: String },
    vars: { type: Object, attribute: false },
    content: { type: Function, attribute: false },
  };

  constructor() {
    super();

    this._page = null;
    this.name = null;
    this.vars = null;
    this.content = renderContent;
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener('click', (event) => {
      tryToNavigateElement(this.shadowRoot, event.target);
    }, false);
  }

  async update(changed) {
    if (this._page === null || changed.has('name')) {
      await this.reload();
    }

    super.update(changed);
    await this.updateComplete;
    scrollToSectionIn(this.shadowRoot);
  }

  async reload() {
    this._page = await loadPage(locale(), this.name);
    setPageMeta(this._page);
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
      <app-page-nav fromPage="${this.name}"></app-page-nav>
    `;
  }
}

Page.styles = [
  pageCss,
  mdCss,
  codeCss,
];
