import { LitElement, html, css, unsafeCSS } from 'lit-element';
import arrowsImage from '../assets/arrs.jpg';
import router from '../services/router';

export default class Pager extends LitElement {
  static cName = 'app-pager';
  static properties = {
    page: { type: Number },
    pages: { type: Number },
    hash: { type: String },
  };

  constructor() {
    super();

    this.page = 1;
    this.pages = 1;
    this.hash = '';
    this._current = null;
  }

  update(changed) {
    this._current = router.current();
    return super.update(changed);
  }

  render() {
    if (this.pages < 2) {
      return html``;
    }

    return html`
      ${this._renderLink(this.page - 1, { class: 'prev', prev: true })}
      ${this._renderPages()}
      ${this._renderLink(this.page + 1, { class: 'next', next: true })}
    `;
  }

  _renderPages() {
    const items = [];

    for (let page = 1; page <= this.pages; page++) {
      items.push(this._renderLink(page, {
        class: this.page === page ? 'active' : ''
      }));
    }

    return items;
  }

  _renderLink(page, attrs) {
    const { name, params } = this._current.response;
    const { query } = this._current.response.location;

    return html`
      <app-link
        to="${name}"
        hash="${this.hash}"
        .params="${params}"
        .query="${{ ...query, page }}"
        class="${attrs.class}"
        style="${page < 1 || page > this.pages ? 'display: none' : ''}"
      >
        ${attrs.next || attrs.prev ? '' : page}
      </app-link>
    `;
  }
}

Pager.styles = css`
  :host {
    display: block;
  }

  app-link {
    vertical-align: middle;
    margin-right: 5px;
    height: 20px;
    font-size: 17px;
    padding: 2px 6px;
    border-radius: 2px;
    color: var(--app-link-active-color);
  }

  app-link.active {
    background-color: var(--app-link-active-color);
    color: #fff;
    text-decoration: none;
  }

  .next,
  .prev {
    padding: 0;
    background: url(${unsafeCSS(arrowsImage)}) no-repeat 0 0;
    width: 23px;
    height: 9px;
  }

  .prev {
    background-position: 0 bottom;
  }
`;
