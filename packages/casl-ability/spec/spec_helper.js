import chai from 'chai'
import spies from 'chai-spies'
import '@casl/dx/lib/spec_helper'

chai.use(spies)

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
