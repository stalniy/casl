import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import xyamlParser from 'xyaml-webpack-loader/parser.js';

const repoRoot = path.resolve(import.meta.dirname, '../..');
const pagesRoot = path.join(import.meta.dirname, '../src/content/pages');
const includePattern = /@include:(\s+[\w._/-]+)/g;
const markdown = xyamlParser.getOrCreateMdParser({
  use: { 'markdown-it-headinganchor': false, 'markdown-it-attrs': false },
});
const tableRule = markdown.block.ruler.getRules('').find(rule => rule.name === 'table');
markdown.block.ruler.at('table', function captureTableCellSources(state, startLine, endLine, silent) {
  const tokenStart = state.tokens.length;
  const matched = tableRule(state, startLine, endLine, silent);
  if (!matched || silent) return matched;
  const rows = [startLine];
  for (let line = startLine + 2; line < state.line; line += 1) rows.push(line);
  const inlineTokens = state.tokens.slice(tokenStart).filter(token => token.type === 'inline');
  const columnCount = tableCellRanges(state.src.slice(state.bMarks[startLine] + state.tShift[startLine], state.eMarks[startLine]).trim()).length;
  let tokenIndex = 0;
  for (const line of rows) {
    const lineStart = state.bMarks[line] + state.tShift[line];
    const lineEnd = state.eMarks[line];
    const text = state.src.slice(lineStart, lineEnd).trim();
    const leading = state.src.slice(lineStart, lineEnd).indexOf(text);
    const ranges = tableCellRanges(text);
    for (let column = 0; column < columnCount; column += 1) {
      const token = inlineTokens[tokenIndex++];
      if (!token) continue;
      const range = ranges[column];
      const positions = range ? range.positions.map(position => lineStart + leading + position) : [lineStart + leading + text.length];
      token.meta = { ...(token.meta || {}), sourceMap: positions };
    }
  }
  return matched;
});
const referenceRule = markdown.block.ruler.getRules('').find(rule => rule.name === 'reference');
markdown.block.ruler.at('reference', function captureReferenceSource(state, startLine, endLine, silent) {
  const previous = new Set(Object.keys(state.env.references || {}));
  const definitionOffset = state.bMarks[startLine] + state.tShift[startLine];
  const matched = referenceRule(state, startLine, endLine, silent);
  if (matched && !silent) {
    const definitions = state.env.markdownExportReferences || (state.env.markdownExportReferences = new Map());
    for (const [label, definition] of Object.entries(state.env.references || {})) {
      if (!previous.has(label)) definitions.set(label, { ...definition, definitionOffset });
    }
  }
  return matched;
});

function tableCellRanges(text) {
  const ranges = [];
  let start = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] !== '|') continue;
    let backslashes = 0;
    for (let cursor = index - 1; cursor >= 0 && text[cursor] === '\\'; cursor -= 1) backslashes += 1;
    if (backslashes % 2 === 0) {
      ranges.push([start, index]);
      start = index + 1;
    }
  }
  ranges.push([start, text.length]);
  if (ranges.length && !text.slice(...ranges[0]).trim()) ranges.shift();
  if (ranges.length && !text.slice(...ranges.at(-1)).trim()) ranges.pop();
  return ranges.map(([from, to]) => {
    while (from < to && /\s/.test(text[from])) from += 1;
    while (to > from && /\s/.test(text[to - 1])) to -= 1;
    let value = '';
    const positions = [];
    for (let index = from; index < to; index += 1) {
      if (text[index] === '\\' && text[index + 1] === '|') index += 1;
      value += text[index];
      positions.push(index);
    }
    positions.push(to);
    return { value, positions };
  });
}
const imageRule = markdown.inline.ruler.getRules('').find(rule => rule.name === 'image');
markdown.inline.ruler.at('image', function captureImageSource(state, silent) {
  const start = state.pos;
  const tokenIndex = state.tokens.length;
  const matched = imageRule(state, silent);
  if (matched && !silent) {
    for (const token of state.tokens.slice(tokenIndex)) {
      if (token.type === 'image') {
        token.meta = { ...(token.meta || {}), sourceSpan: [start, state.pos], sourceText: state.src.slice(start, state.pos) };
      }
    }
  }
  return matched;
});
const htmlInlineRule = markdown.inline.ruler.getRules('').find(rule => rule.name === 'html_inline');
markdown.inline.ruler.at('html_inline', function captureHtmlSource(state, silent) {
  const start = state.pos;
  const tokenIndex = state.tokens.length;
  const matched = htmlInlineRule(state, silent);
  if (matched && !silent) {
    for (const token of state.tokens.slice(tokenIndex)) {
      if (token.type === 'html_inline') {
        token.meta = { ...(token.meta || {}), sourceSpan: [start, state.pos] };
      }
    }
  }
  return matched;
});

