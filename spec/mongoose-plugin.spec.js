const { AbilityBuilder, Ability, mongoosePlugin, toMongoQuery } = require('../dist/umd')

class PostQuery {
  static get modelName() {
    return 'Post'
  }

  find() {
    this.op = 'find'
    return this
  }

  findOne() {
    this.op = 'findOne'
    return this
  }

  exec() {
    return Promise.resolve(this.op === 'find' ? [] : null)
  }
}

describe('Mongoose Plugin', () => {
  let schema
  let ability

  beforeEach(() => {
    const infterface =
    schema = mongoosePlugin({
      statics: new PostQuery(),
      query: new PostQuery()
    })
  })

  it('injects `accessibleBy` static method', () => {
    expect(schema.statics.accessibleBy).to.be.a('function')
  })

  it('injects `accessibleBy` query method', () => {
    expect(schema.query.accessibleBy).to.be.a('function')
    expect(schema.query.accessibleBy).to.equal(schema.statics.accessibleBy)
  })

  it('creates query which returns empty array or null for ability which does not have rules for specified action', async () => {
    const query = schema.query.accessibleBy(new Ability())
    const [items, item] = await Promise.all([query.exec(), query.findOne().exec()])

    expect(items).to.be.an('array').that.is.empty
    expect(item).not.to.exist
  })

  describe('`accessibleBy` infterface', () => {
    beforeEach(() => {
      ability = AbilityBuilder.define(can => {
        can('read', 'Post', { state: 'draft' })
        can('update', 'Post', { state: 'published' })
      })

      spy.on(ability, 'rulesFor')
    })

    it('creates query from ability and `read` action by default', () => {
      schema.query.accessibleBy(ability)
      expect(ability.rulesFor).to.have.been.called.with.exactly('read', schema.query)
    })

    it('creates query from ability and specified action', () => {
      schema.query.accessibleBy(ability, 'delete')
      expect(ability.rulesFor).to.have.been.called.with.exactly('delete', schema.query)
    })

    it('calls `find` method of the query', () => {
      spy.on(schema.query, 'find')
      schema.query.accessibleBy(ability)

      expect(schema.query.find).to.be.called()
    })

    it('passes query created by `toMongoQuery` in `find` method of the query', () => {
      const query = toMongoQuery(ability.rulesFor('read', 'Post'))
      spy.on(schema.query, 'find')
      schema.query.accessibleBy(ability)

      expect(schema.query.find).to.be.called.with.exactly(query)
    })
  })
})
