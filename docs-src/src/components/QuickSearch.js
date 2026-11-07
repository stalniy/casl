import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { t } from '../directives/i18n.js';
import { locale } from '../services/i18n.js';
import content from '../services/content.js';
import router from '../services/router.js';
import { debounce } from '../services/utils.js';

const RECOMMENDATIONS = [
  { id: 'guide/intro', label: 'menu.guide' },
  { id: 'advanced/ability-to-database-query', label: 'search.databaseQuery' },
  { id: 'cookbook/intro', label: 'menu.cookbook' },
];

const ICON_SEARCH = html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px">
    <path d="M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z" />
  </svg>
`;

export default class QuickSearch extends LitElement {
  static cName = 'app-quick-search';
  static properties = {
    value: { type: String },
    compact: { type: Boolean },
    _suggestions: { type: Array },
    _activeIndex: { type: Number },
    _loading: { type: Boolean },
    _error: { type: Boolean },
  };

  constructor() {
    super();
    this.value = '';
    this.compact = false;
    this._suggestions = null;
    this._activeIndex = 0;
    this._loading = false;
    this._error = false;
    this._requestId = 0;
    this._open = false;
    this._search = debounce(this._search, 300);
    this._unwatchRouter = null;
    this._isMac = /Mac|iPhone|iPad/i.test(navigator.userAgentData?.platform || navigator.platform);
    this._shortcut = this._shortcut.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._unwatchRouter = router.observe(() => this._close());
    document.addEventListener('keydown', this._shortcut);
  }

  disconnectedCallback() {
    this._close();
    this._unwatchRouter?.();
    document.removeEventListener('keydown', this._shortcut);
    super.disconnectedCallback();
  }

  _shortcut(event) {
    const modifier = this._isMac ? event.metaKey : event.ctrlKey;
    if (!modifier || event.altKey || event.shiftKey || event.isComposing
      || event.defaultPrevented || event.key.toLowerCase() !== 'k') return;

    event.preventDefault();
    this._show();
  }

  _setValue(value) {
    this.value = value;
    this.dispatchEvent(new CustomEvent('update', { detail: value.trim() }));
  }

  _show() {
    const dialog = this.shadowRoot.querySelector('dialog');
    if (dialog.open) return;

    this._open = true;
    this._previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    this.shadowRoot.querySelector('input').focus();
  }

  _close() {
    if (!this._open) return;

    this._open = false;
    this._requestId += 1;
    this.shadowRoot.querySelector('dialog').close();
    document.body.style.overflow = this._previousOverflow;
    this._setValue('');
    this._suggestions = null;
    this._activeIndex = 0;
    this._loading = false;
    this._error = false;
    this.dispatchEvent(new CustomEvent('reset'));
  }

  _cancel(event) {
    event.preventDefault();
    this._close();
  }

  _clickBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();

    if (event.clientX < rect.left || event.clientX > rect.right
      || event.clientY < rect.top || event.clientY > rect.bottom) {
      this._close();
    }
  }

  async _search() {
    const query = this.value.trim();
    if (!this._open || !query) return;
    const requestId = this._requestId;

    try {
      const results = await content('page').search(locale(), query, { prefix: true });
      if (!this._open || requestId !== this._requestId) return;

      this._suggestions = results.flatMap(result => {
        const title = result.hints.title || result.doc.title;
        const headings = result.hints.headings || result.doc.headings || [];
        const page = { doc: result.doc, title, category: result.doc.categories[0] };

        return [page, ...headings.map(heading => ({
          ...page,
          title: heading.title,
          parent: result.doc.title,
          hash: heading.id,
        }))];
      });
      window.umami?.track('search', {
        search_term: query,
        result_count: results.length,
      });
    } catch {
      if (!this._open || requestId !== this._requestId) return;
      this._error = true;
    } finally {
      if (this._open && requestId === this._requestId) this._loading = false;
    }
  }

  _updateValue(event) {
    this._setValue(event.target.value);
    this._requestId += 1;
    this._suggestions = null;
    this._activeIndex = 0;
    this._error = false;
    this._loading = !!this.value.trim();
    this._search();
  }

  _items() {
    if (this._loading) return [];
    return this._suggestions?.length ? this._suggestions : RECOMMENDATIONS;
  }

  _url(item) {
    return router.url({ name: 'page', params: item.doc || { id: item.id }, hash: item.hash });
  }

  _dialogKeydown(event) {
    if (event.isComposing) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this._close();
      return;
    }

    if (event.key !== 'Tab') return;
    event.preventDefault();
    const input = this.shadowRoot.querySelector('input');
    const close = this.shadowRoot.querySelector('.close');
    (this.shadowRoot.activeElement === input ? close : input).focus();
  }

  async _keydown(event) {
    if (event.isComposing) return;
    const items = this._items();

    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && items.length) {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      this._activeIndex = (this._activeIndex + direction + items.length) % items.length;
      await this.updateComplete;
      this.shadowRoot.querySelector(`#search-result-${this._activeIndex}`)
        ?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter' && items.length) {
      event.preventDefault();
      this._navigate(event, items[this._activeIndex]);
    }
  }

  _navigate(event, item) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const url = this._url(item);
    this._close();
    router.navigate({ url });
  }

  _renderItems() {
    const items = this._items();
    const recommended = !this._suggestions?.length;

    return html`
      <div class="results" id="search-results" role="listbox" aria-label="${t('search.results')}">
        ${items.map((item, index) => html`
          ${!recommended && item.category !== items[index - 1]?.category ? html`
            <h2 role="presentation">${t(`categories.${item.category}`)}</h2>
          ` : ''}
          <a id="search-result-${index}" role="option" tabindex="-1"
            aria-selected="${index === this._activeIndex}"
            href="${this._url(item)}"
            @mousemove="${() => { this._activeIndex = index; }}"
            @click="${event => this._navigate(event, item)}">
            <span class="result-icon" aria-hidden="true">${item.hash ? '#' : '›'}</span>
            <span>
              ${item.parent ? html`<small>${item.parent}</small>` : ''}
              ${item.label ? t(item.label) : unsafeHTML(item.title)}
            </span>
            <span class="enter" aria-hidden="true">↵</span>
          </a>
        `)}
      </div>
    `;
  }

  render() {
    const items = this._items();
    const shortcut = this._isMac ? '⌘ K' : 'Ctrl K';

    return html`
      <button class="trigger ${this.compact ? 'compact' : ''}" type="button"
        aria-label="${t('search.placeholder')}" aria-haspopup="dialog"
        aria-keyshortcuts="${this._isMac ? 'Meta+K' : 'Control+K'}"
        title="${t('search.placeholder')} (${shortcut})" @click="${this._show}">
        ${ICON_SEARCH}
      </button>
      <dialog aria-label="${t('search.title')}" @cancel="${this._cancel}"
        @click="${this._clickBackdrop}" @keydown="${this._dialogKeydown}">
        <div class="search-bar">
          <label for="search-input">${ICON_SEARCH}<span class="sr-only">${t('search.placeholder')}</span></label>
          <input id="search-input" type="search" role="combobox" aria-expanded="true"
            aria-autocomplete="list" aria-controls="search-results"
            aria-activedescendant="${items.length ? `search-result-${this._activeIndex}` : ''}"
            autocomplete="off" autocorrect="off" spellcheck="false"
            placeholder="${t('search.placeholder')}" .value="${this.value}"
            @input="${this._updateValue}" @keydown="${this._keydown}">
          <button class="close" type="button" @click="${this._close}">${t('search.close')}</button>
        </div>
        <div class="status" role="status">
          ${this._loading ? t('search.loading') : this._error ? t('search.error')
            : this._suggestions?.length ? t('search.resultCount', { count: this._suggestions.length })
              : this._suggestions ? t('search.noMatch') : t('search.recommendations')}
        </div>
        ${this._renderItems()}
        <footer>
          <span><kbd>↑</kbd><kbd>↓</kbd> ${t('search.navigate')}</span>
          <span><kbd>↵</kbd> ${t('search.select')}</span>
          <span><kbd>esc</kbd> ${t('search.dismiss')}</span>
        </footer>
      </dialog>
    `;
  }
}

