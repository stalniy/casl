import { css } from 'lit-element';

export default css`
  .hljs,
  code[data-filename] {
    display: block;
    overflow-x: auto;
    padding: 1rem;
    background: #1d1f21;
    border-radius: 7px;
    box-shadow: rgba(0, 0, 0, 0.55) 0px 11px 11px 0px;
    font-size: 0.8rem;
    color: #c5c8c6;
  }

  .hljs::selection,
  .hljs span::selection,
  code[data-filename]::selection,
  code[data-filename] span::selection {
    background: #373b41;
  }

  code[data-filename] {
    position: relative;
    padding-top: 22px;
  }

  code[data-filename]:before {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.7rem;
    content: attr(data-filename);
    padding: 2px 6px;
    border-radius: 0 0 0 7px;
    border-left: 1px solid #c5c8c6;
    border-bottom: 1px solid #c5c8c6;
    color: #fff;
  }

  .hljs-title,
  .hljs-name {
    color: #f0c674;
  }

  .hljs-comment {
    color: #707880;
  }

  .hljs-meta,
  .hljs-meta .hljs-keyword {
    color: #f0c674;
  }

  .hljs-number,
  .hljs-symbol,
  .hljs-literal,
  .hljs-deletion,
  .hljs-link {
    color: #cc6666
  }

  .hljs-string,
  .hljs-doctag,
  .hljs-addition,
  .hljs-regexp,
  .hljs-selector-attr,
  .hljs-selector-pseudo {
    color: #b5bd68;
  }

  .hljs-attribute,
  .hljs-code,
  .hljs-selector-id {
    color: #b294bb;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-bullet,
  .hljs-tag {
    color: #81a2be;
  }

  .hljs-subst,
  .hljs-variable,
  .hljs-template-tag,
  .hljs-template-variable {
    color: #8abeb7;
  }

  .hljs-type,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-quote,
  .hljs-section,
  .hljs-selector-class {
    color: #de935f;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  @media (min-width: 768px) {
    code[data-filename] {
      padding-top: 1rem;
    }

    code[data-filename]:before {
      font-size: inherit;
      opacity: 0.5;
      transition: opacity .5s;
    }

    code[data-filename]:hover:before {
      opacity: 1;
    }
  }
`;
