import { LitElement, html, css } from 'lit-element';

export default class PageNav extends LitElement {
  static cName = 'app-page-nav';
  static properties = {
    next: { type: Object },
    prev: { type: Object },
    pageType: { type: String }
  };

  constructor() {
    super();
    this.next = null;
    this.prev = null;
    this.pageType = 'page';
  }

  _linkTo(type) {
    const page = this[type];

    if (!page) {
      return '';
    }

    return html`
      <app-link to="${this.pageType}" .params="${page}" class="${type}">
        ${page.title}
      </app-link>
    `;
  }

  render() {
    return html`
      ${this._linkTo('prev')}
      ${this._linkTo('next')}
    `;
  }
}

PageNav.styles = css`
  :host {
    display: block;
  }

  :host:after {
    display: table;
    clear: both;
    content: '';
  }

  app-link {
    color: #81a2be;
    text-decoration: none;
  }

  app-link:hover {
    border-bottom-color: transparent;
  }

  .next {
    float: right;
  }

  .next:after,
  .prev:before {
    display: inline-block;
    vertical-align: middle;
    content: '⇢';
  }

  .prev:before {
    content: '⇠';
  }
`;
