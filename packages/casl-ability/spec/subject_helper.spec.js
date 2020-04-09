import { subject, detectSubjectType } from '../src'

describe('`subject` helper', () => {
  it('defines subject type for an object', () => {
    const object = subject('Article', {})
    expect(detectSubjectType(object)).to.equal('Article')
  })

  it('throws exception when trying to redefine subject type', () => {
    const object = subject('Article', {})
    expect(() => subject('User', object)).to.throw(Error)
  })

  it('does not throw if subject type of an object equals to provided subject type', () => {
    const object = subject('Article', {})
    expect(() => subject('Article', object)).not.to.throw(Error)
  })

  it('ignores falsy subjects', () => {
    expect(() => subject('Test', null)).not.to.throw(Error)
  })
})