function pageIdentity(url, routeState) {
  if (routeState?.routeName === 'home') return null;
  const params = routeState?.routeParams;
  if (params?.lang && params?.id) {
    return { locale: params.lang, id: routeState.routeName === 'api' ? `api/${params.id}` : params.id };
  }
  if (params?.lang && routeState?.routeName === 'support') return { locale: params.lang, id: 'support-casljs' };
  const parts = new URL(url, 'http://localhost').pathname.split('/').filter(Boolean);
  if (parts.length < 2) return null;
  const [locale, ...routeParts] = parts;
  const id = routeParts.join('/');
  return id ? { locale, id } : null;
}

function splitFrontMatter(source) {
  const match = source.match(/^(---[^\n]*\r?\n[\s\S]*?\r?\n---(?:\r?\n)?)/);
  return match ? [match[1], source.slice(match[1].length)] : ['', source];
}

function makeSegment(text, origin) {
  return text ? { text, origin } : null;
}

function joinSegments(segments) {
  return segments.map(segment => segment.text).join('');
}

function trimOneTerminalLF(segments) {
  const result = segments.slice();
  for (let index = result.length - 1; index >= 0; index -= 1) {
    const segment = result[index];
    if (!segment.text) continue;
    if (segment.text.endsWith('\n')) {
      const trimmed = makeSegment(segment.text.slice(0, -1), segment.origin);
      if (trimmed) result[index] = trimmed;
      else result.splice(index, 1);
    }
    break;
  }
  return result;
}

async function expandIncludes(source, origin, route, stack, repositoryRoot) {
  const segments = [];
  let cursor = 0;
  includePattern.lastIndex = 0;
  for (const match of source.matchAll(includePattern)) {
    const before = makeSegment(source.slice(cursor, match.index), origin);
    if (before) segments.push(before);
    const requested = match[1].trim();
    const target = path.resolve(stack.length > 1 ? path.dirname(origin) : repositoryRoot, requested);
    if (stack.includes(target)) {
      throw new Error(`route ${route}: include cycle: ${[...stack, target].join(' -> ')}`);
    }
    let included;
    try {
      included = await fs.readFile(target, 'utf8');
    } catch (error) {
      throw new Error(`route ${route}: cannot read included file ${target}: ${error.message}`, { cause: error });
    }
    const nested = await expandIncludes(included, target, route, [...stack, target], repositoryRoot);
    segments.push(...trimOneTerminalLF(nested));
    cursor = match.index + match[0].length;
  }
  const after = makeSegment(source.slice(cursor), origin);
  if (after) segments.push(after);
  return segments;
}

function lineStarts(source) {
  const offsets = [0];
  for (let index = 0; index < source.length; index += 1) {
    if (source[index] === '\n') offsets.push(index + 1);
  }
  return offsets;
}

function originAt(segments, offset) {
  let position = 0;
  for (const segment of segments) {
    const end = position + segment.text.length;
    if (offset < end) return segment.origin;
    position = end;
  }
  return segments.at(-1)?.origin;
}

