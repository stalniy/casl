import { html, css } from 'lit-element';
import { t } from '../directives/i18n.js';

// Adoption references are recorded alongside entries for future maintainer review.
export const projects = [
  // https://github.com/strapi/strapi/blob/develop/docs/docs/docs/01-core/admin/02-permissions/01-how-they-work.mdx
  { name: 'Strapi', url: 'https://strapi.io/' },
  // https://docs.meshery.io/reference/extensibility/authorization/
  { name: 'Meshery', url: 'https://meshery.io/' },
  // https://github.com/Infisical/infisical/blob/main/backend/package.json
  { name: 'Infisical', url: 'https://infisical.com/' },
  // https://github.com/lightdash/lightdash/blob/main/.context/PERMISSIONS.md
  { name: 'Lightdash', url: 'https://www.lightdash.com/' }
];

const template = () => html`
  <section class="adoption" aria-labelledby="adoption-title">
    <h2 id="adoption-title">${t('adoption.title')}</h2>
    <p class="adoption-subtitle">${t('adoption.subtitle')}</p>
    <ul class="adoption-metrics">
      <li>
        <a href="https://github.com/stalniy/casl/network/dependents" target="_blank" rel="noopener noreferrer">
          <strong>100K+</strong>
          <span>${t('adoption.githubDependents')}</span>
        </a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/@casl/ability?activeTab=dependents" target="_blank" rel="noopener noreferrer">
          <strong>600+</strong>
          <span>${t('adoption.npmDependents')}</span>
        </a>
      </li>
    </ul>
    <p class="adoption-projects-label" id="adoption-projects-label">
      ${t('adoption.projects')}
    </p>
    <ul class="adoption-projects" aria-labelledby="adoption-projects-label">
      ${projects.map((project, index) => html`
        <li>
          ${index ? html`<span aria-hidden="true">·</span>` : ''}
          <a href="${project.url}" target="_blank" rel="noopener noreferrer">
            ${project.name}
          </a>
        </li>
      `)}
    </ul>
    <p class="adoption-contribute">
      <a href="https://github.com/stalniy/casl/discussions/1307" target="_blank" rel="noopener noreferrer">
        ${t('adoption.contribute')}
        <span aria-hidden="true">→</span>
      </a>
    </p>
  </section>
`;

template.styles = css`
  .adoption {
    box-sizing: border-box;
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    background: #fff;
    text-align: center;
  }

  .adoption h2 {
    margin: 0 0 .5rem;
    font-family: "Stardos Stencil", "Helvetica Neue", Arial, sans-serif;
  }

  .adoption-subtitle {
    margin: 0;
    color: #555;
  }

  .adoption .adoption-metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    max-width: 420px;
    margin: 1rem auto .75rem;
  }

  .adoption-metrics a {
    display: flex;
    flex-direction: column;
    gap: .25rem;
    color: #555;
    text-decoration: none;
  }

  .adoption-metrics span {
    color: #555;
    font-size: .9375rem;
  }

  .adoption-metrics strong {
    color: #333;
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .adoption-projects-label {
    margin: 0 0 .125rem;
    color: #555;
    font-size: .875rem;
  }

  .adoption ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .adoption .adoption-projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0 .875rem;
    color: #555;
  }

  .adoption-projects li {
    display: flex;
    align-items: center;
    gap: .875rem;
  }

  .adoption-projects a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: #333;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
  }

  .adoption-contribute {
    font-size: .8125rem;
    margin: .375rem 0 0;
    color: #707070;
  }

  .adoption-contribute a {
    color: inherit;
  }

  .adoption-metrics a:hover span,
  .adoption-projects a:hover,
  .adoption-projects a:focus-visible,
  .adoption-contribute a:hover,
  .adoption-contribute a:focus-visible {
    color: #333;
    text-decoration: underline;
  }

  .adoption-metrics a:focus-visible,
  .adoption-projects a:focus-visible,
  .adoption-contribute a:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }
`;

export default template;
