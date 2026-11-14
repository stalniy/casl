import { html, css } from 'lit-element';
import I18nElement from './I18nElement.js';
import { t, ut } from '../directives/i18n.js';
import { t as translate } from '../services/i18n.js';
import { mdCss, pageCss, codeCss, gridCss } from '../styles/index.js';
import { projects as caslProjects } from '../partials/caslAdoption.js';
import { setPageMeta } from '../services/meta.js';
import router from '../services/router.js';
import { tryToNavigateElement, scrollToSectionIn } from '../hooks/scrollToSection.js';
import creatorPhoto from '../assets/consulting/creator-photo.jpeg';
import engineerPhoto from '../assets/consulting/engineer-photo.jpeg';

export default class ConsultingPage extends I18nElement {
  static cName = 'consulting-page';
  static properties = {
    _carouselIndices: { state: true },
    _comparisonMobile: { state: true },
  };

  constructor() {
    super();
    this._carouselIndices = { architecture: 0, engagement: 0 };
    this._comparisonMobile = false;
    this._onComparisonBreakpoint = () => {
      this._comparisonMobile = this._comparisonMedia.matches;
      this._carouselWidths = new WeakMap();
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._comparisonMedia = window.matchMedia('(max-width: 767px)');
    this._comparisonMedia.addEventListener('change', this._onComparisonBreakpoint);
    this._onComparisonBreakpoint();
    this.requestUpdate();
    this._unwatchRouter = router.observe(() => this.requestUpdate());
    this.shadowRoot.addEventListener('click', this._navigateToSection);
  }

  disconnectedCallback() {
    this._comparisonMedia.removeEventListener('change', this._onComparisonBreakpoint);
    this._comparisonObserver?.disconnect();
    this._comparisonObserver = null;
    this._unwatchRouter?.();
    this.shadowRoot.removeEventListener('click', this._navigateToSection);
    super.disconnectedCallback();
  }

  _navigateToSection(event) {
    tryToNavigateElement(event.currentTarget, event.target);
  }

  reload() {
    return Promise.resolve();
  }

  _syncCarousels() {
    if (!this._comparisonMobile) return;
    this.shadowRoot.querySelectorAll('[data-carousel]').forEach(carousel => {
      const index = this._carouselIndices[carousel.dataset.carousel];
      // Keep each selected card aligned after rotation or a breakpoint change.
      if (this._carouselWidths.get(carousel) !== carousel.clientWidth) {
        this._carouselWidths.set(carousel, carousel.clientWidth);
        carousel.scrollTo({ left: index * carousel.clientWidth, behavior: 'instant' });
      }
      const slide = carousel.children[index];
      carousel.style.setProperty('--carousel-height', `${Math.ceil(slide.getBoundingClientRect().height)}px`);
    });
  }

  _onCarouselScroll(event) {
    if (!this._comparisonMobile) return;
    const carousel = event.currentTarget;
    const name = carousel.dataset.carousel;
    // Resizing can emit a scroll before ResizeObserver restores the selected card.
    const width = carousel.clientWidth;
    if (!width || this._carouselWidths.get(carousel) !== width) return;
    const index = Math.min(1, Math.max(0, Math.round(carousel.scrollLeft / carousel.clientWidth)));
    if (index === this._carouselIndices[name]) return;
    // A swipe can move a focused code block offscreen. Keep focus reachable.
    if (carousel.children[this._carouselIndices[name]].contains(this.shadowRoot.activeElement)) {
      this.shadowRoot.getElementById(`${name}-control-${index}`).focus({ preventScroll: true });
    }
    this._carouselIndices = { ...this._carouselIndices, [name]: index };
  }

  _scrollCarousel(name, index) {
    const carousel = this.shadowRoot.querySelector(`[data-carousel="${name}"]`);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Scroll events remain the source of truth, including interrupted smooth scrolls.
    carousel.scrollTo({ left: index * carousel.clientWidth, behavior: reducedMotion ? 'instant' : 'smooth' });
  }

  _renderCarouselControls(name, headingId, labels) {
    return html`
      <div class="carousel-controls" role="group" aria-labelledby="${headingId}">
        ${labels.map((label, index) => html`
          <button type="button" id="${name}-control-${index}"
            aria-controls="${name}-slide-${index}" aria-pressed="${this._carouselIndices[name] === index}"
            @click="${() => this._scrollCarousel(name, index)}">${t(label)}</button>
        `)}
      </div>
    `;
  }

  async updated() {
    if (!this._comparisonObserver) {
      this._comparisonObserver = new ResizeObserver(() => this._syncCarousels());
      this.shadowRoot.querySelectorAll('[data-carousel] > *').forEach(slide => this._comparisonObserver.observe(slide));
    }
    this._syncCarousels();
    setPageMeta({
      meta: {
        title: translate('consulting.meta.title'),
        description: translate('consulting.meta.description'),
        keywords: translate('consulting.meta.keywords'),
      }
    });
    await Promise.all(Array.from(
      this.shadowRoot.querySelectorAll('app-link, authorization-examples, consulting-cta'),
      element => element.updateComplete
    ));
    if (!this.isConnected) return;
    const route = router.current().response;
    if (this._renderedRoute !== route) {
      this._renderedRoute = route;
      scrollToSectionIn(this.shadowRoot);
    }
    this.dispatchEvent(new CustomEvent('content-ready', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <article>
        <p class="page-eyebrow">${t('consulting.hero.eyebrow')}<span class="eyebrow-detail"> / ${t('consulting.hero.eyebrowDetail')}</span></p>
        <h1 class="page-title">${t('consulting.hero.title')}</h1>
        <div class="description md">
          <div class="consulting">
            <div class="consulting-hero">
              <div class="lead">${t('consulting.hero.lead')}</div>
              <div class="tablet">${t('consulting.hero.support')}</div>
              <consulting-cta location="hero"></consulting-cta>
            </div>
            <h2 id="nearly-a-decade-of-authorization-expertise">${t('consulting.proof.title')}</h2>
            <div class="proof-metrics">
              <p><a href="https://github.com/stalniy/casl/commit/8694688a3b87ea9f2806b93ae6ba7b3b613012c5" target="_blank" rel="noopener nofollow"><strong>${t('consulting.proof.since')}</strong><span>${t('consulting.proof.longevityLabel')}</span></a></p>
              <p><a href="https://api.npmjs.org/downloads/point/last-month/@casl/ability" target="_blank" rel="noopener nofollow"><strong>${t('consulting.proof.downloads')}</strong><span>${t('consulting.proof.downloadsLabel')}</span></a></p>
              <p><a href="https://github.com/stalniy/casl/stargazers" target="_blank" rel="noopener nofollow"><strong>${t('consulting.proof.stars')}</strong><span>${t('consulting.proof.starsLabel')}</span></a></p>
            </div>
            <section class="adoption-proof" aria-labelledby="casl-adoption-title">
              <h3 id="casl-adoption-title">${t('consulting.proof.adoptionTitle')}</h3>
              <div class="lead">${t('consulting.proof.adoptionDescription')}</div>
              <ul class="adoption-text-projects">
                ${caslProjects.map((project, index) => html`
                  <li>
                    ${index ? html`<span aria-hidden="true">·</span>` : ''}
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.name}</a>
                  </li>
                `)}
              </ul>
            </section>
            <div class="ecosystem-recognition">
              <section aria-labelledby="ecosystem-recognition-title">
                <h3 id="ecosystem-recognition-title">${t('consulting.proof.ecosystemTitle')}</h3>
                <ul class="ecosystem-links">
                  <li><a href="https://www.openpolicyagent.org/docs/rest-api#compile-api" target="_blank" rel="noopener nofollow">${t('consulting.proof.openPolicyAgent')}</a> — ${t('consulting.proof.opaRelationship')}</li>
                  <li><a href="https://www.cerbos.dev/ecosystem/ucast" target="_blank" rel="noopener nofollow">${t('consulting.proof.cerbos')}</a> — ${t('consulting.proof.cerbosRelationship')}</li>
                  <li><a href="https://docs.permit.io/integrations/feature-flagging/casl/" target="_blank" rel="noopener nofollow">${t('consulting.proof.permitIo')}</a> — ${t('consulting.proof.permitRelationship')}</li>
                  <li><a href="https://docs.nestjs.com/v7/security/authorization#integrating-casl" target="_blank" rel="noopener nofollow">${t('consulting.proof.nestjs')}</a> — ${t('consulting.proof.nestjsRelationship')}</li>
                </ul>
              </section>
              <figure class="ucast-flow tablet">
                <figcaption>${t('consulting.proof.flowTitle')}</figcaption>
                <div class="filter-flow" role="img" aria-label="${t('consulting.proof.flowLabel')}">
                  <span>${t('consulting.proof.opaRego')}</span>
                  <b aria-hidden="true">→</b>
                  <span class="highlight-node">${t('consulting.proof.ucast')}</span>
                  <b aria-hidden="true">→</b>
                  <span>${t('consulting.proof.dataFilter')}</span>
                </div>
                <p>${t('consulting.proof.flowCaption')}</p>
              </figure>
            </div>
            <h2 id="authorization-becomes-architecture">${t('consulting.problem.title')}</h2>
            ${this._renderCarouselControls('architecture', 'authorization-becomes-architecture', [
              'consulting.problem.before', 'consulting.problem.after'
            ])}
            <div class="architecture-comparison mobile-carousel" data-carousel="architecture" @scroll="${this._onCarouselScroll}">
              <figure class="architecture before" id="architecture-slide-0"
                ?inert="${this._comparisonMobile && this._carouselIndices.architecture !== 0}">
                <figcaption class="tablet"><span class="eyebrow">${t('consulting.problem.before')}</span><strong>${t('consulting.problem.beforeTitle')}</strong></figcaption>
                <div class="layer-grid scattered">
                  <div class="layer">${t('consulting.problem.frontend')}<code>roles.includes('admin')</code></div>
                  <div class="layer">${t('consulting.problem.api')}<code>user.tenantId === tenantId</code></div>
                  <div class="layer">${t('consulting.problem.services')}<code>roles.includes('admin')</code></div>
                  <div class="layer">${t('consulting.problem.databaseQueries')}<code>WHERE tenant_id = ?</code></div>
                </div>
                <p class="caption">${t('consulting.problem.beforeCaption')}</p>
              </figure>
              <figure class="architecture after" id="architecture-slide-1"
                ?inert="${this._comparisonMobile && this._carouselIndices.architecture !== 1}">
                <figcaption class="tablet"><span class="eyebrow">${t('consulting.problem.after')}</span><strong>${t('consulting.problem.afterTitle')}</strong></figcaption>
                <div class="policy-model">${ut('consulting.problem.sharedModel')}</div>
                <div class="layer-grid consistent">
                  <div class="layer ui-layer">
                    ${t('consulting.problem.frontend')}
                    <small>${t('consulting.problem.uiVisibilityOnly')}</small>
                    <code>ability.can(<wbr>'update',<wbr> project)</code>
                  </div>
                  <div class="layer">
                    ${t('consulting.problem.api')}
                    <small>${t('consulting.problem.enforceRequests')}</small>
                    <code>ability.can(<wbr>'update',<wbr> project)</code>
                  </div>
                  <div class="layer">
                    ${t('consulting.problem.servicesJobs')}
                    <small>${t('consulting.problem.enforceOperations')}</small>
                    <code>ability.can(<wbr>'update',<wbr> project)</code>
                  </div>
                  <div class="layer">
                    ${t('consulting.problem.databaseQueries')}
                    <small>${t('consulting.problem.filterAccessibleRecords')}</small>
                    <code tabindex="0">accessibleBy(ability, 'update')<wbr>.ofType(<wbr>'Project')</code>
                  </div>
                </div>
                <p class="caption">${t('consulting.problem.afterCaption')}</p>
              </figure>
            </div>
            <h2 id="a-path-from-simple-claims-to-relationships">${t('consulting.evolution.title')}</h2>
            <p class="section-intro">${t('consulting.evolution.intro')}</p>
            <authorization-examples></authorization-examples>
            <p class="caption">${t('consulting.evolution.caption')}</p>
            <h2 id="expertise-where-your-team-needs-it">${t('consulting.engagements.title')}</h2>
            ${this._renderCarouselControls('engagement', 'expertise-where-your-team-needs-it', [
              'consulting.engagements.advisoryEyebrow', 'consulting.engagements.implementationEyebrow'
            ])}
            <div class="engagement-comparison mobile-carousel" data-carousel="engagement" @scroll="${this._onCarouselScroll}">
              <div class="engagement" id="engagement-slide-0"
                ?inert="${this._comparisonMobile && this._carouselIndices.engagement !== 0}">
                <p class="eyebrow">${t('consulting.engagements.advisoryEyebrow')}</p>
                <h3>${t('consulting.engagements.advisoryTitle')}</h3>
                <p>${t('consulting.engagements.advisoryIntro')}</p>
                <ol class="engagement-steps">
                  <li><strong>${t('consulting.engagements.assessment')}</strong><span>${t('consulting.engagements.assessmentDescription')}</span></li>
                  <li><strong>${t('consulting.engagements.systemDesign')}</strong><span>${t('consulting.engagements.designDescription')}</span></li>
                  <li><strong>${t('consulting.engagements.migrationRoadmap')}</strong><span>${t('consulting.engagements.roadmapDescription')}</span></li></ol>
                <p class="engagement-outcome">${t('consulting.engagements.advisoryOutcome')}</p>
              </div>
              <div class="engagement implementation" id="engagement-slide-1"
                ?inert="${this._comparisonMobile && this._carouselIndices.engagement !== 1}">
                <p class="eyebrow">${t('consulting.engagements.implementationEyebrow')}</p>
                <h3>${t('consulting.engagements.implementationTitle')}</h3>
                <p>${t('consulting.engagements.implementationIntro')}</p>
                <ol class="engagement-steps">
                  <li><strong>${t('consulting.engagements.architecture')}</strong><span>${t('consulting.engagements.architectureDescription')}</span></li>
                  <li><strong>${t('consulting.engagements.integration')}</strong><span>${t('consulting.engagements.integrationDescription')}</span></li>
                  <li><strong>${t('consulting.engagements.testingRollout')}</strong><span>${t('consulting.engagements.rolloutDescription')}</span></li></ol>
                <p class="engagement-outcome">${t('consulting.engagements.implementationOutcome')}</p>
              </div>
            </div>
            <p class="engagement-terms">${t('consulting.engagements.b2bTerms')}</p>
            <h2 id="work-directly-with-experienced-engineers">${t('consulting.team.title')}</h2>
            <div class="team-summary">
              <div class="team-profile">
                <div class="team-portrait">
                  <img src="${creatorPhoto}" alt="${t('consulting.team.creatorName')}" width="104" height="104" loading="lazy" decoding="async">
                </div>
                <div>
                  <h3><a href="https://www.linkedin.com/in/sstotskyi/" target="_blank" rel="noopener nofollow">${t('consulting.team.creatorName')}</a></h3>
                  <p class="team-role">${t('consulting.team.creatorRole')}</p>
                  <p>${t('consulting.team.creatorDescription')}</p>
                </div>
              </div>
              <div class="team-profile">
                <div class="team-portrait">
                  <img class="engineer-portrait" src="${engineerPhoto}" alt="${t('consulting.team.engineerName')}" width="104" height="104" loading="lazy" decoding="async">
                </div>
                <div>
                  <h3><a href="https://www.linkedin.com/in/igryshaiev/" target="_blank" rel="noopener nofollow">${t('consulting.team.engineerName')}</a></h3>
                  <p class="team-role">${t('consulting.team.engineerRole')}</p>
                  <p>${t('consulting.team.engineerDescription')}</p>
                </div>
              </div>
            </div>
            <div class="team-collaboration">
              <p>${t('consulting.team.collaborationDescription')}</p>
            </div>
            <div class="consulting-contact">
              <h2 id="a-clearer-path-for-your-authorization-architecture">${t('consulting.contact.title')}</h2>
              <p>${t('consulting.contact.description')}</p>
              <p><consulting-cta location="footer"></consulting-cta></p>
              <p class="caption">${t('consulting.contact.engagementMetadata')}</p>
            </div>
        </div></div>
      </article>
    `;
  }
}

ConsultingPage.styles = [
  pageCss,
  mdCss,
  codeCss,
  gridCss,
  css`
  :host { display: block; padding-bottom: 30px; }

  :host article { max-width: 1120px; margin: auto; padding: 20px 6px 0; }
  :host article > h1 {
    max-width: 900px;
    margin: 10px 0 16px;
    font-size: 1.65rem;
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -.035em;
    cursor: auto;
  }
  :host .description { padding-left: 0; }
  .page-eyebrow { font-size: .72rem; letter-spacing: .12em; font-weight: 700; color: #526575; margin: 0; }
  .page-eyebrow .eyebrow-detail { display: none; }
  .consulting { color: #26333c; }
  .consulting * { box-sizing: border-box; }
  .consulting p { line-height: 1.6; }
  .consulting > h2 { margin: 36px 0 24px; padding-top: 24px; border-top: 1px solid #d9e2e8; border-bottom: 0; font-size: clamp(1.6rem, 3vw, 2rem); line-height: 1.2; letter-spacing: -.02em; font-weight: 600; cursor: auto; }
  .consulting-hero + h2 { margin-top: 28px; padding-top: 20px; margin-bottom: 20px; }
  .consulting h3 { font-size: 1.2rem; font-weight: 600; margin: 0 0 14px; cursor: auto; }
  .consulting h3::before { content: none; }
  .consulting a, .consulting app-link { color: #175d82; }
  .consulting a:focus-visible, .consulting summary:focus-visible { outline: 3px solid #175d82; outline-offset: 4px; }
  .consulting .caption { font-size: .82rem; color: #52616c; line-height: 1.5; }
  .consulting .eyebrow { display: block; font-size: .7rem; font-weight: 700; letter-spacing: .1em; color: #526575; margin-bottom: 10px; }
  .consulting .consulting-hero { max-width: 850px; }

  .adoption-proof .lead,
  .consulting-hero .lead {
    font-size: 1.1rem;
    color: #435764;
    margin-bottom: 8px;
    line-height: 1.5;
  }
  .consulting .consulting-hero consulting-cta { max-width: 100%; margin: 8px 0 0; }
  .consulting .consulting-hero > p:has(consulting-cta) { display: inline-block; margin-block: 0; }
  .consulting .consulting-hero > p:has(a) { display: block; margin-left: 0; }
  .consulting details { border-top: 1px solid #d9e2e8; margin: 16px 0; padding-top: 14px; font-size: .9rem; }
  .consulting summary { cursor: pointer; color: #175d82; padding: 4px 0; }
  .consulting details > p { max-width: 850px; }
  .consulting .takeaway { font-weight: 600; line-height: 1.6; padding-left: 18px; border-left: 3px solid #81a2be; }
  .consulting .proof-metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 12px; }
  .consulting .proof-metrics > p { margin: 0; border-left: 3px solid #aec6d5; padding-left: 10px; min-width: 0; }
  .consulting .proof-metrics a { text-decoration: none; display: block; color: #202428; }
  .consulting .proof-metrics a:hover { text-decoration: underline; }
  .consulting .proof-metrics strong { display: block; font-size: clamp(1.35rem, 5.5vw, 1.65rem); letter-spacing: -.035em; line-height: 1.3; }
  .consulting .proof-metrics span { display: block; font-size: .8125rem; color: #526575; text-wrap: pretty; }
  .consulting .adoption-proof { margin-top: 24px; }
  .consulting .adoption-proof > h3 { margin: 0; font-size: 1.15rem; color: #202428; }
  .consulting .adoption-logos { display: grid; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px; padding: 16px 0; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .consulting .adoption-logos a { display: flex; align-items: center; justify-content: center; flex: 0 1 220px; max-width: 100%; min-height: 44px; min-width: 0; }
  .consulting .adoption-logos img { display: block; width: auto; max-width: 100%; height: clamp(20px, 5.5vw, 28px); object-fit: contain; }
  .consulting .adoption-text-projects { display: flex; flex-wrap: wrap; justify-content: flex-start; gap: .35rem .5rem; padding: 0; margin: 0 0 24px; list-style: none; color: #555; font-size: .9375rem; }
  .consulting .adoption-text-projects li { display: flex; align-items: center; gap: .5rem; }
  .consulting .adoption-text-projects a { color: inherit; text-decoration: none; }
  .consulting .adoption-text-projects a:hover { text-decoration: underline; }
  .adoption-proof .lead {
    margin-top: 10px;
  }
  .consulting .ecosystem-recognition { display: grid; grid-template-columns: 1fr; gap: 24px; padding-top: 24px; border-top: 1px solid #d9e2e8; }
  .consulting .ecosystem-recognition h3, .consulting .ucast-flow figcaption { font-size: 1rem; font-weight: 600; color: #526575; margin: 0 0 12px; line-height: 1.4; }
  .consulting .ecosystem-links { list-style: none; padding: 0; margin: 0; font-size: .82rem; color: #52616c; line-height: 1.6; }
  .consulting .ecosystem-links li + li { margin-top: 8px; }
  .consulting .ecosystem-links a { font-weight: 600; }
  .consulting .ucast-flow { min-width: 0; margin: 0; }
  .consulting .ucast-flow p { font-size: .82rem; color: #52616c; margin: 12px 0 0; }
  .consulting .filter-flow { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr); gap: 10px; align-items: center; text-align: center; }
  .consulting .filter-flow > span { padding: 8px 4px; border: 1px solid #d4dfe6; border-radius: 5px; font-size: .82rem; }
  .consulting .filter-flow .highlight-node { background: #edf3f6; border-color: #b9cedb; color: #175d82; font-weight: 600; }
  .consulting .filter-flow b, .consulting .decision-flow b, .consulting .mini-flow b { color: #668ba2; }
  .consulting .architecture-comparison, .consulting .relationship-options, .consulting .engagement-comparison, .consulting .team-summary { display: grid; grid-template-columns: 1fr; gap: 24px; }
  .carousel-controls { display: inline-flex; gap: 4px; padding: 4px; margin-bottom: 12px; border: 1px solid #b9cedb; border-radius: 8px; background: #edf3f6; }
  .carousel-controls button { padding: 8px 18px; border: 0; border-radius: 5px; background: transparent; color: #435764; font: inherit; font-size: .85rem; font-weight: 600; cursor: pointer; }
  .carousel-controls button[aria-pressed="true"] { background: #175d82; color: #fff; }
  .carousel-controls button:hover { box-shadow: inset 0 0 0 1px #175d82; }
  .carousel-controls button:focus-visible { outline: 3px solid #175d82; outline-offset: 2px; }
  @media (max-width: 767px) {
    .consulting .mobile-carousel {
      display: flex;
      align-items: flex-start;
      gap: 0;
      min-width: 0;
      max-width: 100%;
      height: var(--carousel-height, auto);
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      overscroll-behavior-x: contain;
      scrollbar-width: none;
    }
    .consulting .mobile-carousel::-webkit-scrollbar { display: none; }
    .consulting .mobile-carousel > * { box-sizing: border-box; min-width: 0; flex: 0 0 100%; scroll-snap-align: start; }
  }
  .consulting .architecture { position: relative; min-width: 0; margin: 0; border: 1px solid #d4dfe6; border-radius: 10px; padding: 12px; display: flex; flex-direction: column; }
  .consulting .architecture figcaption { margin-bottom: 10px; line-height: 1.3; }
  .consulting .architecture .eyebrow { margin-bottom: 6px; }
  .consulting .architecture figcaption strong { font-size: 1rem; }
  .consulting .architecture .caption { margin: 12px 0 0; }
  .consulting .architecture.after { background: #f1f6f8; border-color: #a5bfce; }
  .consulting .layer-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .consulting .layer {
    position: relative;
    border: 1px solid #b6c7d1;
    border-radius: 6px;
    background: #fff;
    min-width: 0;
    padding: 6px 10px;
    text-align: left;
    font-weight: 600;
    font-size: .9rem;
    line-height: 1.4;
    min-height: 0;
  }
  .consulting .layer code, .consulting .layer small { display: block; white-space: normal; overflow-wrap: normal; font-size: .75rem; margin: 4px 0 0; font-weight: 400; }
  .consulting .layer code { white-space: pre; overflow-x: auto; line-height: 1.5; }
  .consulting .layer code wbr { display: none; }
  .consulting .layer code { color: #675a53; background: #f7f4f2; }
  .consulting .scattered {
    position: relative;
    padding-top: 0;
    gap: 8px;
    margin: 0;
  }
  .consulting .scattered::before, .consulting .scattered::after { content: none; position: absolute; left: 15%; top: 50%; width: 70%; border-top: 2px dashed #c2b7ad; transform: rotate(24deg); }
  .consulting .scattered::after { transform: rotate(-24deg); }
  .consulting .scattered .layer { z-index: 1; border-style: dashed; }
  .consulting .policy-model { position: relative; background: #175d82; border-radius: 6px; padding: 1px; }
  .consulting .policy-model pre { margin: 0; }
  .consulting .policy-model .hljs { margin: 0; padding: 12px 14px; box-shadow: none; font-size: .8rem; line-height: 1.5; }
  .consulting .consistent {
    position: relative;
    padding: 12px 0 0 12px;
    gap: 8px;
    grid-auto-rows: auto;
  }
  .consulting .consistent::before { content: ''; position: absolute; left: 0; top: 0; bottom: 29px; border-left: 1px solid #81a2be; transform: none; }
  .consulting .consistent .layer::before { content: ''; position: absolute; top: 50%; right: auto; left: -13px; width: 12px; border-top: 1px solid #81a2be; }
  .consulting .consistent .layer:nth-child(even)::before { right: auto; left: -13px; }
  .consulting .consistent .layer code { background: #edf3f6; color: #175d82; }
  .consulting .consistent .layer small { display: inline; color: #52616c; margin: 0 0 0 8px; }
  .consulting .architecture-takeaway { margin-top: 18px; font-size: .9rem; }
  .consulting .architecture-takeaway .caption { font-weight: 400; margin: 4px 0 0; }
  .consulting .ui-layer { border-style: dashed; }
  .consulting .section-intro { margin-bottom: 12px; }
  .consulting .relationship-figure { margin: 0 0 24px; border: 1px solid #d4dfe6; border-radius: 10px; padding: 20px; }
  .consulting .relationship-figure figcaption { font-weight: 600; margin-bottom: 20px; }
  .consulting .resource-graph { display: grid; grid-template-columns: 1fr; align-items: center; gap: 8px; text-align: center; }
  .consulting .resource-graph > span { padding: 10px; background: #edf3f6; border: 1px solid #b9cedb; border-radius: 6px; font-size: .9rem; font-weight: 600; width: 100%; }
  .consulting .resource-graph > small { font-size: .65rem; color: #526575; }
  .consulting .resource-graph > small b { display: inline-block; transform: rotate(90deg); }
  .consulting .relationship-figure .caption { margin: 18px 0 0; }
  .consulting .relationship-options > div { padding: 24px; background: #f4f6f8; border-radius: 8px; }
  .consulting .relationship-options p { font-size: .9rem; margin: 18px 0 0; }
  .consulting .mini-flow { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: .85rem; text-align: center; }
  .consulting .mini-flow > span { padding: 6px 10px; border: 1px solid #c7d5df; border-radius: 4px; background: #fff; width: 100%; }
  .consulting .mini-flow code { color: #175d82; white-space: normal; overflow-wrap: anywhere; padding: 8px; background: #e5eef4; }
  .consulting .engagement { border: 1px solid #c8d6df; border-radius: 10px; padding: 20px; }
  .consulting .engagement.implementation { border-top: 3px solid #175d82; padding-top: 26px; background: #f5f8fa; }
  .consulting .engagement-steps { list-style: none; padding: 0; counter-reset: step; margin: 24px 0; }
  .consulting .engagement-steps li { counter-increment: step; position: relative; padding: 0 0 24px 40px; border-left: 1px solid #b6cbd8; margin-left: 12px; }
  .consulting .engagement-steps li:last-child { padding-bottom: 0; border-color: transparent; }
  .consulting .engagement-steps li::before { content: counter(step); position: absolute; left: -13px; top: 0; width: 24px; height: 24px; border-radius: 50%; background: #e7eff4; color: #175d82; display: grid; place-items: center; font-size: .75rem; font-weight: 600; }
  .consulting .engagement-steps strong { display: block; }
  .consulting .engagement-steps span { display: block; font-size: .85rem; color: #526575; margin-top: 4px; }
  .consulting .engagement-outcome { border-top: 1px solid #d4dfe6; padding-top: 18px; font-size: .9rem; font-weight: 600; margin-bottom: 0; }
  .consulting .engagement-terms { border-top: 1px solid #d4dfe6; margin: 18px 0; padding-top: 12px; color: #526575; font-size: .85rem; }
  @media (max-width: 767px) {
    .consulting .engagement { padding: 17px; }
    .consulting .engagement.implementation { padding-top: 22px; }
    .consulting .engagement > .eyebrow { display: none; }
    .consulting .engagement-steps { margin: 18px 0; }
    .consulting .engagement-steps li { padding-bottom: 20px; }
    .consulting .engagement-steps li:last-child { padding-bottom: 0; }
    .consulting .engagement-outcome { padding-top: 14px; }
  }
  .consulting .decision-flow { display: flex; align-items: center; gap: 10px; background: #f1f5f7; padding: 20px; border-radius: 8px; font-size: .9rem; flex-direction: column; text-align: center; }
  .consulting .decision-flow b { transform: rotate(90deg); }
  .consulting .decision-flow span { flex: 1; }
  .consulting .decision-flow strong { flex: 1; color: #175d82; }
  .consulting .team-profile { display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 16px; align-items: start; }
  .consulting .team-profile h3 { margin-top: 0; }
  .consulting .team-portrait { width: 104px; height: 104px; border-radius: 50%; overflow: hidden; }
  .consulting .team-portrait img { display: block; width: 104px; height: 104px; object-fit: cover; object-position: center; }
  .consulting .team-portrait .engineer-portrait { transform: scale(1.85); transform-origin: 50% 38%; }
  .consulting .team-summary p { font-size: .95rem; margin-bottom: 0; }
  .consulting .team-summary .team-role { color: #526575; font-weight: 600; margin-top: 8px; }
  .consulting .team-collaboration { margin-top: 32px; }
  .consulting .team-collaboration p { font-size: .95rem; margin-bottom: 0; }
  .consulting .consulting-contact { margin: 48px 0 24px; background: #edf3f6; padding: 24px; border-radius: 10px; }
  .consulting .consulting-contact h2 { margin: 0 0 20px; border: 0; padding: 0; font-size: 1.8rem; line-height: 1.25; font-weight: 600; cursor: auto; }
  .consulting .consulting-contact .caption { margin-bottom: 0; }

  .tablet {
    display: none;
  }

  consulting-cta {
    display: block;
  }

  @media (min-width: 768px) {
    .carousel-controls { display: none; }
    .consulting .section-intro { margin-bottom: 1em; }
    .page-eyebrow .eyebrow-detail { display: inline; }
    :host article > h1 { font-size: clamp(2rem, 4.6vw, 2.9rem); line-height: 1.1; margin: 12px 0 24px; }
    .consulting .consulting-hero .lead { font-size: 1.25rem; line-height: inherit; margin-bottom: 10px; }
    .consulting .consulting-hero consulting-cta { max-width: none; margin: 1rem 0; }
    .consulting .adoption-proof { margin-top: 32px; }
    .consulting .adoption-proof > h3 { font-size: 1.35rem; }
    .consulting .adoption-logos { display: flex; grid-template-columns: none; gap: 24px 64px; padding: 28px 0; }
    .consulting .adoption-logos a { min-width: auto; max-width: 42%; min-height: 76px; }
    .consulting .adoption-logos img { width: 220px; height: 56px; }
    .consulting .ecosystem-recognition { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 32px; }
    :host article { padding: 48px 20px 0; }
    .consulting > h2 { margin-top: 56px; padding-top: 32px; }
    .consulting-hero + h2 { margin-top: 56px; padding-top: 32px; margin-bottom: 24px; }
    .consulting .architecture-comparison, .consulting .relationship-options, .consulting .engagement-comparison, .consulting .team-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .consulting .proof-metrics { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
    .consulting .proof-metrics > p { min-width: auto; padding-left: 20px; }
    .consulting .proof-metrics strong { font-size: clamp(1.9rem, 4vw, 2.9rem); }
    .consulting .proof-metrics span { font-size: .9rem; text-wrap: wrap; }
    .consulting .architecture { min-width: auto; padding: 24px; }
    .consulting .architecture figcaption { margin-bottom: 24px; line-height: inherit; }
    .consulting .architecture figcaption strong { font-size: 1.15rem; }
    .consulting .architecture .eyebrow { margin-bottom: 10px; }
    .consulting .architecture .caption { margin-top: 22px; }
    .consulting .layer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; }
    .consulting .layer { min-width: auto; padding: 14px 6px; text-align: center; line-height: inherit; min-height: 120px; }
    .consulting .layer code, .consulting .layer small { white-space: normal; overflow-wrap: anywhere; font-size: .7rem; margin-top: 8px; }
    .consulting .layer code { overflow-x: visible; line-height: inherit; }
    .consulting .layer code wbr { display: inline; }
    .consulting .scattered { padding-top: 20px; gap: 44px 16px; margin: auto 0; }
    .consulting .scattered::before, .consulting .scattered::after { content: ''; }
    .consulting .consistent { padding: 20px 0 0; gap: 44px 16px; grid-auto-rows: 1fr; }
    .consulting .consistent::before { left: 50%; bottom: calc(25% - 16px); border-left-width: 2px; transform: translateX(-1px); }
    .consulting .consistent .layer::before { right: -9px; left: auto; width: 8px; border-top-width: 2px; }
    .consulting .consistent .layer:nth-child(even)::before { right: auto; left: -9px; }
    .consulting .consistent .layer small { display: block; margin: 6px 0 0; }
    .consulting .relationship-figure { padding: 24px; }
    .consulting .engagement { padding: 28px; }
    .consulting .decision-flow { flex-direction: row; text-align: inherit; gap: 14px; }
    .consulting .decision-flow b { transform: none; }
    .consulting .consulting-contact { padding: 32px; }
    .consulting .consulting-hero > p:has(a) { display: inline-block; margin-left: 22px; }

    .tablet { display: block; }
    consulting-cta { display: inline-block; }
  }

  @media (min-width: 1024px) {
    .consulting .resource-graph { grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr; }
    .consulting .resource-graph > small b { display: inline; transform: none; }
    .consulting .resource-graph > span { width: auto; padding: 16px 8px; }
  }
`];
