import { makeHtmlAttributes } from '@rollup/plugin-html';
import { generateCss, generateJs } from 'rollup-plugin-legacy-bundle';
import fs from 'fs';

const globalCSS = fs.readFileSync('./public/global.css', 'utf8');

function includeGA(id) {
  if (!id) {
    return '';
  }

  return `
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-19088556-6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}');
    </script>
  `.trim();
}

export default options => ({ attributes, files, publicPath, title }) => `
<!DOCTYPE html>
<html${makeHtmlAttributes(attributes.html)}>
<head>
  ${includeGA(options.analyticsId)}
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="apple-touch-icon" sizes="180x180" href="${publicPath}app-icons/apple-touch-icon.png">
  <link rel="icon" href="${publicPath}app-icons/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="${publicPath}app-icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="${publicPath}app-icons/favicon-16x16.png">
  <link rel="manifest" href="${publicPath}manifest.json">
  <link rel="mask-icon" href="${publicPath}app-icons/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="theme-color" content="#ffffff">
  <style>${globalCSS.replace(/~@\//g, publicPath)}</style>
  ${generateCss(files.css, { publicPath, attrs: attributes.link })}
</head>
<body>
  <casl-docs></casl-docs>

  <script nomodule src="${publicPath}legacy/webcomponentsjs/webcomponents-loader.js"></script>
  <script nomodule src="${publicPath}legacy/webcomponentsjs/custom-elements-es5-adapter.js"></script>
  ${generateJs(files.js, { publicPath, attrs: attributes.script })}
  <script src="//platform-api.sharethis.com/js/sharethis.js#property=5a853806225fbd0013ea3f16&product=sop" async></script>
</body>
</html>
`.trim();
