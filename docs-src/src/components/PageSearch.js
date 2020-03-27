import { LitElement, html, css } from 'lit-element';
import { pageCss } from '../styles';
import { searchArticles } from '../services/articles';
import { t } from '../directives/i18n';
import router from '../services/router';

export default class PageSearch extends LitElement {
  static cName = 'app-page-search';

  constructor() {
    super();
    this._search = this._search.bind(this);
    this._searchQuery = '';
    this._unsubscribeFromRouter = null;
  }

  _setQuery(value) {
    this._searchQuery = value || '';
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this._unsubscribeFromRouter = router.observe((route) => {
      this._setQuery(decodeURIComponent(route.response.location.query.q));
    }, { initial: true });
  }

  firstUpdated() {
    this.shadowRoot.querySelector('app-search-block').focus();
  }

  _updateQuery(event) {
    this._setQuery(event.detail);
  }

  _search(locale) {
    return searchArticles(locale, this._searchQuery);
  }

  _renderTitle() {
    return this._searchQuery
      ? t('search.title', { query: this._searchQuery })
      : t('search.placeholder');
  }

  render() {
    return html`
      <h1>${this._renderTitle()}</h1>
      <app-search-block
        value="${this._searchQuery}"
        @update="${this._updateQuery}"
      ></app-search-block>
      <app-page-articles category="all" .load="${this._search}">
        <div slot="empty">${t('search.empty')}</div>
      </app-page-articles>
    `;
  }
}

PageSearch.styles = [
  pageCss,
  css`
    :host {
      display: block;
    }

    app-search-block {
      margin: 0 10px 20px 10px;
    }
  `
];
