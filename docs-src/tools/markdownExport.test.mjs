import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { exportMarkdown } from './markdownExport.js';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'casl-markdown-'));
  const pages = path.join(root, 'docs-src/src/content/pages');
  const pageDir = path.join(pages, 'sample');
  const output = path.join(root, 'dist/en/sample');
  await mkdir(pageDir, { recursive: true });
  await mkdir(output, { recursive: true });
  t.after(() => rm(root, { recursive: true, force: true }));
  return { root, pages, pageDir, output };
}

const routeState = { routeName: 'page', routeParams: { lang: 'en', id: 'sample' } };

test('expands nested includes from their own directories and keeps front matter and CRLF source bytes', async (t) => {
  const f = await fixture(t);
  const source = '---\r\ntitle: Test\r\nmeta:\r\n  description: "one\r\n    two"\r\n---\r\nBefore\r\n@include: fixtures/top.md\r\n@include: fixtures/top.md\r\nAfter\r\n';
  await writeFile(path.join(f.pageDir, 'en.md'), source);
  await mkdir(path.join(f.root, 'fixtures/nested'), { recursive: true });
  await writeFile(path.join(f.root, 'fixtures/top.md'), 'first\n@include: nested/child.md\nlast\n');
  await writeFile(path.join(f.root, 'fixtures/nested/child.md'), 'nested\n');
  assert.equal(await exportMarkdown('/en/sample?query=1#part', f.output, '', routeState, { repoRoot: f.root, pagesRoot: f.pages }), '/en/sample/index.md');
  const result = await readFile(path.join(f.output, 'index.md'), 'utf8');
  assert.ok(result.startsWith(source.slice(0, source.indexOf('Before'))), 'front matter and its CRLF bytes stay unchanged');
  assert.match(result, /Before\r\nfirst\nnested\nlast\r\nfirst\nnested\nlast\r\nAfter\r\n/);
  assert.doesNotMatch(result, /@include:/);

  const plain = '\r\n---\r\nplain body\r\n';
  await writeFile(path.join(f.pageDir, 'en.md'), plain);
  await exportMarkdown('/v7/en/sample?query=1#part', f.output, '/v7', routeState, { repoRoot: f.root, pagesRoot: f.pages });
  assert.deepEqual(await readFile(path.join(f.output, 'index.md')), Buffer.from(plain));
});

