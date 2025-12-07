import { AbilityBuilder, PureAbility, AbilityClass } from '../src'

/**
 * This test verifies the claim-based authorization example from the documentation
 * at docs-src/src/content/pages/cookbook/claim-authorization/en.md
 */
describe('Cookbook: Claim-based Authorization', () => {
  it('should work as documented in the cookbook', () => {
    type Actions = 'review' | 'publish' | 'read'
    type AppAbility = PureAbility<Actions>

    const ClaimAbility = PureAbility as AbilityClass<AppAbility>
    const { can, build } = new AbilityBuilder(ClaimAbility)

    can('review')
    can('publish')
    can('read')

    const ability = build()

    function publishArticle(article: object, ability: AppAbility) {
      if (ability.cannot('publish')) {
        throw new Error('You cannot publish articles')
      }

      // logic to publish article
      return 'Article published'
    }

    // Verify the ability checks work correctly
    expect(ability.can('review')).toBe(true)
    expect(ability.can('publish')).toBe(true)
    expect(ability.can('read')).toBe(true)
    expect(ability.cannot('publish')).toBe(false)

    // Verify the function works
    expect(publishArticle({}, ability)).toBe('Article published')

    // Verify that an action not granted is forbidden
    expect(ability.can('delete' as any)).toBe(false)
  })

  it('should prevent actions that are not granted', () => {
    type Actions = 'review' | 'publish' | 'read'
    type AppAbility = PureAbility<Actions>

    const ClaimAbility = PureAbility as AbilityClass<AppAbility>
    const { can, build } = new AbilityBuilder(ClaimAbility)

    // Only grant 'read' permission
    can('read')

    const ability = build()

    function publishArticle(article: object, ability: AppAbility) {
      if (ability.cannot('publish')) {
        throw new Error('You cannot publish articles')
      }
      return 'Article published'
    }

    // Should be able to read but not publish
    expect(ability.can('read')).toBe(true)
    expect(ability.cannot('publish')).toBe(true)

    // Should throw error when trying to publish
    expect(() => publishArticle({}, ability)).toThrow('You cannot publish articles')
  })
})
