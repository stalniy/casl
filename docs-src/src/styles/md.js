import { css } from 'lit-element';

export default css`
  .md pre {
    overflow: auto;
  }

  .md a {
    color: var(--app-link-active-color);
  }

  .md code:not([class]) {
    color: rgb(129, 162, 190);
    background: #f8f8f8;
    padding: 2px 5px;
    margin: 0 2px;
    border-radius: 2px;
    white-space: nowrap;
    font-family: "Roboto Mono", Monaco, courier, monospace;
  }

  .md blockquote {
    padding: 0.8rem 1rem;
    margin: 0;
    border-left: 4px solid rgb(129, 162, 190);
    background-color: #f8f8f8;
    position: relative;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
  }

  .md blockquote:before {
    position: absolute;
    top: 0.8rem;
    left: -12px;
    color: #fff;
    background: rgb(129, 162, 190);
    width: 20px;
    height: 20px;
    border-radius: 100%;
    text-align: center;
    line-height: 20px;
    font-weight: bold;
    font-size: 14px;
    content: 'i';
  }

  .md blockquote > p:first-child {
    margin-top: 0;
  }

  .md blockquote > p:last-child {
    margin-bottom: 0;
  }
`;
