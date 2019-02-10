(function (factory) {
  if (typeof require === 'function' && typeof module !== 'undefined') {
    require('chai').use(require('chai-spies')); // eslint-disable-line
    factory(require('chai'), global); // eslint-disable-line
  } else if (typeof window === 'object') {
    window.global = window; // eslint-disable-line
    factory(window.chai, window); // eslint-disable-line
  }
}((chai, global) => {
  global.expect = chai.expect;
  global.spy = chai.spy;
}));
