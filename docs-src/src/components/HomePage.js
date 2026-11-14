import { LitElement, html, css } from 'lit-element';
import { t, ut } from '../directives/i18n.js';
import { gridCss, btnCss, codeCss } from '../styles/index.js';
import shieldURL from '../assets/casl-shield.png';
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
            <div class="col details">
              <div class="row hero-row">
                <img src="${shieldURL}" width="126" height="152" class="col col-fixed logo">
                <div class="hero">
                  <p class="eyebrow">${t('hero.heading')}</p>
                  <h1 class="hero-title">${t('hero.title')}</h1>
                  <p class="description">${t('hero.description')}</p>
                  <div class="buttons">
                    <app-link to="page" .params="${{ id: 'guide/intro' }}" class="btn btn-lg">
                      ${t('buttons.start')}
                    </app-link>
                    <why-casl-video></why-casl-video>
                    <div class="package-stats">
                      <github-button></github-button>
                      <npm-downloads-button></npm-downloads-button>
                    </div>
                  </div>
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
      <section class="features-brand">
        <div class="container">
          <p class="eyebrow">POWERFUL PERMISSIONS. MINIMAL OVERHEAD</p>
          ${features()}
        </div>
      </section>
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

    .hero-row {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 20px;
    }

    .hero-title {
      font-size: clamp(30px, 3vw, 43px);
      line-height: 1.07;
      letter-spacing: -.055em;
      margin-bottom: 24px;
      font-weight: 650;
      color: #214e70;
      white-space: pre-line;
    }

    .hero-title::first-line {
      color: #202428;
    }

    .hero .description {
      max-width: 480px;
      color: #506575;
      font-size: 18px;
      line-height: 1.65;
      margin-bottom: 28px;
    }

    .eyebrow {
      font: 11px / 1.5 ui-monospace, SFMono-Regular, Consolas, monospace;
      letter-spacing: .09em;
      margin: 0;
    }

    .buttons {
      display: inline-block;
      text-align: center;
    }

    .buttons app-link {
      margin-right: 5px;
      background: #273849;
      border-color: #273849;
      color: #fff;
    }

    .buttons > * { margin-bottom: 8px; vertical-align: middle; }
    .buttons app-link:focus-visible { outline: 3px solid #81a2be; outline-offset: 3px; }

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

    .example code {
      font-size: clamp(.7rem, 0.7vw, 0.9rem);
    }

    .features-brand {
      background: #f7f7f7;
      padding: 2rem 1rem;
    }

    .features-brand h2 {
      margin-top: 0;
    }

    @media (min-width: 768px) {
      .main > img {
        margin-right: 30px;
      }

      .logo {
        margin-top: 40px;
      }

      .eyebrow {
        margin-bottom: 22px;
      }

      .hero-row {
        max-width: 777px;
        margin: 0 auto;
        flex-direction: row;
        text-align: left;
        align-items: flex-start;
        justify-content: center;
      }

      .hero-title {
        margin-top: 0;
      }
    }

    @media (min-width: 1030px) {
      .main {
        text-align: left;
      }

      .col-example {
        display: block;
        overflow-x: auto;
        flex-basis: 40%;
      }

      .hero-title {
        max-width: initial;
      }

      .hero .description {
        margin-left: 0;
      }
    }

    @media (min-width: 1200px) {
      .col-example {
        flex-basis: auto;
      }
    }
  `
];
