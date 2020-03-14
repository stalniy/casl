import { html, css } from 'lit-element';
import { getNearestPagesFor } from '../services/pages';
import { locale } from '../services/i18n';
import I18nElement from './I18nElement';

function linkTo(page, cssClass) {
  if (!page) {
    return '';
  }

  return html`
    <app-link to="page" .params="${page}" class="${cssClass}">${page.title}</app-link>
  `;
}

export default class PageNav extends I18nElement {
  static cName = 'app-page-nav';
  static properties = {
    fromPage: { type: String }
  };

  constructor() {
    super();
    this._nearestPages = [];
    this.fromPage = '';
  }

  async update(changed) {
    await this.reload();
    return super.update(changed);
  }

  async reload() {
    this._nearestPages = await getNearestPagesFor(locale(), this.fromPage);
  }

  render() {
    return html`
      ${linkTo(this._nearestPages[0], 'prev')}
      ${linkTo(this._nearestPages[1], 'next')}
    `;
  }
}

PageNav.styles = css`
  :host {
    display: block;
  }

  :host:after {
    display: table;
    clear: both;
    content: '';
  }

  .next {
    float: right;
  }
`;
