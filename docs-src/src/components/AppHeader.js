import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n';
import { gridCss } from '../styles';
import menuIcon from '../assets/icons/menu.png';

export default class Header extends LitElement {
  static cName = 'app-header';
  static properties = {
    menu: { type: Object },
    theme: { type: String },
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
        <div class="controls row align-center">
          <app-quick-search></app-quick-search>
          <app-menu .items="${this.menu.items}"></app-menu>
          <app-social-links></app-social-links>
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
        <div class="header container">
          ${this._renderMenuToggler()}
          <div>
            <app-link to="home" class="logo">${t('name')}</app-link>
            <versions-select></versions-select>
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
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 0 10px 0 1rem;
    }

    .controls {
      flex-wrap: wrap;
      justify-content: flex-end;
      max-width: 100%;
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

    app-social-links {
      margin-left: 16px;
      padding-left: 12px;
      border-left: 1px solid #e3e3e3;
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

    app-menu {
      margin-left: 10px;
    }

    app-quick-search {
      position: absolute;
      right: 10px;
    }

    versions-select {
      vertical-align: middle;
      margin-left: -5px;
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      app-menu {
        --app-menu-item-margin: 6px;
      }

      app-social-links {
        margin-left: 8px;
        padding-left: 8px;
      }
    }

    @media (min-width: 768px) {
      .header {
        justify-content: space-between;
      }

      .logo {
        font-size: 3rem;
      }

      app-quick-search {
        position: static;
      }

      versions-select {
        vertical-align: top;
        margin-left: -10px;
      }
    }
  `,
];
