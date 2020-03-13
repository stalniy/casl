import { LitElement, html, css } from 'lit-element';
import { t, d } from '../directives/i18n';

export default class ArticleDetails extends LitElement {
  static cName = 'app-article-details';
  static properties = {
    article: { type: Object, attribute: false },
    category: { type: String },
  };

  constructor() {
    super();
    this.article = null;
    this.category = '';
  }

  render() {
    const { article } = this;
    const category = this.category || article.categories[0];

    return html`
      <time datetime="${article.createdAt}" itemprop="datePublished">
        ${d(article.createdAt)}
      </time>
      <span>
        ${t('article.author')}
        <span itemprop="author">${t(`article.authors.${article.author}`)}</span>
      </span>
      <slot name="more">
        <app-link to="${category}" hash="comments" .params="${article}">
          <i class="icon-comment"></i>${article.commentsCount || 0}
        </app-link>
        <app-link to="${category}" .params="${article}" class="more">${t('article.readMore')}</app-link>
      </slot>
    `;
  }
}

ArticleDetails.styles = [
  css`
    :host {
      margin-top: 10px;
      color: var(--app-article-details-color, #999);
      font-size: 11px;
    }

    :host > * {
      margin-right: 10px;
    }

    app-link {
      margin-right: 10px;
      color: var(--app-link-active-color);
    }

    app-link > [class^="icon-"] {
      margin-right: 5px;
    }
  `
]
