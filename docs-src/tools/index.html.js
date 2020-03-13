import { makeHtmlAttributes } from '@rollup/plugin-html';
import { generateCss, generateJs } from 'rollup-plugin-legacy-bundle';

export default ({ attributes, files, publicPath, title }) => `
<!DOCTYPE html>
<html${makeHtmlAttributes(attributes.html)}>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="apple-touch-icon" sizes="180x180" href="/app-icons/apple-touch-icon.png">
  <link rel="icon" href="/app-icons/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/app-icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/app-icons/favicon-16x16.png">
  <link rel="manifest" href="/manifest.json">
  <link rel="mask-icon" href="/app-icons/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="theme-color" content="#ffffff">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      line-height: 1.5;
      color: #202428;
    }

    body,
    a,
    button,
    input  {
      font-size: 16px;
      font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    }
  </style>
  ${generateCss(files.css, { publicPath, attrs: attributes.link })}
</head>
<body>
  <casl-docs></casl-docs>

  <script nomodule src="${publicPath}legacy/webcomponentsjs/webcomponents-loader.js"></script>
  <script nomodule src="${publicPath}legacy/webcomponentsjs/custom-elements-es5-adapter.js"></script>
  ${generateJs(files.js, { publicPath, attrs: attributes.script })}
  <link href="https://fonts.googleapis.com/css?family=Stardos+Stencil:400,700&display=swap" rel="stylesheet">
</body>
</html>
`.trim();
