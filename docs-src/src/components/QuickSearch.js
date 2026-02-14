import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n';
import { locale } from '../services/i18n';
import content from '../services/content';
import router from '../services/router';
import { debounce } from '../services/utils';
import { gridCss } from '../styles';
import { sanitizedHTML } from '../services/sanitize';

const SUGGESTION_TEMPLATES = {
  dropdown(result) {
    const title = result.hints.title || result.doc.title;
    const headings = result.hints.headings || result.doc.headings || [];

    return html`
      <div class="row item">
        <div class="col title">
          <app-link to="page" .params="${result.doc}">${sanitizedHTML(title)}</app-link>
        </div>
        <div class="col">
          ${headings.map(heading => html`
            <app-link to="page" .params="${result.doc}" hash="${heading.id}">
              ${sanitizedHTML(heading.title)}
            </app-link>
          `)}
        </div>
      </div>
    `;
  },
  page(result) {
    const title = result.hints.title || result.doc.title;
    const headings = result.hints.headings || result.doc.headings || [];

    return html`
      ${headings.map(heading => html`
        <app-link class="item" to="page" .params="${result.doc}" hash="${heading.id}">
          ${sanitizedHTML(`${title} › ${heading.title}`)}
        </app-link>
      `)}
    `;
  }
};

function renderSuggestions(suggestions, type) {
  if (!suggestions) {
    return '';
  }

  if (!suggestions.length) {
    return html`
      <div class="suggestions ${type}">
        ${t(`search.noMatch`)}
      </div>
    `;
  }

  const renderSuggestion = SUGGESTION_TEMPLATES[type || 'dropdown'];

  return html`
    <div class="suggestions ${type}">
      ${suggestions.map(([category, results]) => html`
        <h5>${t(`categories.${category}`)}</h5>
        ${results.map(renderSuggestion)}
      `)}
    </div>
  `;
}

const ICON_SEARCH = html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px">
    <path d="M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z" />
  </svg>
`;
const ICON_ARROW = html`
  <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
    <polyline points='268 112 412 256 268 400' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/>
    <line x1='392' y1='256' x2='100' y2='256' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/>
  </svg>
`;

export default class QuickSearch extends LitElement {
  static cName = 'app-quick-search';
  static properties = {
    value: { type: String },
    suggestionsType: { type: String },
    compact: { type: Boolean },
    toggler: { type: Boolean },
    _suggestions: { type: Array },
  };

  constructor() {
    super();

    this.value = '';
    this.suggestionsType = 'dropdown';
    this.compact = false;
    this.toggler = false;
    this._suggestions = null;
    this._clickOutside = this._clickOutside.bind(this);
    this._search = debounce(this._search, 500);
    this._unwatchRouter = null;
  }

  _setValue(value) {
    this.value = value.trim();
    this.dispatchEvent(new CustomEvent('update', {
      detail: this.value
    }));
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._clickOutside, false);
    this._unwatchRouter = router.observe(() => this._reset());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._clickOutside, false);
    this._unwatchRouter();
  }

  _reset() {
    if (this.value) {
      this._setValue('');
      this._suggestions = null;
      this.dispatchEvent(new CustomEvent('reset'));
    }
  }

  _clickOutside(event) {
    if (!this.shadowRoot.contains(event.target)) {
      this._suggestions = null;
    }
  }

  async _search() {
    if (!this.value) {
      this._suggestions = null;
      return;
    }

    const results = await content('page').search(locale(), this.value, {
      prefix: true
    });
    const suggestions = results.reduce((groups, result) => {
      const category = result.doc.categories[0];

      if (!groups.has(category)) {
        groups.set(category, []);
      }

      groups.get(category).push(result);
      return groups;
    }, new Map());

    this._suggestions = Array.from(suggestions);
  }

  _updateValue(event) {
    this._setValue(event.target.value);
    this._search();
  }

  _emitIconClick() {
    this.dispatchEvent(new CustomEvent('click-icon'));
  }

  render() {
    return html`
      <div class="search-form ${this.compact ? 'compact' : ''}">
        <label class="input">
          <div class="icon" @click="${this._emitIconClick}">
            ${this.compact || !this.toggler ? ICON_SEARCH : ICON_ARROW}
          </div>

          <input
            autocomplete="off"
            autocorrect="off"
            placeholder="${t('search.placeholder')}"
            .value="${this.value}"
            @input="${this._updateValue}"
          >
        </label>
        ${renderSuggestions(this._suggestions, this.suggestionsType)}
      </div>
    `;
  }
}

QuickSearch.styles = [
  gridCss,
  css`
    :host {
      display: block;
    }

    .search-form {
      position: relative;
      border-radius: inherit;
      height: 100%;
    }

    .input {
      display: block;
      padding: 1px 6px;
      color: #273849;
      transition: border-color 1s;
      white-space: nowrap;
      background: #fff;
      height: 100%;
      border-radius: inherit;
    }

    svg {
      width: 16px;
      height: 16px;
    }

    .icon {
      line-height: 0.7;
      cursor: pointer;
    }

    .icon,
    input {
      display: inline-block;
      vertical-align: middle;
    }

    .input path {
      fill: #e3e3e3;
    }

    input {
      height: 100%;
      font-size: 0.9rem;
      box-sizing: border-box;
      outline: none;
      width: calc(100% - 20px);
      margin-left: 5px;
      border: 0;
      background-color: transparent;
    }

    .suggestions {
      position: absolute;
      left: 8px;
      z-index: 1000;
      top: 120%;
      background: #fff;
      padding: 5px;
      overflow-y: auto;
    }

    .suggestions.dropdown {
      border-radius: 4px;
      border: 1px solid #e3e3e3;
      width: 500px;
      max-height: 500px;
    }

    .suggestions.page {
      left: -10px;
      width: 101%;
      height: calc(100vh - 50px);
      border: 0;
      border-radius: 0;
    }

    input:focus {
      outline: transparent;
    }

    h5 {
      margin: 0;
      padding: 5px 10px;
      background-color: #1b1f23;
      color: #fff;
    }

    app-link {
      display: block;
      padding: 5px;
      font-size: 0.9rem;
      border-bottom: 0;
    }

    app-link:hover {
      background: #eee;
    }

    .title {
      flex-basis: 40%;
      max-width: 40%;
      border-right: 1px solid #e3e3e3;
    }

    .item {
      border-bottom: 1px solid #e3e3e3;
    }

    mark {
      font-weight: bold;
      background: transparent;
    }

    .compact .input {
      border-color: transparent;
      background: transparent;
    }

    .compact input {
      display: none;
    }

    .compact .input path {
      fill: #1b1f23;
    }
  `
];
