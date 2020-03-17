import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n';

function renderNavItem(item) {
  if (item.heading) {
    return html`<h4>${t(`menu.${item.heading}`)}</h4>`;
  }

  const title = t(`menu.${item.name}`);

  if (item.route === false) {
    return html`<a class="link">${title}</a>`;
  }

  if (item.url) {
    return html`<a href="${item.url}" target="_blank" rel="nofollow">${title}</a>`;
  }

  return html`<app-link to="${item.name}">${title}</app-link>`;
}

export default class Menu extends LitElement {
  static cName = 'app-menu';
  static properties = {
    items: { type: Array },
  };

  constructor() {
    super();
    this.items = [];
  }

  render() {
    return html`
      <nav
        role="navigation"
        itemscope
        itemtype="http://schema.org/SiteNavigationElement"
      >
        ${this._renderNav(this.items, 'nav')}
      </nav>
    `;
  }

  _renderNav(items, navClass) {
    const children = items.map(item => html`
      <li class="dropdown-container">
        ${renderNavItem(item)}
        ${item.children ? this._renderNav(item.children, 'dropdown') : ''}
      </li>
    `);

    return html`<ul class="${navClass}">${children}</ul>`;
  }
}

Menu.styles = css`
  :host {
    display: block;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  .dropdown-container {
    display: inline-block;
    position: relative;
    margin: 0 1rem;
  }

  .dropdown-container:hover .dropdown {
    display: block;
  }

  .dropdown {
    display: none;
    box-sizing: border-box;
    max-height: calc(100vh - 61px);
    overflow-y: auto;
    position: absolute;
    top: 100%;
    right: -15px;
    background-color: #fff;
    padding: 10px 0;
    border: 1px solid #ddd;
    border-bottom-color: #ccc;
    text-align: left;
    border-radius: 4px;
    white-space: nowrap;
  }

  .dropdown li {
    display: block;
    margin: 0;
    line-height: 1.6rem;
  }

  .dropdown li > ul {
    padding-left: 0;
  }

  .dropdown li:first-child h4 {
    margin-top: 0;
    padding-top: 0;
    border-top: 0;
  }

  .dropdown a,
  .dropdown app-link,
  .dropdown h4 {
    padding: 0 24px 0 20px;
  }

  .dropdown h4 {
    margin: 0.45em 0 0;
    padding-top: 0.45rem;
    border-top: 1px solid #eee;
  }

  .dropdown-container a,
  .dropdown-container app-link {
    text-decoration: none;
  }

  .nav a,
  .nav app-link,
  .dropdown a,
  .dropdown app-link {
    display: block;
    color: #202428;
    text-decoration: none;
  }
  .nav a:hover,
  .nav app-link:hover,
  .dropdown a:hover,
  .dropdown app-link:hover {
    color: #81a2be;
    border-bottom-color: transparent;
  }

  .link {
    display: block;
    cursor: pointer;
    line-height: 40px;
  }

  .link:after {
    display: inline-block;
    content: '';
    vertical-align: middle;
    margin-top: -1px;
    margin-left: 6px;
    margin-right: -14px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #4f5959;
  }
`;
