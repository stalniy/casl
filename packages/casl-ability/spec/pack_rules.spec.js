import './spec_helper';
import { packRules, unpackRules } from '../src/extra'

describe('Ability rules packing', () => {
  describe('`packRules` function', () => {
    it('converts array of rule objects to array of rule arrays', () => {
      const rules = packRules([
        { action: 'read', subject: 'Post' },
        { action: 'delete', subject: 'Post' }
      ])

      expect(rules.every(Array.isArray)).to.be.true
    })

    it('puts `actions` as 1st element of rule array', () => {
      const rules = packRules([{ action: 'read', subject: 'Post' }])

      expect(rules[0][0]).to.equal('read')
      expect(rules[0]).to.have.length(2)
    })

    it('joins `actions` with comma if its value is an array', () => {
      const rules = packRules([{ action: ['read', 'update'], subject: 'Post' }])

      expect(rules[0][0]).to.equal('read,update')
      expect(rules[0]).to.have.length(2)
    })

    it('puts `subject` as 2nd element of rule array', () => {
      const rules = packRules([{ action: 'read', subject: 'Post' }])

      expect(rules[0][1]).to.equal('Post')
      expect(rules[0]).to.have.length(2)
    })

    it('puts `subject` with comma if its value is an array', () => {
      const rules = packRules([{ action: 'read', subject: ['Post', 'Comment'] }])

      expect(rules[0][1]).to.equal('Post,Comment')
      expect(rules[0]).to.have.length(2)
    })

    it('puts `conditions` as 3rd element of rule array', () => {
      const conditions = { private: true }
      const rules = packRules([{ action: 'read', subject: 'Post', conditions }])

      expect(rules[0][2]).to.equal(conditions)
      expect(rules[0]).to.have.length(3)
    })

    it('puts `0` in place of `conditions` if they are not defined but `fields` are defined', () => {
      const rules = packRules([{ action: 'read', subject: 'Post', fields: ['title'] }])

      expect(rules[0][2]).to.equal(0)
      expect(rules[0]).to.have.length(5)
    })

    it('converts `inverted` to number and puts it as 4th element of rule array', () => {
      const rules = packRules([{ action: 'read', subject: 'Post', inverted: true }])

      expect(rules[0][3]).to.equal(1)
      expect(rules[0]).to.have.length(4)
    })

    it('joins `fields` and puts it as 5th element of rule array', () => {
      const fields = ['title', 'description']
      const rules = packRules([{ action: 'read', subject: 'Post', fields }])

      expect(rules[0][4]).to.equal(fields.join(','))
      expect(rules[0]).to.have.length(5)
    })

    it('puts `0` in place of `fields` when reason is provided and fields are not', () => {
      const reason = 'forbidden reason'
      const rules = packRules([{ action: 'read', subject: 'Post', reason }])

      expect(rules[0][4]).to.equal(0)
      expect(rules[0]).to.have.length(6)
    })

    it('puts `reason` as 6th element of rule array', () => {
      const reason = 'forbidden reason'
      const rules = packRules([{ action: 'read', subject: 'Post', reason }])

      expect(rules[0][5]).to.equal(reason)
      expect(rules[0]).to.have.length(6)
    })
  })

  describe('`unpackRules` function', () => {
    it('converts array of rule arrays to array of rule objects', () => {
      const rules = unpackRules([
        ['read', 'Post'],
        ['delete', 'Post']
      ])

      expect(rules.every(rule => typeof rule === 'object')).to.be.true
    })

    it('puts 1st element under `actions` field and converts it to an array', () => {
      const rules = unpackRules([['read,update', 'Post']])

      expect(rules[0].action).to.deep.equal(['read', 'update'])
    })

    it('converts even a single `action` to an array', () => {
      const rules = unpackRules([['read', 'Post']])

      expect(rules[0].action).to.deep.equal(['read'])
    })

    it('puts 2nd element under `subject` field and converts it to an array', () => {
      const rules = unpackRules([['read', 'Post,Comment']])

      expect(rules[0].subject).to.deep.equal(['Post', 'Comment'])
    })

    it('converts even a single `subject` to an array', () => {
      const rules = unpackRules([['read', 'Post']])

      expect(rules[0].subject).to.deep.equal(['Post'])
    })

    it('puts 3rd element under `conditions` field', () => {
      const conditions = { private: true }
      const rules = unpackRules([['read', 'Post,Comment', conditions]])

      expect(rules[0].conditions).to.equal(conditions)
    })

    it('converts `conditions` to `undefined` if its value is `0`', () => {
      const rules = unpackRules([['read', 'Post,Comment', 0, 1]])

      expect(rules[0].conditions).to.be.undefined
    })

    it('puts 4th element under `inverted` field and converts it to boolean', () => {
      const rules = unpackRules([['read', 'Post,Comment', 0, 1]])

      expect(rules[0].inverted).to.be.true
    })

    it('converts `inverted` to boolean, even it is not specified', () => {
      const rules = unpackRules([['read', 'Post,Comment']])

      expect(rules[0].inverted).to.be.false
    })

    it('puts 5th element under `fields` field and converts it to an array', () => {
      const fields = ['title', 'description']
      const rules = unpackRules([['read', 'Post,Comment', 1, 0, fields.join(',')]])

      expect(rules[0].fields).to.deep.equal(fields)
    })

    it('converts `fields` to `undefined` if its value is `0`', () => {
      const rules = unpackRules([['read', 'Post,Comment', 1, 0, 0]])

      expect(rules[0].fields).to.be.undefined
    })

    it('puts 6th element under `reason` field', () => {
      const reason = 'forbidden reason'
      const rules = unpackRules([['read', 'Post,Comment', 1, 0, 0, reason]])

      expect(rules[0].reason).to.equal(reason)
    })

    it('converts `reason` to `undefined` if its value is `0`', () => {
      const rules = unpackRules([['read', 'Post,Comment', 1, 0, 0, 0]])

      expect(rules[0].reason).to.be.undefined
    })
  })
})
