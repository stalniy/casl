import chai from 'chai'
import spies from 'chai-spies'

chai.use(spies)

chai.Assertion.addMethod('allow', function(action, subject, field) {
  const subjectRepresantation = prettifyObject(subject)
  this.assert(
    this._obj.can(action, subject, field),
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

export class Post {
  constructor(attrs) {
    Object.assign(this, attrs)
  }
}
