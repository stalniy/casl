import { LitElement, html, css } from 'lit-element';
import { t } from '../directives/i18n';
import { gridCss } from '../styles';
import menuIcon from '../assets/icons/menu.png';

export default class Header extends LitElement {
  static cName = 'app-header';
  static properties = {
    menu: { type: Object },
    theme: { type: String },
    _isCompactSearch: { type: Boolean },
  };

  constructor() {
    super();
    this.theme = 'default';
    this.menu = { items: [] };
    this._isCompactSearch = false;
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
      <app-quick-search
        class="full-width-search"
        suggestionsType="page"
        toggler
        ?compact="${this._isCompactSearch}"
        @reset="${this._toggleSearch}"
        @click-icon="${this._toggleSearch}"
      ></app-quick-search>
    `;
  }

  _toggleSearch() {
    this._isCompactSearch = !this._isCompactSearch;
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

  update(changed) {
    if (changed.has('theme')) {
      this._isCompactSearch = this.theme === 'mobile';
    }

    return super.update(changed);
  }

  render() {
    return html`
      <header class="container">
        ${this._renderMenuToggler()}
        <div>
          <app-link to="home" class="logo">${t('name')}</app-link>
          <versions-select></versions-select>
        </div>
        ${this._renderControls()}
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

    .full-width-search {
      position: absolute;
      right: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      transition: width .3s ease-in-out;
    }

    .full-width-search[compact] {
      width: 35px;
      padding: 0;
      height: auto;
    }

    versions-select {
      vertical-align: middle;
      margin-left: -5px;
    }

    @media (min-width: 768px) {
      header {
        justify-content: space-between;
      }

      .logo {
        font-size: 3rem;
      }

      app-quick-search {
        border-radius: 15px;
        border: 1px solid #e3e3e3;
      }

      versions-select {
        vertical-align: top;
        margin-left: -10px;
      }
    }
  `,
];
