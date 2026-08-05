import { Ability, type RawRule } from '@casl/ability'
import { TestBed } from '@angular/core/testing'
import { createApp, createComponent, configureTestingModule, Post } from './spec_helper'

const App = createApp('{{ \'read\' | able: post }}')

describe('AblePipe', () => {
  describe('module', () => {
    it('provides standalone `able` pipe', () => {
      const { fixture } = setup()

      expect(fixture.nativeElement.textContent).toBe('false')
    })
  })

  describe('`able` pipe', () => {
    it('updates template when `ability` is updated', () => {
      const { ability, fixture } = setup()

      ability.update([{ subject: Post.name, action: 'read' }])
      fixture.detectChanges()

      expect(fixture.nativeElement.textContent).toBe('true')
    })

    describe('when abilities depends on object attribute', () => {
      it('returns `true` if object attribute equals to specified value', () => {
        const { fixture } = setup({
          rules: [{ subject: Post.name, action: 'read', conditions: { author: 'me' } }]
        })

        expect(fixture.nativeElement.textContent).toBe('true')
      })

      it('updates template when object attribute is changed', () => {
        const { fixture, post } = setup({
          rules: [{ subject: Post.name, action: 'read', conditions: { author: 'me' } }]
        })

        post.author = 'not me'
        fixture.componentRef.setInput('post', post)
        fixture.detectChanges()

        expect(fixture.nativeElement.textContent).toBe('false')
      })
    })
  })

  function setup({ rules = [] }: { rules?: RawRule[] } = {}) {
    configureTestingModule([App])
    const ability = TestBed.inject(Ability)
    const post = Post.create({ author: 'me' })

    ability.update(rules)

    const fixture = createComponent(App, { post })
    fixture.detectChanges()

    return {
      ability,
      post,
      fixture
    }
  }
})
