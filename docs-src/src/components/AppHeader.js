import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n';
import { gridCss } from '../styles';
import menuIcon from '../assets/icons/menu.png';

export default class Header extends LitElement {
  static cName = 'app-header';
  static properties = {
    menu: { type: Object },
  };

  constructor() {
    super();
    this.menu = { items: [] };
  }

  _emitToggleMenu() {
    this.dispatchEvent(new CustomEvent('toggle-menu'));
  }

  _renderMenu() {
    if (!this.menu) {
      return null;
    }

    return html`
      <div class="row align-center">
        <app-quick-search></app-quick-search>
        <app-menu .items="${this.menu.items}"></app-menu>
      </div>
    `;
  }

  _renderMenuToggler() {
    if (this.menu) {
      return null;
    }

    return html`
      <button type="button" class="menu-toggle" @click="${this._emitToggleMenu}">
        <img src="${menuIcon}" width="24">
      </button>
    `;
  }

  render() {
    return html`
      <header class="container">
        ${this._renderMenuToggler()}
        <app-link to="home" class="logo">${t('name')}</app-link>
        ${this._renderMenu()}
      </header>
      <!-- <app-lang-picker></app-lang-picker> -->
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
      justify-content: center;
      padding: 0 10px 0 1rem;
    }

    .logo {
      padding-top: 4px;
      line-height: 1;
      font-weight: bold;
      font-size: 2rem;
      font-family: "Stardos Stencil", "Helvetica Neue", Arial, sans-serif;
    }

    .logo:hover {
      border-bottom-color: transparent;
    }

    .menu-toggle {
      position: absolute;
      left: 0;
      background: transparent;
      border: 0;
      cursor: pointer;
    }

    .meu-toggle:focus {
      outline: none;
    }

    @media (min-width: 768px) {
      header {
        justify-content: space-between;
      }

      .logo {
        font-size: 3rem;
      }
    }
  `
];