function normalizeWithOffsets(source) {
  let normalized = '';
  const rawOffsets = [];
  for (let index = 0; index < source.length; index += 1) {
    if (source[index] === '\r') {
      rawOffsets.push(index);
      normalized += '\n';
      if (source[index + 1] === '\n') index += 1;
    } else {
      rawOffsets.push(index);
      normalized += source[index];
    }
  }
  rawOffsets.push(source.length);
  return { normalized, rawOffsets };
}

function findInlineImageOffset(source, starts, blockToken, inlineToken, imageToken) {
  const metaStart = imageToken.meta?.sourceSpan?.[0];
  if (metaStart === undefined) return -1;
  return mapInlineOffset(source, starts, blockToken, inlineToken, metaStart);
}

function mapInlineOffset(source, starts, blockToken, inlineToken, localOffset) {
  if (inlineToken.meta?.sourceMap) return inlineToken.meta.sourceMap[localOffset] ?? -1;
  return mapContentOffset(source, starts, inlineToken.content, (blockToken.map || [0])[0], localOffset);
}

function mapContentOffset(source, starts, content, startLine, localOffset) {
  const localBefore = content.slice(0, localOffset);
  const relativeLine = (localBefore.match(/\n/g) || []).length;
  const lineNumber = startLine + relativeLine;
  const lineStart = starts[lineNumber];
  if (lineStart === undefined) return -1;
  const contentLine = content.split('\n')[relativeLine] || '';
  const sourceLine = source.slice(lineStart, starts[lineNumber + 1] ?? source.length).replace(/\n$/, '');
  const contentStart = sourceLine.indexOf(contentLine);
  if (contentStart < 0) return -1;
  const column = localOffset - (localBefore.lastIndexOf('\n') + 1);
  return lineStart + contentStart + column;
}

function stripBlockquotePrefixes(content) {
  let cleaned = '';
  const offsets = [];
  let cursor = 0;
  for (const line of content.matchAll(/[^\n]*(?:\n|$)/g)) {
    if (!line[0]) continue;
    const prefixLength = (line[0].match(/^[ \t]{0,3}>[ \t]?/) || [''])[0].length;
    for (let index = prefixLength; index < line[0].length; index += 1) {
      cleaned += line[0][index];
      offsets.push(cursor + index);
    }
    cursor += line[0].length;
  }
  offsets.push(content.length);
  return { cleaned, offsets };
}

function findSourceText(source, start, end, value, after = start) {
  const index = source.indexOf(value, Math.max(start, after));
  return index >= start && index + value.length <= end ? index : -1;
}

function normalizeReference(label) {
  return label.trim().replace(/\s+/g, ' ').toUpperCase();
}

function capturedReferenceMap(captured, segments, rawOffsets) {
  return new Map(Array.from(captured || [], ([label, definition]) => [label, {
    destination: definition.href,
    normalized: definition.href,
    title: definition.title || '',
    origin: originAt(segments, rawOffsets[definition.definitionOffset]),
  }]));
}


function decodeEntities(value) {
  return markdown.utils.unescapeAll(value);
}

