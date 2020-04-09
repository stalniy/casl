import { Ability, ForbiddenError, getDefaultErrorMessage } from '../src'

describe('`ForbiddenError` class', () => {
  let ability
  let error

  beforeEach(() => {
    ability = new Ability([
      { action: 'read', subject: 'Post' }
    ])
    error = ForbiddenError.from(ability)
  })

  describe('`throwUnlessCan` method', () => {
    it('raises forbidden exception on disallowed action', () => {
      expect(() => error.throwUnlessCan('archive', 'Post')).to.throw(ForbiddenError)
    })

    it('does not raise forbidden exception on allowed action', () => {
      expect(() => ability.throwUnlessCan('read', 'Post')).not.to.throw(ForbiddenError)
    })

    it('raises error with context information', () => {
      let thrownError = new Error('No error raised')

      try {
        error.throwUnlessCan('archive', 'Post')
      } catch (abilityError) {
        thrownError = abilityError
      }

      expect(thrownError).to.have.property('action').that.equal('archive')
      expect(thrownError).to.have.property('subject').that.equal('Post')
      expect(thrownError).to.have.property('subjectType').that.equal('Post')
    })

    it('raises error with message provided in `reason` field of forbidden rule', () => {
      const NO_CARD_MESSAGE = 'No credit card provided'
      ability.update([{
        action: 'update',
        subject: 'Post',
        inverted: true,
        reason: NO_CARD_MESSAGE
      }])

      expect(() => error.throwUnlessCan('update', 'Post')).to.throw(NO_CARD_MESSAGE)
    })

    it('can raise error with custom message', () => {
      const message = 'My custom error message'
      expect(() => error.setMessage(message).throwUnlessCan('update', 'Post')).to.throw(message)
    })
  })

  describe('`setDefaultMessage` method', () => {
    afterEach(() => {
      ForbiddenError.setDefaultMessage(getDefaultErrorMessage)
    })

    it('sets default message from function', () => {
      ForbiddenError.setDefaultMessage(err => `${err.action}-${err.subjectType}`)
      expect(() => error.throwUnlessCan('update', 'Post')).to.throw('update-Post')
    })
  })
})
