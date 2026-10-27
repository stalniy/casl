import { html, css, unsafeCSS } from 'lit-element';
import { t, ut } from '../directives/i18n.js';

const features = [
  'isomorphic',
  'versatile',
  'declarative',
  'typesafe',
  'treeshakable'
];

function renderFeature(feature) {
  return html`
    <section class="feature">
      <h3>${t(`features.${feature}.title`)}</h3>
      <p>${ut(`features.${feature}.description`, {
        size: (Number(import.meta.env.CASL_MIN_GZIP_SIZE) / 1024).toFixed(1)
      })}</p>
    </section>
  `;
}

const template = () => html`
  <div class="features-band">
    <section class="features container">${features.map(renderFeature)}</section>
  </div>
`;

template.styles = [
  css`
    .features-band {
      background: #f7f7f7;
    }

    .features {
      padding: 2rem 0;
      display: -ms-grid;
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      -ms-grid-columns: ${unsafeCSS(features.map(() => 'minmax(200px, 1fr)').join(' '))};
    }

    .feature {
      padding: 1rem;
    }

    .feature h3 {
      margin: 0 0 1rem;
      font-size: 1.4rem;
    }

    .feature p:last-child {
      margin-bottom: 0;
    }
  `
];

export default template;
