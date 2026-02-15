import { defineConfig, loadEnv } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { content, summary } from 'rollup-plugin-content';
import xyaml from 'xyaml-webpack-loader/rollup';
import { parsexYaml, parseFrontMatter, markdownOptions } from './tools/contentParser.js';
import { SearchIndex } from './tools/SearchIndex.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '');
  const SUPPORTED_LANGS = (env.LIT_APP_SUPPORTED_LANGS || 'en').split(',');
  const PUBLIC_PATH = (env.LIT_APP_PUBLIC_PATH || '').replace(/\/$/, '');

  const appEnvVars = Object.keys(env).reduce((acc, key) => {
    if (key.startsWith('LIT_APP_')) {
      acc[`import.meta.env.${key.slice('LIT_APP_'.length)}`] = JSON.stringify(env[key]);
    }
    return acc;
  }, {});

  return {
    root: __dirname,
    base: PUBLIC_PATH || '/',
    publicDir: 'public',

    build: {
      outDir: env.LIT_APP_DIST_FOLDER || 'dist',
      emptyOutDir: true,
      target: 'es2020',
      sourcemap: true,
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
      },
    },

    define: {
      ...appEnvVars,
      'import.meta.env.SUPPORTED_LANGS': JSON.stringify(SUPPORTED_LANGS),
      'import.meta.env.BASE_URL_PATH': JSON.stringify(PUBLIC_PATH),
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },

    plugins: [
      xyaml({
        markdown: markdownOptions,
        esm: true,
        namedExports: false,
      }),
      content({
        entry: /\.i18n$/,
        langs: SUPPORTED_LANGS,
        summarizer: false,
        pageSchema: false,
        parse: parsexYaml,
      }),
      content({
        entry: /\.pages$/,
        files: '**/*.md',
        langs: SUPPORTED_LANGS,
        pageSchema: false,
        parse: parseFrontMatter,
        plugins: [
          summary({
            fields: ['id', 'title', 'categories', 'headings'],
            sortBy: ['order'],
            indexBy: ['id'],
          }),
          summary(SearchIndex.factory()),
        ],
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/content/**/*.{png,jpeg,jpg,svg,gif}',
            dest: 'images',
            flatten: true,
          },
        ],
      }),
       {
          name: 'inject-sharethis',
          /**
           *
           * @returns {HtmlTagDescriptor[]}
           */
          transformIndexHtml() {
            return [
              {
                tag: 'script',
                attrs: {
                  async: true,
                  nonce: 'gha',
                  src: `https://www.googletagmanager.com/gtag/js?id=${env.LIT_APP_GA_ID}`
                },
                injectTo: 'head',
              },
              {
                tag: 'script',
                attrs: {
                  nonce: 'gha',
                },
                children: 'window.dataLayer = window.dataLayer || [];' +
                  'function gtag(){dataLayer.push(arguments);}' +
                  'gtag(\'js\', new Date());' +
                  `gtag('config', '${env.LIT_APP_GA_ID}');`,
                injectTo: 'head',
              },
              {
                tag: 'script',
                attrs: {
                  nonce: 'sharethis',
                  src: env.SHARETHIS_SRC
                },
                injectTo: 'body',
              }

            ]
          }
        },
      ...(mode === 'production' ? [

        VitePWA({
          registerType: 'prompt',
          injectRegister: null,
          manifest: false,
          workbox: {
            cleanupOutdatedCaches: true,
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
            globPatterns: [
              'assets/*.json',
              'app-icons/*',
              'fonts/*',
              'manifest.json',
              'index.html',
              '**/*.js',
              '**/*.png',
              '**/*.svg',
            ],
            navigateFallback: `${PUBLIC_PATH}/index.html`,
            runtimeCaching: [
              {
                urlPattern: new RegExp(`${PUBLIC_PATH.replace(/\//g, '\\/')}/images/`),
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'images',
                  expiration: {
                    maxEntries: 100,
                  },
                },
              },
            ],
          },
        }),
      ] : []),
    ],

    server: {
      port: 8080,
      open: true,
    },
  };
});
