import { css } from 'lit-element';

export default css`
  h1 {
    margin: 2rem 0 1rem;
    font-size: 2rem;
  }

  h2 {
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #ddd;
  }

  h1, h2, h3, h4, h5 {
    font-weight: normal;
    cursor: pointer;
  }

  .description {
    margin-top: 10px;
    color: #333;
    padding-left: 5px;
  }

  .description img {
    max-width: 100%;
    height: auto;
  }

  .description > h1 {
    display: none;
  }
`;
