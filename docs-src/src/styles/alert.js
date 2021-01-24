import { css } from 'lit-element';

export default css`
  /* other alert styles is in md.js */

  .alert-warning {
    border-left-color: #856404;
    background-color: #fff3cd;
  }

  .alert-warning:before {
    background: #856404;
    content: 'w';
  }
`;
