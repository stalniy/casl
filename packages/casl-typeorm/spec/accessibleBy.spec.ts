import { ForbiddenError } from '@casl/ability'
import { Not } from 'typeorm'
import { accessibleBy, createTypeormAbility } from '../src'
import { AppAbility } from './AppAbility'

describe('accessibleBy', () => {
  const ability = createTypeormAbility<AppAbility>([
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
        status: 'draft'
      }
    }
  ])

  it('throws `ForbiddenError` if ability does not allow to execute action', () => {
    expect(() => accessibleBy(ability, 'update').Post).toThrow(ForbiddenError as unknown as Error)
  })

  it('converts non-inverted rules to TypeORM FindOptionsWhere', () => {
    const where = accessibleBy(ability).Post

    expect(where).toEqual(expect.objectContaining({
      id: 1
    }))
  })

  it('wraps inverted rule field values with TypeORM Not()', () => {
    const where = accessibleBy(ability).Post as Record<string, any>

    expect(where.status).toEqual(Not('draft'))
  })

  it('returns single object when there is one OR and one AND condition', () => {
    const where = accessibleBy(ability).Post

    expect(where).toEqual({
      id: 1,
      status: Not('draft'),
    })
  })

  it('returns array when there are multiple OR conditions', () => {
    const multiAbility = createTypeormAbility<AppAbility>([
      {
        action: 'read',
        subject: 'Post',
        conditions: { id: 1 }
      },
      {
        action: 'read',
        subject: 'Post',
        conditions: { status: 'published' }
      }
    ])

    const where = accessibleBy(multiAbility).Post

    expect(where).toEqual(expect.arrayContaining([
      { id: 1 },
      { status: 'published' }
    ]))
  })

  it('distributes AND conditions across OR conditions', () => {
    const multiAbility = createTypeormAbility<AppAbility>([
      {
        action: 'read',
        subject: 'Post',
        conditions: { id: 1 }
      },
      {
        action: 'read',
        subject: 'Post',
        conditions: { authorId: 2 }
      },
      {
        inverted: true,
        action: 'read',
        subject: 'Post',
        conditions: { status: 'draft' }
      }
    ])

    const where = accessibleBy(multiAbility).Post as Record<string, any>[]

    expect(where).toHaveLength(2)
    expect(where).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 1, status: Not('draft') }),
      expect.objectContaining({ authorId: 2, status: Not('draft') })
    ]))
  })

  it('handles ability with no conditions (unconditional allow)', () => {
    const unconditionalAbility = createTypeormAbility<AppAbility>([
      {
        action: 'read',
        subject: 'Post'
      }
    ])

    const where = accessibleBy(unconditionalAbility).Post

    expect(where).toEqual({})
  })
})
