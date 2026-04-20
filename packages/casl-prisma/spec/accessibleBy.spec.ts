import { accessibleBy, createPrismaAbility } from '../src'
import { AppAbility } from './AppAbility'

describe('accessibleBy', () => {
  const ability = createPrismaAbility<AppAbility>([
    {
      action: 'read',
      subject: 'Post',
      conditions: {
        id: 1,
      }
    },
    {
      inverted: true,
      action: 'read',
      subject: 'Post',
      conditions: {
        title: { startsWith: '[WIP]:' }
      }
    }
  ])

  it('registers empty marker if ability does not allow to execute action', () => {
    const query = accessibleBy(ability, 'update').ofType('Post')
    expect(query).toEqual({ OR: [] })
  })

  it('wraps inverted rules in `NOT` operator', () => {
    const query = accessibleBy(ability).ofType('Post')

    expect(query.AND).toEqual([{
      NOT: {
        title: { startsWith: '[WIP]:' }
      }
    }])
  })

  it('wraps regular rules in OR and inverted ones in AND', () => {
    const query = accessibleBy(ability).ofType('Post')

    expect(query).toEqual({
      AND: [{
        NOT: {
          title: { startsWith: '[WIP]:' }
        }
      }],
      OR: [{
        id: 1
      }]
    })
  })
})
