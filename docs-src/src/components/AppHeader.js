import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n';
import { gridCss } from '../styles';

export default class Header extends LitElement {
  static cName = 'app-header';
  static properties = {
    menu: { type: Object }
  };

  constructor() {
    super();
    this.menu = { items: [] };
  }

  render() {
    return html`
      <header>
        <app-link to="home" class="logo">${t('name')}</app-link>
        <div class="row align-center">
          <app-quick-search></app-quick-search>
          <app-menu .items="${this.menu.items}"></app-menu>
        </div>
      </header>
      <!-- <app-lang-picker></app-lang-picker> -->
    `;
  }

  _renderLink(name) {
    return html`
      <app-link to="${name}">${t(`topMenu.${name}`)}</app-link>
    `;
  }
}

Header.styles = [
  gridCss,
    css`
    :host {
      display: block;
    }

    app-link {
      color: #000;
      text-decoration: none;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px 0 1rem;
    }

    .logo {
      padding-top: 4px;
      line-height: 1;
      font-weight: bold;
      font-size: 3rem;
      font-family: "Stardos Stencil", "Helvetica Neue", Arial, sans-serif;
    }
  `
];
