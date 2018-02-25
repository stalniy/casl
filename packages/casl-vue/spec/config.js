(function(factory) {
  if (typeof window === 'object') {
    window.global = window;
    factory(window.chai, window);
  } else if (typeof require === 'function' && typeof module !== 'undefined') {
    require('chai').use(require('chai-spies'));
    factory(require('chai'), global);
  }
})(function(chai, global) {
  global.expect = chai.expect;
  global.spy = chai.spy;
});
