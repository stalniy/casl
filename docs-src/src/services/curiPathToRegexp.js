import { pathToRegexp, compile } from 'path-to-regexp';

// Curi uses the v2 API; route patterns and compile options use v9 semantics.
function legacyPathToRegexp(path, keys, options) {
  const result = pathToRegexp(path, options);
  keys.push(...result.keys);
  return result.regexp;
}

legacyPathToRegexp.compile = path =>
  (params, options) => compile(path, options)(params);

export default legacyPathToRegexp;
