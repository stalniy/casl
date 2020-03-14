import { LitElement, html, css } from 'lit-element';
import { t, ut } from '../directives/i18n';
import { gridCss, btnCss, codeCss } from '../styles';
import shieldURL from '../assets/casl-shield.png';
import config from '../data/config.yml';
import features from '../partials/caslFeatures';

export default class HomePage extends LitElement {
  static cName = 'home-page';

  render() {
    return html`
      <div class="bg">
        <header class="row container">
          <div class="col row wrap align-start details">
            <img
              src="${shieldURL}"
              width="250"
              class="col col-fixed"
            >
            <div class="col">
              <h1>${t('slogan')}</h1>
              <div class="buttons">
                <app-link to="page" .params="${{ id: 'guide' }}" class="btn btn-lg">
                  ${t('buttons.start')}
                </app-link>
                <a href="${config.repoURL}" target="_blank" rel="noopener" class="btn btn-lg">
                  ${t('buttons.source')}
                </a>
                <github-button
                  size="large"
                  text="Star"
                  theme="no-preference: dark; light: dark;"
                ></github-button>
              </div>
            </div>
          </div>
          <div class="col col-fixed">
            <div class="example">${ut('exampleCode')}</div>
          </div>
        </header>
      </div>
      ${features()}
    `;
  }
}

HomePage.styles = [
  gridCss,
  btnCss,
  features.styles,
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

    .details {
      padding-top: 22px;
    }

    .details > img {
      margin-right: 30px;
    }

    h1 {
      white-space: pre-line;
      font-size: 2.2rem;
      font-family: "Stardos Stencil", "Helvetica Neue", Arial, sans-serif;
    }

    .buttons {
      display: inline-block;
      text-align: center;
    }

    github-button {
      display: block;
      margin-top: 10px;
    }
  `
];
