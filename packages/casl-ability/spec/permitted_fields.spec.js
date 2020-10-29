import { defineAbility, Ability } from '../src'
import { permittedFieldsOf } from '../src/extra'
import { Post } from './spec_helper'

describe('permittedFieldsOf', () => {
  const defaultOptions = {
    fieldsFrom: rule => rule.fields || ['title', 'description']
  }

  it('returns an empty array for `Ability` with empty rules', () => {
    const ability = new Ability()
    expect(permittedFieldsOf(ability, 'read', 'Post', defaultOptions)).to.be.empty
  })

  it('returns all fields if none of rules specify fields', () => {
    const ability = defineAbility(can => can('read', 'Post'))
    const fields = permittedFieldsOf(ability, 'read', 'Post', defaultOptions)

    expect(fields).to.deep.equal(['title', 'description'])
  })

  it('returns a unique array of fields if there are duplicated fields across fields', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', ['title'])
      can('read', 'Post', ['title', 'description'], { id: 1 })
    })
    const fields = permittedFieldsOf(ability, 'read', 'Post', defaultOptions)

    expect(fields).to.have.length(2)
    expect(fields).to.have.all.members(['title', 'description'])
  })

  it('returns unique fields for array which contains direct and inverted rules', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', ['title', 'description'])
      cannot('read', 'Post', ['description'])
    })
    const fields = permittedFieldsOf(ability, 'read', 'Post', defaultOptions)

    expect(fields).to.have.length(1)
    expect(fields).to.have.all.members(['title'])
  })

  it('allows to provide an option `fieldsFrom` which extract fields from rule', () => {
    const ability = defineAbility(can => can('read', 'Post'))
    const fields = permittedFieldsOf(ability, 'read', 'Post', {
      fieldsFrom: rule => rule.fields || ['title']
    })

    expect(fields).to.deep.equal(['title'])
  })

  describe('when `subject` is an instance', () => {
    let ability

    beforeEach(() => {
      ability = defineAbility((can, cannot) => {
        can('read', 'Post', ['title'])
        can('read', 'Post', ['title', 'description'], { id: 1 })
        cannot('read', 'Post', ['description'], { private: true })
      })
    })

    it('allows to return fields for specific instance', () => {
      const post = new Post({ title: 'does not match conditions' })
      const fields = permittedFieldsOf(ability, 'read', post, defaultOptions)

      expect(fields).to.deep.equal(['title'])
    })

    it('allows to return fields for subject instance which matches specified rule conditions', () => {
      const post = new Post({ id: 1, title: 'matches conditions' })
      const fields = permittedFieldsOf(ability, 'read', post, defaultOptions)

      expect(fields).to.deep.equal(['title', 'description'])
    })
  })
})
