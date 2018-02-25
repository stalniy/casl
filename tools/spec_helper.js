(function(factory) {
  if (typeof require === 'function' && typeof module !== 'undefined') {
    require('chai').use(require('chai-spies'));
    factory(require('chai'), global);
  } else if (typeof window === 'object') {
    window.global = window;
    factory(window.chai, window);
  }
})(function(chai, global) {
  global.expect = chai.expect;
  global.spy = chai.spy;
  chai.Assertion.addMethod('allow', function(action, subject) {
    const subjectRepresantation = prettifyObject(subject)
    this.assert(
      this._obj.can(action, subject),
      `expected ability to allow ${action} on ${subjectRepresantation}`,
      `expected ability to not allow ${action} on ${subjectRepresantation}`
    );
  });

  function prettifyObject(object) {
    if (!object || typeof object === 'string') {
      return object;
    }

    if (typeof object === 'function') {
      return object.name;
    }

    const attrs = JSON.stringify(object);
    return `${object.constructor.name} { ${attrs[0] === '{' ? attrs.slice(1, -1) : attrs} }`
  }
});