QuickSearch.styles = css`
  :host { display: block; }
  button, input { font: inherit; }
  button { cursor: pointer; }
  .trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: #546474;
    text-align: left;
    font-size: .9rem;
  }
  .trigger:hover { background: #f5f6f8; }
  .compact .shortcut { display: none; }
  svg { flex-shrink: 0; fill: currentColor; }
  dialog {
    box-sizing: border-box;
    width: min(640px, calc(100% - 40px));
    max-height: min(680px, 80dvh);
    margin: 10vh auto 0;
    padding: 0;
    border: 1px solid #dce2e8;
    border-radius: 12px;
    background: #f5f6f8;
    color: #273849;
    box-shadow: 0 16px 64px #0005;
    overflow: hidden;
  }
  dialog[open] { display: flex; flex-direction: column; }
  dialog::backdrop { background: #182330b3; }
  .search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    background: white;
    border-bottom: 1px solid #dce2e8;
  }
  label { display: flex; color: #81a2be; }
  input {
    min-width: 0;
    width: 100%;
    border: 0;
    background: transparent;
    color: inherit;
    font-size: 1.1rem;
    padding: 8px 0;
    outline: none;
  }
  .search-bar:focus-within { box-shadow: inset 0 -2px #81a2be; }
  .close {
    border: 1px solid #dce2e8;
    border-radius: 4px;
    background: white;
    color: inherit;
    padding: 5px 8px;
    font-size: .8rem;
  }
  .status { padding: 16px 18px 8px; font-size: .9rem; }
  .results { overflow-y: auto; min-height: 0; padding: 8px 12px 16px; }
  h2 { font-size: .8rem; margin: 12px 4px 8px; color: #546474; }
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    margin-bottom: 6px;
    border: 1px solid #e3e7ec;
    border-radius: 6px;
    background: white;
    color: inherit;
    text-decoration: none;
    font-size: .95rem;
  }
  a[aria-selected="true"] { background: #273849; color: white; border-color: #273849; }
  .result-icon { font-size: 1.3rem; color: #81a2be; }
  small { display: block; margin-bottom: 4px; opacity: .75; }
  .enter { margin-left: auto; }
  mark { font-weight: bold; background: transparent; color: inherit; text-decoration: underline; }
  footer {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 12px 16px;
    border-top: 1px solid #dce2e8;
    background: white;
    font-size: .75rem;
    color: #546474;
  }
  kbd { padding: 2px 4px; margin-right: 3px; border: 1px solid #dce2e8; border-radius: 3px; }
  button:focus-visible { outline: 2px solid #81a2be; outline-offset: 2px; }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  @media (max-width: 767px) {
    dialog {
      width: 100%;
      max-width: 100%;
      height: 100dvh;
      max-height: 100dvh;
      margin: 0;
      border: 0;
      border-radius: 0;
    }
    .results { flex: 1; }
    footer { padding-bottom: max(12px, env(safe-area-inset-bottom)); }
  }
`;
