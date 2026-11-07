import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n.js';
import { gridCss } from '../styles/index.js';
import menuIcon from '../assets/icons/menu.png';

export default class Header extends LitElement {
  static cName = 'app-header';
  static properties = {
    menu: { type: Object },
    theme: { type: String },
    isContainerRestricted: { type: Boolean },
  };

  constructor() {
    super();
    this.theme = 'default';
    this.menu = { items: [] };
  }

  _emitToggleMenu() {
    this.dispatchEvent(new CustomEvent('toggle-menu', {
      bubbles: true,
      composed: true,
    }));
  }

  _renderControls() {
    if (this.theme === 'default') {
      return html`
        <div class="row align-center">
          <app-quick-search></app-quick-search>
          <app-menu .items="${this.menu.items}"></app-menu>
        </div>
      `;
    }

    return html`
      <app-quick-search ?compact="${this.theme === 'mobile'}"></app-quick-search>
    `;
  }

  _renderMenuToggler() {
    if (this.theme !== 'mobile') {
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
      <header>
        <div class="header ${this.isContainerRestricted ? 'container' : ''}">
          ${this._renderMenuToggler()}
          <div class="logo-container">
            <app-link to="home" class="logo">${t('name')}</app-link>
            <div class="versions-picker">
              <versions-select></versions-select>
            </div>
          </div>
          ${this._renderControls()}
        </div>
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

    .header {
      position: relative;
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
      vertical-align: middle;
    }

    .logo:hover {
      border-bottom-color: transparent;
    }

    .logo-container {
      display: flex;
    }

    app-quick-search {
      position: absolute;
      right: 10px;
    }

    .menu-toggle {
      position: absolute;
      left: 0;
      background: transparent;
      border: 0;
      cursor: pointer;
    }

    .menu-toggle:focus {
      outline: none;
    }

    .versions-picker {
      display: flex;
      align-items: center;
    }

    @media (min-width: 768px) {
      .header {
        justify-content: space-between;
      }

      .logo {
        font-size: 3rem;
      }

      .versions-picker {
        flex-direction: column;
        gap: 4px;
      }

      app-quick-search {
        position: static;
      }
    }
  `,
];
