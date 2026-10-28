import { LitElement, html, css } from 'lit-element';
import { t, ut } from '../directives/i18n.js';
import { gridCss, btnCss, codeCss } from '../styles/index.js';
import shieldURL from '../assets/casl-shield.png';
import config from '../config/app.js';
import features from '../partials/caslFeatures.js';
import adoption from '../partials/caslAdoption.js';

export default class HomePage extends LitElement {
  static cName = 'home-page';

  connectedCallback() {
    super.connectedCallback();
    this._publishVersion = (this._publishVersion || 0) + 1;
    this._publishContentReady(this._publishVersion);
  }

  async _publishContentReady(version) {
    await this.updateComplete;
    await Promise.all(Array.from(
      this.shadowRoot.querySelectorAll('app-link'),
      link => link.updateComplete
    ));
    if (!this.isConnected || version !== this._publishVersion) return;
    this.dispatchEvent(new CustomEvent('content-ready', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="bg">
        <header class="row wrap container">
          <div class="col row wrap align-start main">
            <img src="${shieldURL}" width="250" height="302" class="col col-fixed">
            <div class="col details">
              <div class="hero">
                <h1 class="hero-title">${t('hero.title')}</h1>
              </div>
              <div class="buttons">
                <app-link to="page" .params="${{ id: 'guide/intro' }}" class="btn btn-lg">
                  ${t('buttons.start')}
                </app-link>
                <a href="${config.repoURL}" target="_blank" rel="noopener" class="btn btn-lg">
                  ${t('buttons.source')}
                </a>
                <div class="package-stats">
                  <github-button></github-button>
                  <npm-downloads-button></npm-downloads-button>
                </div>
              </div>
            </div>
          </div>
          <div class="col col-fixed col-example">
            <div class="example">${ut('exampleCode')}</div>
          </div>
        </header>
      </div>
      ${adoption()}
      ${features()}
    `;
  }
}

HomePage.styles = [
  gridCss,
  btnCss,
  features.styles,
  adoption.styles,
  codeCss,
  css`
    :host {
      display: block;
    }

    .bg {
      background: #fff;
      background: linear-gradient(90deg, #fff 0%, rgba(222,228,234,1) 41%, rgba(235,245,253,1) 60%, rgba(82,84,87,1) 100%);
    }

    header {
      justify-content: center;
      padding: 2rem 1rem;
    }

    .main {
      padding-top: 22px;
      text-align: center;
      justify-content: center;
    }

    .hero {
      margin-bottom: 1rem;
    }

    .hero-title {
      margin-bottom: 0;
      white-space: pre-line;
      font-size: 2.2rem;
      font-family: "Stardos Stencil", "Helvetica Neue", Arial, sans-serif;
    }

    .buttons {
      display: inline-block;
      text-align: center;
    }

    .buttons app-link {
      margin-right: 5px;
    }

    .package-stats {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 10px;
      margin-left: auto;
      margin-right: auto;
    }

    .details {
      min-width: 300px;
    }

    .col-example {
      display: none;
    }

    @media (min-width: 768px) {
      .main > img {
        margin-right: 30px;
      }

      .hero-title {
        white-space: wrap;
        max-width: 552px;
        margin: 0 auto;
      }
    }

    @media (min-width: 1024px) {
      .main {
        text-align: left;
      }

      .col-example {
        display: block;
        overflow-x: auto;
        flex-basis: 40%;
      }

      .example code {
        font-size: .7rem;
      }

      .hero-title {
        white-space: pre-line;
        max-width: auto;
      }
    }

    @media (min-width: 1200px) {
      .example code {
        font-size: .8rem;
      }

      .col-example {
        flex-basis: auto;
      }
    }
  `
];
