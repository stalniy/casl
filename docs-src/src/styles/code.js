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
  }

  code[data-filename]:hover:before {
    opacity: 1;
  }

  code[data-filename]:before {
    position: absolute;
    right: 10px;
    top: 10px;
    content: attr(data-filename);
    padding: 2px 5px;
    border-radius: 7px;
    border: 1px solid #c5c8c6;
    opacity: 0.5;
    transition: opacity .5s;
    color: #fff;
  }

  /*color: fg_yellow*/
  .hljs-title,
  .hljs-name {
    color: #f0c674;
  }

  /*color: fg_comment*/
  .hljs-comment {
    color: #707880;
  }


  .hljs-meta,
  .hljs-meta .hljs-keyword {
    color: #f0c674;
  }

  /*color: fg_red*/
  .hljs-number,
  .hljs-symbol,
  .hljs-literal,
  .hljs-deletion,
  .hljs-link {
  color: #cc6666
  }

  /*color: fg_green*/
  .hljs-string,
  .hljs-doctag,
  .hljs-addition,
  .hljs-regexp,
  .hljs-selector-attr,
  .hljs-selector-pseudo {
    color: #b5bd68;
  }

  /*color: fg_purple*/
  .hljs-attribute,
  .hljs-code,
  .hljs-selector-id {
  color: #b294bb;
  }

  /*color: fg_blue*/
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-bullet,
  .hljs-tag {
  color: #81a2be;
  }

  /*color: fg_aqua*/
  .hljs-subst,
  .hljs-variable,
  .hljs-template-tag,
  .hljs-template-variable {
    color: #8abeb7;
  }

  /*color: fg_orange*/
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
`;
