import { ForcedSubject } from '@casl/ability/src'
import { Prisma } from '@prisma/client'
import { addModelType } from '../dist/es6c'

describe('addModelType', () => {
  it('does nothing if `model` is not defined in params', async () => {
    const result = await run({}, async () => ({}))
    expect(result.__caslSubjectType__).toBeUndefined()
  })

  it('adds model type to single object', async () => {
    const result = await run({ model: 'User' }, async () => ({}))
    expect(result.__caslSubjectType__).toEqual('User')
  })

  it('adds model type to multiple objects', async () => {
    const result = await run({ model: 'User' }, async () => ([{}, {}]))
    expect(
      result.every((item: ForcedSubject<'User'>) => item.__caslSubjectType__ === 'User')
    ).toBe(true)
  })

  async function run(
    params: Pick<Prisma.MiddlewareParams, 'model'>,
    next: () => Promise<any>
  ) {
    return addModelType({
      ...params,
      action: 'findFirst',
      args: [],
      dataPath: ['path'],
      runInTransaction: false,
    }, next)
  }
})
