import { html, css } from 'lit-element';
import { t, ut } from '../directives/i18n';
import { gridCss } from '../styles';

const features = [
  'isomorphic',
  'versatile',
  'declarative',
  'typesafe',
  'treeshakable'
];

function renderFeature(feature) {
  return html`
    <section class="feature col">
      <h3>${t(`features.${feature}.title`)}</h3>
      <p>${ut(`features.${feature}.description`)}</p>
    </section>
  `;
}

const template = () => html`
  <section class="row features">${features.map(renderFeature)}</section>
`;

template.styles = [
  gridCss,
  css`
    .features {
      flex-wrap: wrap;
      justify-content: center;
      padding: 2rem 0;
    }

    .feature {
      padding: 1rem;
      max-width: 200px;
      flex-basis: 200px;
    }

    .feature h3 {
      font-size: 1.4rem;
    }
  `
];

export default template;
