import { html, css } from 'lit-element';
import I18nElement from './I18nElement';
import { getPagesByCategories } from '../services/pages';
import { t } from '../directives/i18n';

export default class Sidebar extends I18nElement {
  static cName = 'app-sidebar';

  constructor() {
    super();
    this._pages = null;
  }

  async update(changed) {
    await this.reload(this._locale);
    return super.update(changed);
  }

  async reload() {
    const pages = await getPagesByCategories(this._locale);
    this._pages = Array.from(pages);
  }

  render() {
    return html`
      <nav>
        ${this._pages.map(([category, pages]) => html`
          <h3>${t(`categories.${category}`)}</h3>
          <ul>
            ${pages.map(page => html`
              <li><app-link to="page" .params="${page}">${page.title}</app-link></li>
            `)}
          </ul>
        `)}
      </nav>
    `;
  }
}

Sidebar.styles = css`
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
`;
