import { html, css } from 'lit-element';
import { t } from '../directives/i18n.js';

// Official SVGs and their provenance/licenses live in public/project-logos.
// Adoption references are recorded alongside entries for future maintainer review.
const projects = [
  // https://github.com/strapi/strapi/blob/develop/docs/docs/docs/01-core/admin/02-permissions/01-how-they-work.mdx
  { name: 'Strapi', url: 'https://strapi.io/', logo: 'strapi.svg' },
  // https://github.com/Infisical/infisical/blob/main/backend/package.json
  { name: 'Infisical', url: 'https://infisical.com/' },
  // https://github.com/lightdash/lightdash/blob/main/.context/PERMISSIONS.md
  { name: 'Lightdash', url: 'https://www.lightdash.com/' },
  // https://github.com/ToolJet/ToolJet/blob/main/UBIQUITOUS_LANGUAGE.md
  { name: 'ToolJet', url: 'https://tooljet.com/' },
  // https://docs.meshery.io/reference/extensibility/authorization/
  { name: 'Meshery', url: 'https://meshery.io/', logo: 'meshery.svg' },
  // https://github.com/automatisch/automatisch/blob/main/packages/backend/package.json
  { name: 'Automatisch', url: 'https://automatisch.io/' }
];

const template = () => html`
  <section class="adoption" aria-labelledby="adoption-title">
    <h2 id="adoption-title">${t('adoption.title')}</h2>
    <ul class="adoption-projects">
      ${projects.filter(project => project.logo).map(project => html`
        <li>
          <a href="${project.url}" target="_blank" rel="noopener noreferrer">
            <img
              src="${import.meta.env.BASE_URL}project-logos/${project.logo}"
              alt="${project.name}"
              width="144"
              height="36"
            >
          </a>
        </li>
      `)}
    </ul>
    <ul class="adoption-text-projects">
      ${projects.filter(project => !project.logo).map((project, index) => html`
        <li>
          ${index ? html`<span aria-hidden="true">·</span>` : ''}
          <a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.name}</a>
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
    padding: 15px 1rem;
    background: #fff;
    text-align: center;
  }

  .adoption h2 {
    margin: 0 0 1.5rem;
    font-family: "Stardos Stencil", "Helvetica Neue", Arial, sans-serif;
  }

  .adoption ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .adoption .adoption-projects {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .5rem 1rem;
    max-width: 420px;
    margin: 0 auto;
  }

  .adoption .adoption-text-projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: .35rem .5rem;
    margin-top: 1.25rem;
    color: #555;
    font-size: .9375rem;
  }

  .adoption-text-projects li {
    display: flex;
    align-items: center;
    gap: .5rem;
  }

  .adoption-text-projects a {
    color: inherit;
    text-decoration: none;
  }

  .adoption-text-projects a:hover {
    text-decoration: underline;
  }

  .adoption-projects a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    color: inherit;
    font-size: 1.15rem;
    font-weight: 600;
    text-decoration: none;
  }

  .adoption-projects img {
    display: block;
    width: 144px;
    max-width: 100%;
    height: 36px;
    object-fit: contain;
  }

  .adoption-projects a:hover,
  .adoption-projects a:focus-visible {
    text-decoration: underline;
    outline: 2px solid currentColor;
    outline-offset: 4px;
  }

  .adoption-contribute {
    font-size: .8125rem;
    margin: 1rem 0 0;
    color: #707070;
  }

  .adoption-contribute a {
    color: inherit;
    text-decoration: none;
  }

  .adoption-contribute a:hover,
  .adoption-contribute a:focus-visible {
    color: #333;
    text-decoration: underline;
  }
`;

export default template;