function splitDestination(destination) {
  const index = destination.search(/[?#]/);
  const pathPart = index === -1 ? destination : destination.slice(0, index);
  const suffix = index === -1 ? '' : destination.slice(index);
  return { path: pathPart, suffix };
}

function decodePath(value) {
  let decoded;
  try { decoded = decodeURIComponent(value); } catch { decoded = value; }
  return decoded;
}

function escapeHtmlAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function localDestination(value) {
  const stripped = value.startsWith('<') && value.endsWith('>') ? value.slice(1, -1) : value;
  const decoded = decodeEntities(stripped);
  const decodedParts = splitDestination(decoded);
  return {
    ...decodedParts,
    sourceSuffix: decodedParts.suffix,
    path: decodePath(decodedParts.path),
    original: value,
  };
}

function htmlImageTags(source) {
  const found = [];
  const comments = Array.from(source.matchAll(/<!--[\s\S]*?-->/g), match => [match.index, match.index + match[0].length]);
  const tagStart = /<img\b/gi;
  for (const startMatch of source.matchAll(tagStart)) {
    const start = startMatch.index;
    if (comments.some(([from, to]) => start >= from && start < to)) continue;
    let quote = '';
    let end = start + startMatch[0].length;
    for (; end < source.length; end += 1) {
      const char = source[end];
      if (quote) {
        if (char === quote) quote = '';
      } else if (char === '"' || char === "'") quote = char;
      else if (char === '>') break;
    }
    if (end >= source.length) continue;
    const tag = source.slice(start, end + 1);
    const attributes = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    let attribute;
    while ((attribute = attributes.exec(tag))) {
      if (attribute[1].toLowerCase() !== 'src') continue;
      const valueGroup = attribute[2] !== undefined ? 2 : attribute[3] !== undefined ? 3 : attribute[4] !== undefined ? 4 : -1;
      if (valueGroup === -1) continue;
      const value = attribute[valueGroup];
      const valueOffset = start + attribute.index + attribute[0].indexOf(value);
      found.push({ start, valueStart: valueOffset, end: valueOffset + value.length, destination: value, html: true });
      break;
    }
  }
  return found;
}

function parseInlineDestination(sourceText) {
  let pos = 2;
  let depth = 0;
  let escaped = false;
  let labelClose = -1;
  for (; pos < sourceText.length; pos += 1) {
    const char = sourceText[pos];
    if (escaped) { escaped = false; continue; }
    if (char === '\\') { escaped = true; continue; }
    if (char === '[') depth += 1;
    if (char === ']') {
      if (!depth) { labelClose = pos; break; }
      depth -= 1;
    }
  }
  if (labelClose < 0) return null;
  pos = labelClose + 1;
  if (sourceText[pos] !== '(') return { reference: true, labelClose };
  pos += 1;
  while (/\s/.test(sourceText[pos] || '')) pos += 1;
  if (sourceText[pos] === '<') {
    const end = sourceText.indexOf('>', pos + 1);
    return end < 0 ? null : { start: pos + 1, end, angle: true, labelClose };
  }
  const start = pos;
  depth = 0;
  escaped = false;
  for (; pos < sourceText.length; pos += 1) {
    const char = sourceText[pos];
    if (escaped) { escaped = false; continue; }
    if (char === '\\') { escaped = true; continue; }
    if (char === '(') depth += 1;
    else if (char === ')') {
      if (!depth) break;
      depth -= 1;
    } else if (/\s/.test(char) && !depth) break;
  }
  return { start, end: pos, angle: false, labelClose };
}

function referenceLabel(sourceText, labelClose) {
  if (sourceText[labelClose + 1] === '[') {
    const close = sourceText.indexOf(']', labelClose + 2);
    const label = close === -1 ? '' : sourceText.slice(labelClose + 2, close);
    if (label) return label;
  }
  return sourceText.slice(2, labelClose);
}

function addPatch(patches, start, end, value) {
  patches.push({ start, end, value });
}

function encodeMarkdownSegment(value) {
  return encodeURIComponent(value).replace(/[!'()*]/g, char => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
}

async function exportImages(body, segments, route, outputDirectory, basePath, root) {
  const { normalized, rawOffsets } = normalizeWithOffsets(body);
  const env = {};
  const tokens = markdown.parse(normalized, env);
  const starts = lineStarts(normalized);
  const references = capturedReferenceMap(env.markdownExportReferences, segments, rawOffsets);
  const patches = [];
  const copied = new Map();
  const usedNames = new Map();
  const context = {
    segments, route, outputDirectory, basePath, root, copied, usedNames, patches, rawOffsets, starts, normalized,
    referenceDefinitions: [],
    usedReferenceLabels: new Set(Object.keys(env.references || {}).map(normalizeReference)),
  };
  const addMarkdownImage = async (token, inlineToken, normalizedStart, normalizedEnd) => {
    const syntax = token.meta?.sourceText;
    if (!syntax) return;
    const sourceSpan = token.meta.sourceSpan;
    const absoluteStart = rawOffsets[mapInlineOffset(normalized, starts, inlineToken, inlineToken, sourceSpan[0])];
    const absoluteEnd = rawOffsets[mapInlineOffset(normalized, starts, inlineToken, inlineToken, sourceSpan[1])];
    const parsed = parseInlineDestination(syntax);
    let rawDestination;
    let destinationOrigin;
    let destinationStart;
    let destinationEnd;
    let refLabel;
    let refDefinition;
    if (parsed?.reference) {
      refLabel = normalizeReference(referenceLabel(syntax, parsed.labelClose));
      refDefinition = references.get(refLabel);
      if (!refDefinition) return;
      rawDestination = refDefinition.destination;
      destinationOrigin = refDefinition.origin;
    } else if (parsed) {
      const localStart = token.meta.sourceSpan[0] + parsed.start;
      const localEnd = token.meta.sourceSpan[0] + parsed.end;
      destinationStart = rawOffsets[mapInlineOffset(normalized, starts, inlineToken, inlineToken, localStart)];
      destinationEnd = rawOffsets[mapInlineOffset(normalized, starts, inlineToken, inlineToken, localEnd)];
      rawDestination = syntax.slice(parsed.start, parsed.end);
      destinationOrigin = originAt(segments, absoluteStart);
    } else return;
    const destination = localDestination(rawDestination);
    if (!destination.path || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(destination.path)) return;
    await copyAndPatch({
      rawDestination,
      destination,
      origin: destinationOrigin,
      token,
      route,
      root,
      outputDirectory,
      basePath,
      copied,
      usedNames,
      patches,
      destinationStart,
      destinationEnd,
      inlineToken,
      reference: Boolean(refDefinition),
      absoluteStart,
      absoluteEnd,
      sourceText: syntax,
      refDefinition,
      referenceDefinitions: context.referenceDefinitions,
      usedReferenceLabels: context.usedReferenceLabels,
      normalized,
      starts,
      rawOffsets,
    });
  };

  for (const token of tokens) {
    if (token.type === 'inline' && token.map) {
      const start = starts[token.map[0]];
      const end = starts[token.map[1]] ?? normalized.length;
      for (const child of token.children || []) {
        if (child.type === 'image') {
          const found = findInlineImageOffset(normalized, starts, token, token, child);
          if (found >= 0) {
            await addMarkdownImage(child, token, found, found + child.meta.sourceText.length);
          }
        }
      }
      const htmlSpans = (token.children || []).filter(child => child.type === 'html_inline' && child.meta?.sourceSpan)
        .map(child => child.meta.sourceSpan);
      for (const image of htmlImageTags(token.content)) {
        if (!htmlSpans.some(([from, to]) => image.start >= from && image.start < to)) continue;
        const valueStart = mapInlineOffset(normalized, starts, token, token, image.valueStart);
        const valueEnd = mapInlineOffset(normalized, starts, token, token, image.end);
        await addHtmlImage(image, valueStart, valueEnd, context);
      }
    } else if (token.type === 'html_block' && token.map) {
      const raw = token.content;
      const { cleaned, offsets } = stripBlockquotePrefixes(raw);
      for (const image of htmlImageTags(cleaned)) {
        const valueStart = mapContentOffset(normalized, starts, raw, token.map[0], offsets[image.valueStart]);
        const valueEnd = mapContentOffset(normalized, starts, raw, token.map[0], offsets[image.end]);
        await addHtmlImage(image, valueStart, valueEnd, context);
      }
    }
  }
  patches.sort((a, b) => b.start - a.start);
  let result = body;
  for (const patch of patches) result = result.slice(0, patch.start) + patch.value + result.slice(patch.end);
  if (context.referenceDefinitions.length) {
    result = `${context.referenceDefinitions.join('\n')}\n\n${result}`;
  }
  return result;
}

async function addHtmlImage(image, normalizedValueStart, normalizedValueEnd, context) {
  const { rawOffsets, segments, route, outputDirectory, basePath, root, copied, usedNames, patches } = context;
  const valueStart = rawOffsets[normalizedValueStart];
  const destination = localDestination(image.destination);
  if (!destination.path || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(destination.path)) return;
  await copyAndPatch({
    rawDestination: image.destination,
    destination,
    origin: originAt(segments, valueStart),
    route,
    root,
    outputDirectory,
    basePath,
    copied,
    usedNames,
    patches,
    destinationStart: valueStart,
    destinationEnd: rawOffsets[normalizedValueEnd],
    html: true,
  });
}

async function copyAndPatch(options) {
  const {
    rawDestination, destination, origin, token, route, root, outputDirectory, basePath,
    copied, usedNames, patches, destinationStart, destinationEnd, html,
  } = options;
  const publicPath = `/${String(basePath).split('/').filter(Boolean).join('/')}`.replace(/^\/$/, '');
  const publicImagePrefix = `${publicPath}/images/`;
  let imagePath;
  if (destination.path.startsWith('/images/') || (publicPath && destination.path.startsWith(publicImagePrefix))) {
    const imagePathPart = destination.path.startsWith('/images/')
      ? destination.path.slice('/images/'.length)
      : destination.path.slice(publicImagePrefix.length);
    if (imagePathPart.includes('/')) {
      throw new Error(`route ${route}: image reference ${rawDestination} does not match a flat /images/ build asset`);
    }
    const basename = imagePathPart;
    const candidates = await findMappedImages(basename, root);
    if (candidates.length !== 1) throw new Error(`route ${route}: image reference ${rawDestination} maps to ${candidates.length} build assets`);
    imagePath = candidates[0];
  } else {
    imagePath = path.resolve(path.dirname(origin), destination.path);
  }
  if (!imagePath.startsWith(`${root}${path.sep}`)) throw new Error(`route ${route}: image reference ${rawDestination} escapes repository`);
  let bytes;
  try { bytes = await fs.readFile(imagePath); } catch (error) {
    throw new Error(`route ${route}: cannot read image reference ${rawDestination} (${imagePath}): ${error.message}`, { cause: error });
  }
  let outputName = copied.get(imagePath);
  if (!outputName) {
    const basename = path.basename(imagePath);
    const prior = usedNames.get(basename);
    const relativeSource = path.relative(root, imagePath).split(path.sep).join('/');
    outputName = prior && prior !== imagePath
      ? `${path.basename(basename, path.extname(basename))}-${createHash('sha256').update(relativeSource).digest('hex').slice(0, 10)}${path.extname(basename)}`
      : basename;
    while (usedNames.has(outputName) && usedNames.get(outputName) !== imagePath) {
      outputName = `${path.basename(outputName, path.extname(outputName))}-${createHash('sha256').update(`${relativeSource}:${outputName}`).digest('hex').slice(0, 10)}${path.extname(outputName)}`;
    }
    usedNames.set(outputName, imagePath);
    copied.set(imagePath, outputName);
    try { await fs.writeFile(path.join(outputDirectory, outputName), bytes, { flag: 'wx' }); } catch (error) {
      if (error.code === 'EEXIST') {
        const existing = await fs.readFile(path.join(outputDirectory, outputName)).catch(() => null);
        if (!existing || !existing.equals(bytes)) throw new Error(`route ${route}: image copy would overwrite another artifact ${outputName}`);
      } else throw new Error(`route ${route}: cannot copy image reference ${rawDestination}: ${error.message}`, { cause: error });
    }
  }
  const currentPath = destination.path;
  const alreadyAdjacent = (currentPath === outputName || currentPath === `./${outputName}`) && destination.path === currentPath;
  if (alreadyAdjacent) return;
  const outputPath = `./${encodeMarkdownSegment(outputName)}${destination.suffix}`;
  if (html) {
    const htmlPath = escapeHtmlAttribute(`./${encodeURIComponent(outputName)}${destination.sourceSuffix}`);
    addPatch(patches, destinationStart, destinationEnd, htmlPath);
    return;
  }
  if (options.reference) {
    let sequence = options.referenceDefinitions.length + 1;
    let id = `casl-export-image-${sequence}`;
    while (options.usedReferenceLabels.has(normalizeReference(id))) {
      sequence += 1;
      id = `casl-export-image-${sequence}`;
    }
    options.usedReferenceLabels.add(normalizeReference(id));
    const span = token.meta.sourceSpan;
    const suffixStart = options.rawOffsets[mapInlineOffset(options.normalized, options.starts, options.inlineToken, options.inlineToken, span[0] + parseInlineDestination(options.sourceText).labelClose + 1)];
    const suffixEnd = options.absoluteEnd;
    addPatch(patches, suffixStart, suffixEnd, `[${id}]`);
    const title = token.attrGet('title');
    const titlePart = title ? ` "${title.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"` : '';
    options.referenceDefinitions.push(`[${id}]: <${outputPath}>${titlePart}`);
    return;
  } else {
    addPatch(patches, destinationStart, destinationEnd, outputPath);
  }
}

export async function exportMarkdown(url, outputDirectory, basePath = '', routeState = null, roots = {}) {
  const root = path.resolve(roots.repoRoot || repoRoot);
  const sourcePages = path.resolve(roots.pagesRoot || path.join(root, 'docs-src/src/content/pages'));
  const identity = pageIdentity(url, routeState);
  if (!identity) {
    if (routeState?.routeName === 'home') return null;
    throw new Error(`route ${url}: cannot map route to a Markdown source identity`);
  }
  const sourcePath = path.resolve(sourcePages, identity.id, `${identity.locale}.md`);
  if (!sourcePath.startsWith(`${sourcePages}${path.sep}`)) throw new Error(`route ${url}: invalid Markdown source identity`);
  let source;
  try { source = await fs.readFile(sourcePath, 'utf8'); } catch (error) {
    throw new Error(`route ${url}: cannot read Markdown source ${sourcePath}: ${error.message}`, { cause: error });
  }
  const [frontMatter, body] = splitFrontMatter(source);
  const expandedSegments = await expandIncludes(body, sourcePath, url, [sourcePath], root);
  const expandedBody = joinSegments(expandedSegments);
  const markdownBody = await exportImages(expandedBody, expandedSegments, url, outputDirectory, basePath, root);
  try { await fs.writeFile(path.join(outputDirectory, 'index.md'), frontMatter + markdownBody); } catch (error) {
    throw new Error(`route ${url}: cannot write Markdown output: ${error.message}`, { cause: error });
  }
  let pathname = new URL(url, 'http://localhost').pathname.replace(/\/+$/, '');
  const prefix = `/${String(basePath).split('/').filter(Boolean).join('/')}`.replace(/^\/$/, '');
  if (prefix && pathname !== prefix && !pathname.startsWith(`${prefix}/`)) pathname = `${prefix}${pathname}`;
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${normalizedPath}/index.md`.replace(/\/+/g, '/');
}

async function findMappedImages(basename, root = repoRoot) {
  const matches = [];
  async function walk(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const candidate = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(candidate);
      else if (entry.name === basename && /\.(png|jpe?g|svg|gif)$/i.test(entry.name)) matches.push(candidate);
    }
  }
  await walk(path.join(root, 'docs-src/src/content'));
  return matches;
}
