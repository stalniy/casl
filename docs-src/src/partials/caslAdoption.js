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
  <div class="adoption">
    <section aria-labelledby="adoption-title">
      <h2 id="adoption-title">${t('adoption.title')}</h2>
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
    </section>
    <section aria-labelledby="adoption-projects-title">
      <h2 id="adoption-projects-title">${t('adoption.projectsTitle')}</h2>
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
  </div>
`;

template.styles = css`
  .adoption {
    box-sizing: border-box;
    display: grid;
    align-items: start;
    gap: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    justify-content: center;
    text-align: center;
  }

  .adoption h2 {
    margin: 0 0 .5rem;
    color: #202428;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
  }

  .adoption .adoption-metrics {
    display: flex;
    gap: 30px;
    margin: .75rem 0 0;
    justify-content: center;
  }

  .adoption-metrics a {
    display: flex;
    flex-direction: column;
    gap: .25rem;
    color: #506575;
    text-decoration: none;
  }

  .adoption-metrics span {
    color: #506575;
    font-size: .9375rem;
  }

  .adoption-metrics strong {
    color: #214e70;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .adoption-projects-label {
    margin: 0 0 .125rem;
    color: #506575;
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
    gap: 0 .875rem;
    color: #506575;
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
    color: #214e70;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
  }

  .adoption-contribute {
    font-size: .8125rem;
    margin: .375rem 0 0;
    color: #506575;
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

  @media (min-width: 768px) {
    .adoption {
      grid-template-columns: repeat(2, min-content);
      column-gap: clamp(2rem, 5vw, 4rem);
      text-align: left;
      white-space: nowrap;
    }

    .adoption .adoption-metrics {
      justify-content: flex-start;
    }

    .adoption .adoption-projects {
      flex-wrap: nowrap;
    }
  }
`;

export default template;
