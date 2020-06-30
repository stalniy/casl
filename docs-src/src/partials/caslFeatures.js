import { html, css, unsafeCSS } from 'lit-element';
import { t, ut } from '../directives/i18n';

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
      <p>${ut(`features.${feature}.description`)}</p>
    </section>
  `;
}

const template = () => html`
  <section class="features container">${features.map(renderFeature)}</section>
`;

template.styles = [
  css`
    .features {
      padding: 1rem 0;
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
      font-size: 1.4rem;
    }

    .feature p:last-child {
      margin-bottom: 0;
    }
  `
];

export default template;
