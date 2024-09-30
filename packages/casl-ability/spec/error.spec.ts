import { ForbiddenError, getDefaultErrorMessage, PureAbility, SubjectType } from '../src'

describe('`ForbiddenError` class', () => {
  describe('`throwUnlessCan` method', () => {
    it('raises forbidden exception on disallowed action', () => {
      const { error } = setup()
      expect(() => error.throwUnlessCan('archive', 'Post')).toThrow(ForbiddenError as unknown as Error)
    })

    it('does not raise forbidden exception on disallowed action when inverted', () => {
      const { error } = setup()
      expect(() => error.throwUnlessCannot('archive', 'Post')).not.toThrow(ForbiddenError as unknown as Error)
    })

    it('does not raise forbidden exception on allowed action', () => {
      const { error } = setup()
      expect(() => error.throwUnlessCan('read', 'Post')).not.toThrow(ForbiddenError as unknown as Error)
    })

    it('does not produce error on allowed action', () => {
      const { error } = setup()
      expect(error.unlessCan('read', 'Post')).toBeUndefined()
    })

    it('does not produce error on forbidden action when inverted', () => {
      const { error } = setup()
      expect(error.unlessCannot('archive', 'Post')).toBeUndefined()
    })

    it('produces an error on allowed action when inverted', () => {
      const { error } = setup()
      expect(error.unlessCannot('read', 'Post')).not.toBeUndefined()
    })

    it("error is inverted when producing the error via 'unlessCannot'", () => {
      const { error } = setup()
      expect(error.unlessCannot('read', 'Post')?.inverted).toBe(true)
    })

    it("error is not inverted when producing the error via 'unlessCan'", () => {
      const { error } = setup()
      expect(error.unlessCan('archive', 'Post')?.inverted).toBe(false)
    })

    it('produces an error on forbidden action', () => {
      const { error } = setup()
      expect(error.unlessCan('archive', 'Post')).not.toBeUndefined()
    })

    it('raises forbidden exception on allowed action when inverted', () => {
      const { error } = setup()
      expect(() => error.throwUnlessCannot('read', 'Post')).toThrow(ForbiddenError as unknown as Error)
    })

    it('raises error with context information', () => {
      let thrownError: ForbiddenError<PureAbility> | undefined
      const { error } = setup()

      try {
        error.throwUnlessCan('archive', 'Post')
      } catch (abilityError) {
        thrownError = abilityError as ForbiddenError<PureAbility>
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

      const ability = new PureAbility([
        { action: 'read', subject: Post }
      ], {
        detectSubjectType: o => o.constructor as SubjectType
      })

      try {
        ForbiddenError.from(ability).throwUnlessCan('update', Post)
        expect('this code').toBe('never reached')
      } catch (error) {
        expect((error as ForbiddenError<PureAbility>).subjectType).toBe('Post')
        expect((error as ForbiddenError<PureAbility>).message).toBe('Cannot execute "update" on "Post"')
      }
    })
  })

  describe('`setDefaultMessage` method', () => {
    afterEach(() => {
      ForbiddenError.setDefaultMessage(getDefaultErrorMessage)
    })

    it('sets default message from function', () => {
      ForbiddenError.setDefaultMessage(err => `errror -> ${err.action}-${err.subjectType}`)
      const { error } = setup()

      expect(() => error.throwUnlessCan('update', 'Post')).toThrow('errror -> update-Post')
    })
  })

  function setup() {
    const ability = new PureAbility([
      { action: 'read', subject: 'Post' }
    ])
    const error = ForbiddenError.from(ability)

    return { ability, error }
  }
})
