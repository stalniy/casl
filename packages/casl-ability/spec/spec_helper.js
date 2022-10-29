import chai from 'chai'
import spies from 'chai-spies'
import '../../dx/lib/spec_helper';

chai.use(spies)

chai.Assertion.addMethod('allow', function assertAbility(action, subject, field) {
  const subjectRepresantation = prettifyObject(subject)
  this.assert(
    this._obj.can(action, subject, field),
    `expected ability to allow ${action} on ${subjectRepresantation}`,
    `expected ability to not allow ${action} on ${subjectRepresantation}`
  )
})

function prettifyObject(object) {
  if (!object || typeof object === 'string') {
    return object
  }

  if (typeof object === 'function') {
    return object.name
  }

  const attrs = JSON.stringify(object)
  return `${object.constructor.name} { ${attrs[0] === '{' ? attrs.slice(1, -1) : attrs} }`
}

export class Post {
  constructor(attrs) {
    Object.assign(this, attrs)
  }
}

export function ruleToObject(rule) {
  const fields = ['action', 'subject', 'conditions', 'fields', 'inverted', 'reason']
  return fields.reduce((object, field) => {
    if (rule[field]) {
      object[field] = rule[field]
    }
    return object
  }, {})
}