test('copies images by origin, splits colliding basenames and rewrites references without changing ordinary links', async (t) => {
  const f = await fixture(t);
  const images = path.join(f.pageDir, 'images');
  const includes = path.join(f.root, 'snippets/assets');
  await mkdir(images, { recursive: true });
  await mkdir(includes, { recursive: true });
  const first = Buffer.from([1, 2, 3]);
  const second = Buffer.from([4, 5, 6]);
  const mapped = Buffer.from([7, 8, 9]);
  const spaced = Buffer.from([12, 13, 14]);
  await writeFile(path.join(images, 'same.png'), first);
  await writeFile(path.join(f.pageDir, 'same.png'), first);
  await writeFile(path.join(f.pageDir, 'plain.png'), Buffer.from([21, 22, 23]));
  await writeFile(path.join(images, 'a(b).png'), Buffer.from([15, 16, 17]));
  await writeFile(path.join(images, 'a&b.png'), Buffer.from([31, 32, 33]));
  await writeFile(path.join(images, 'a#b.png'), Buffer.from([34, 35, 36]));
  await writeFile(path.join(images, 'a)b.png'), Buffer.from([37, 38, 39]));
  await writeFile(path.join(images, 'space image.png'), Buffer.from([44, 45, 46]));
  await writeFile(path.join(images, 'café.png'), Buffer.from([47, 48, 49]));
  await writeFile(path.join(images, 'a&b image.png'), spaced);
  await mkdir(path.join(images, 'nested'), { recursive: true });
  await writeFile(path.join(images, 'nested', 'a(b).png'), Buffer.from([18, 19, 20]));
  await writeFile(path.join(includes, 'same.png'), second);
  await mkdir(path.join(f.root, 'docs-src/src/content/images'), { recursive: true });
  await writeFile(path.join(f.root, 'docs-src/src/content/images/mapped.png'), mapped);
  await mkdir(path.join(f.root, 'docs-src/src/content/images/nested'), { recursive: true });
  await writeFile(path.join(f.root, 'docs-src/src/content/images/nested/x.png'), Buffer.from([41, 42, 43]));
  const source = [
    '---', 'title: Images', '---',
    '![inline](./images/same.png "title")',
    '<img alt="html image" src="./images/same.png?width=2#preview" title="html caption">',
    '<img alt=./images/same.png src=./images/same.png>',
    '<img src=./images/a&amp;b%20image.png>',
    '![shared][asset]', '[ordinary link][asset]', '', '[asset]: ./images/same.png "shared title"',
    '[casl-export-image-1]: https://example.org/wrong.png',
    '![adjacent][adjacent]', '', '[adjacent]: ./plain.png "already local"',
    '`![./images/same.png](./images/same.png)`', '![./images/same.png](./images/same.png)',
    '![mapped](/v7/images/mapped.png?size=2#top)',
    '![./images/same.png](./images/same.png)',
    '![balanced](./images/nested/a(b).png)',
    '![hash](./images/a%23b.png)', '![close](./images/a%29b.png)',
    '![escaped path](./images/a\\(b\\).png)',
    '`![same](./images/same.png)` ![same](./images/same.png)',
    '> ![multi\n> alt](./images/same.png)',
    '> ![multi ref\n> alt][asset]',
    '> ![space\n> alt](<./images/space image.png>)',
    '- ![list\n  continuation](./images/same.png)',
    '', '> [quoted]: ./images/same.png', '> ![quoted][quoted]',
    '', '> [qmulti]:', '>   ./images/same.png', '> ![qmulti][qmulti]',
    '- ![listed][listref]', '', '    [listref]: ./images/same.png',
    '![continued][continued]', '', '[continued]:', '  ./images/same.png',
    '<!-- <img src="./images/missing-comment.png"> -->',
    '<img src="./images/a&amp;b.png?a=1&amp;b=2#top">',
    '<img src="./images/same.png?q=&quot;foo&quot;&amp;r=&apos;bar&apos;">',
    '<img src="./images/caf&eacute;.png">',
    '<img src="./images/same.png"><img src="./images/same.png">',
    '> text <img\n> src="./images/same.png">',
    '> <div>', '> <img src="./images/same.png">', '> </div>',
    '@include: snippets/assets/reference.md',
    '![included reference][from-include]',
    '@include: snippets/assets/body.md',
    '````md', '```', '@include: snippets/assets/fake-image.md', '```', '````',
    '    ![indented code](missing.png)',
    '- list item\n    ![indented list image](./images/list.png)',
    '| Image | Notes |', '| --- | --- |',
    '| ![pipe \\| alt](./images/same.png) | `![code](./images/missing.png)` |',
    '| ![again](./images/same.png) | <img src="./images/same.png"> |',
    '```unclosed fence',
    '\\![escaped](missing.png)',
  ].join('\n') + '\n';
  await writeFile(path.join(f.pageDir, 'en.md'), source);
  await writeFile(path.join(f.root, 'snippets/assets/body.md'), '![included](./same.png)\n');
  await writeFile(path.join(f.root, 'snippets/assets/reference.md'), '\n[from-include]: <./same.png> "include title"\n\n');
  await writeFile(path.join(f.root, 'snippets/assets/fake-image.md'), '![nested fake code](missing.png)\n');
  await writeFile(path.join(images, 'list.png'), Buffer.from([9, 10, 11]));
  await exportMarkdown('/en/sample', f.output, '/v7', routeState, { repoRoot: f.root, pagesRoot: f.pages });
  const result = await readFile(path.join(f.output, 'index.md'), 'utf8');
  assert.match(result, /!\[inline\]\(\.\/same\.png "title"\)/);
  assert.match(result, /<img alt="html image" src="\.\/same\.png\?width=2#preview" title="html caption">/);
  assert.match(result, /<img alt=\.\/images\/same\.png src=\.\/same\.png>/);
  assert.match(result, /<img src=\.\/a%26b%20image\.png>/);
  assert.match(result, /!\[shared\]\[casl-export-image-\d+\]/);
  assert.match(result, /!\[shared\]\[casl-export-image-2\]/);
  assert.match(result, /\[ordinary link\]\[asset\]/);
  assert.match(result, /\[asset\]: \.\/images\/same\.png "shared title"/);
  assert.match(result, /!\[adjacent\]\[adjacent\]/);
  assert.match(result, /\[adjacent\]: \.\/plain\.png "already local"/);
  assert.match(result, /`!\[\.\/images\/same\.png\]\(\.\/images\/same\.png\)`\n!\[\.\/images\/same\.png\]\(\.\/same\.png\)/);
  assert.match(result, /!\[mapped\]\(\.\/mapped\.png\?size=2#top\)/);
  assert.match(result, /!\[\.\/images\/same\.png\]\(\.\/same\.png\)/);
  assert.match(result, /!\[balanced\]\(\.\/a%28b%29\.png\)/);
  assert.match(result, /!\[hash\]\(\.\/a%23b\.png\)/);
  assert.match(result, /!\[close\]\(\.\/a%29b\.png\)/);
  assert.match(result, /!\[escaped path\]\(\.\/a%28b%29-[a-f0-9]{10}\.png\)/);
  assert.match(result, /`!\[same\]\(\.\/images\/same\.png\)` !\[same\]\(\.\/same\.png\)/);
  assert.match(result, /> !\[multi\n> alt\]\(\.\/same\.png\)/);
  assert.match(result, /> !\[multi ref\n> alt\]\[casl-export-image-\d+\]/);
  assert.match(result, /- !\[list\n {2}continuation\]\(\.\/same\.png\)/);
  assert.match(result, /> !\[space\n> alt\]\(<\.\/space%20image\.png>\)/);
  assert.match(result, /> !\[quoted\]\[casl-export-image-\d+\]/);
  assert.match(result, /> !\[qmulti\]\[casl-export-image-\d+\]/);
  assert.match(result, /- !\[listed\]\[casl-export-image-\d+\]/);
  assert.match(result, /!\[continued\]\[casl-export-image-\d+\]/);
  assert.match(result, /<!-- <img src="\.\/images\/missing-comment\.png"> -->/);
  assert.match(result, /<img src="\.\/a%26b\.png\?a=1&amp;b=2#top">/);
  assert.match(result, /<img src="\.\/same\.png\?q=&quot;foo&quot;&amp;r=&#39;bar&#39;">/);
  assert.match(result, /<img src="\.\/caf%C3%A9\.png">/);
  assert.equal((result.match(/<img src="\.\/same\.png"><img src="\.\/same\.png">/g) || []).length, 1);
  assert.match(result, /> src="\.\/same\.png">/);
  assert.match(result, /> <img src="\.\/same\.png">/);
  assert.match(result, /!\[included reference\]\[casl-export-image-\d+\]/);
  const includedName = result.match(/!\[included\]\(\.\/(same-[a-f0-9]{10}\.png)\)/)?.[1];
  assert.ok(includedName);
  assert.match(result, new RegExp(`!\\[included\\]\\(\\.\\/${includedName}\\)`));
  assert.match(result, /```\n!\[nested fake code\]\(missing\.png\)\n```/);
  assert.match(result, /- list item\n {4}!\[indented list image\]\(\.\/list\.png\)/);
  assert.match(result, /\| !\[pipe \\\| alt\]\(\.\/same\.png\) \| `!\[code\]\(\.\/images\/missing\.png\)` \|/);
  assert.match(result, /\| !\[again\]\(\.\/same\.png\) \| <img src="\.\/same\.png"> \|/);
  assert.match(result, / {4}!\[indented code\]\(missing\.png\)/);
  assert.ok(result.indexOf('[casl-export-image-2]:') < result.indexOf('```unclosed fence'));
  assert.match(result, /\[casl-export-image-1\]: https:\/\/example\.org\/wrong\.png/);
  assert.match(result, /\\!\[escaped\]\(missing\.png\)/);
  assert.deepEqual(await readFile(path.join(f.output, 'same.png')), first);
  assert.deepEqual(await readFile(path.join(f.output, 'a&b image.png')), spaced);
  assert.deepEqual(await readFile(path.join(f.output, includedName)), second);
  assert.deepEqual(await readFile(path.join(f.output, 'mapped.png')), mapped);
  assert.deepEqual(await readFile(path.join(f.output, 'list.png')), Buffer.from([9, 10, 11]));
  assert.equal((await readdir(f.output)).filter(name => name.startsWith('same')).length, 2);
});

test('exports images in standalone table cells using exact cell source offsets', async (t) => {
  const f = await fixture(t);
  const imagePath = path.join(f.pageDir, 'images/table-only.png');
  const bytes = Buffer.from([51, 52, 53]);
  await mkdir(path.dirname(imagePath), { recursive: true });
  await writeFile(imagePath, bytes);
  await writeFile(path.join(f.pageDir, 'en.md'), [
    '| Image | Notes |',
    '| --- | --- |',
    '| ![first](./images/table-only.png) | `![fake](./images/missing-table.png)` |',
    '| ![second](./images/table-only.png) | <img src="./images/table-only.png"> |',
    '| ![pipe \\| text](./images/table-only.png) | ordinary |',
    '',
  ].join('\n'));

  await exportMarkdown('/en/sample', f.output, '', routeState, { repoRoot: f.root, pagesRoot: f.pages });
  const result = await readFile(path.join(f.output, 'index.md'), 'utf8');
  assert.match(result, /\| !\[first\]\(\.\/table-only\.png\) \| `!\[fake\]\(\.\/images\/missing-table\.png\)` \|/);
  assert.match(result, /\| !\[second\]\(\.\/table-only\.png\) \| <img src="\.\/table-only\.png"> \|/);
  assert.match(result, /\| !\[pipe \\\| text\]\(\.\/table-only\.png\) \| ordinary \|/);
  assert.deepEqual(await readFile(path.join(f.output, 'table-only.png')), bytes);
});

test('reports include cycles, missing sources and image failures without writing index.md', async (t) => {
  const f = await fixture(t);
  await writeFile(path.join(f.pageDir, 'en.md'), '---\ntitle: Cycle\n---\n@include: a.md\n');
  await writeFile(path.join(f.root, 'a.md'), '@include: b.md\n');
  await writeFile(path.join(f.root, 'b.md'), '@include: a.md\n');
  await assert.rejects(exportMarkdown('/en/sample', f.output, '', routeState, { repoRoot: f.root, pagesRoot: f.pages }), /route \/en\/sample: include cycle/);
  await rm(path.join(f.pageDir, 'en.md'));
  await assert.rejects(exportMarkdown('/en/sample', f.output, '', routeState, { repoRoot: f.root, pagesRoot: f.pages }), /cannot read Markdown source/);
  await writeFile(path.join(f.pageDir, 'en.md'), '![missing](./missing.png)\n');
  await assert.rejects(exportMarkdown('/en/sample', f.output, '', routeState, { repoRoot: f.root, pagesRoot: f.pages }), /image reference/);
  await assert.rejects(readFile(path.join(f.output, 'index.md')));
  await writeFile(path.join(f.pageDir, 'en.md'), '![nested](/v7/images/nested/x.png)\n');
  await assert.rejects(exportMarkdown('/en/sample', f.output, '/v7', routeState, { repoRoot: f.root, pagesRoot: f.pages }), /flat \/images\/ build asset/);
});

test('fails when the Markdown output cannot be written', async (t) => {
  const f = await fixture(t);
  const blocked = path.join(f.root, 'not-a-directory');
  await writeFile(blocked, 'file');
  await writeFile(path.join(f.pageDir, 'en.md'), 'text\n');
  await assert.rejects(exportMarkdown('/en/sample', blocked, '', routeState, { repoRoot: f.root, pagesRoot: f.pages }), /cannot write Markdown output/);
});
