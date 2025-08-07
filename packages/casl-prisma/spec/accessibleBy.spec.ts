import { ForbiddenError } from '@casl/ability'
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

  it('throws `ForbiddenError` if ability does not allow to execute action', () => {
    expect(() => accessibleBy(ability, 'update').Post).toThrow(ForbiddenError as unknown as Error)
  })

  it('wraps inverted rules in `NOT` operator', () => {
    const query = accessibleBy(ability).Post

    expect(query.AND).toEqual([{
      NOT: {
        title: { startsWith: '[WIP]:' }
      }
    }])
  })

  it('wraps regular rules in OR and inverted ones in AND', () => {
    const query = accessibleBy(ability).Post

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
