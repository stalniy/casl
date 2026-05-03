import { ForbiddenError, Ability, SubjectType } from '../src'

describe('`ForbiddenError` class', () => {
  describe('`throwUnlessCan` method', () => {
    it('raises forbidden exception on disallowed action', () => {
      const { error } = setup()
      expect(() => error.throwUnlessCan('archive', 'Post')).toThrow(ForbiddenError as unknown as Error)
    })

    it('does not raise forbidden exception on allowed action', () => {
      const { error } = setup()
      expect(() => error.throwUnlessCan('read', 'Post')).not.toThrow(ForbiddenError as unknown as Error)
    })

    it('raises error with context information', () => {
      let thrownError: ForbiddenError<Ability> | undefined
      const { error } = setup()

      try {
        error.throwUnlessCan('archive', 'Post')
      } catch (abilityError) {
        thrownError = abilityError as ForbiddenError<Ability>
      }

      expect(thrownError!.action).toBe('archive')
      expect(thrownError!.subject).toBe('Post')
      expect(thrownError!.subjectType).toBe('Post')
    })

    it('raises error with message provided in `reason` field of forbidden rule', () => {
      const NO_CARD_MESSAGE = 'No credit card provided'
      const { ability, error } = setup()

      ability.update([{
        action: 'update',
        subject: 'Post',
        inverted: true,
        reason: NO_CARD_MESSAGE
      }])

      expect(() => error.throwUnlessCan('update', 'Post')).toThrow(NO_CARD_MESSAGE)
    })

    it('can raise error with custom message', () => {
      const message = 'My custom error message'
      const { error } = setup()

      expect(() => error.setMessage(message).throwUnlessCan('update', 'Post')).toThrow(message)
    })

    it('correctly extracts subject type name from class subject types', () => {
      class Post {}

      const ability = new Ability([
        { action: 'read', subject: Post }
      ], {
        detectSubjectType: o => o.constructor as SubjectType
      })

      try {
        ForbiddenError.from(ability).throwUnlessCan('update', Post)
        expect('this code').toBe('never reached')
      } catch (error) {
        expect((error as ForbiddenError<Ability>).subjectType).toBe('Post')
        expect((error as ForbiddenError<Ability>).message).toBe('Cannot execute "update" on "Post"')
      }
    })
  })

  describe('`setDefaultMessage` method', () => {
    afterEach(() => {
      ForbiddenError.setDefaultMessage(ForbiddenError._defaultErrorMessage)
    })

    it('sets default message from function', () => {
      ForbiddenError.setDefaultMessage(err => `errror -> ${err.action}-${err.subjectType}`)
      const { error } = setup()

      expect(() => error.throwUnlessCan('update', 'Post')).toThrow('errror -> update-Post')
    })
  })

  function setup() {
    const ability = new Ability([
      { action: 'read', subject: 'Post' }
    ])
    const error = ForbiddenError.from(ability)

    return { ability, error }
  }
})
