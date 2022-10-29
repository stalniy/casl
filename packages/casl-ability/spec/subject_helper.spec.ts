import { subject, detectSubjectType } from '../src'

describe('`subject` helper', () => {
  it('defines subject type for an object', () => {
    const object = subject('Article', {})
    expect(detectSubjectType(object)).toBe('Article')
  })

  it('throws exception when trying to redefine subject type', () => {
    const object = subject('Article', {})
    expect(() => subject('User', object)).toThrow(Error)
  })

  it('does not throw if subject type of an object equals to provided subject type', () => {
    const object = subject('Article', {})
    expect(() => subject('Article', object)).not.toThrow(Error)
  })

  it('ignores falsy subjects', () => {
    // @ts-expect-error
    expect(() => subject('Test', null)).not.toThrow(Error)
    // @ts-expect-error
    expect(() => subject('Test', undefined)).not.toThrow(Error)
  })
})
