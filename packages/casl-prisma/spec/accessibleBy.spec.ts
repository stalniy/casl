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

  it('bounds allowed branches with inverted rules wrapped in `NOT`', () => {
    const query = accessibleBy(ability).ofType('Post')

    expect(query.OR).toEqual([{
      AND: [{
        id: 1
      }, {
        NOT: {
          title: { startsWith: '[WIP]:' }
        }
      }]
    }])
  })

  it('wraps all accessible branches in `OR`', () => {
    const query = accessibleBy(ability).ofType('Post')

    expect(query).toEqual({
      OR: [
        {
          AND: [
            {
              id: 1
            },
            {
              NOT: {
                title: { startsWith: '[WIP]:' }
              }
            }
          ]
        }
      ]
    })
  })
})
