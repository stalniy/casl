import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n';

export default class PagesByCategories extends LitElement {
  static cName = 'pages-by-categories';
  static properties = {
    items: { type: Object },
    type: { type: String },
    categories: { type: Array }
  };

  constructor() {
    super();
    this.items = null;
    this.type = 'page';
    this.categories = null;
  }

  render() {
    const categories = this.categories || Object.keys(this.items);
    return html`
      <nav>
        ${categories.map(category => html`
          <h3>${t(`categories.${category}`)}</h3>
          <ul>
            ${this.items[category].map(page => html`
              <li><app-link to="${this.type}" .params="${page}">${page.title}</app-link></li>
            `)}
          </ul>
        `)}
      </nav>
    `;
  }
}

PagesByCategories.styles = css`
  :host {
    display: block;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  nav > h3:first-child {
    margin-top: 0;
  }

  li {
    margin-top: 8px;
  }
`;
