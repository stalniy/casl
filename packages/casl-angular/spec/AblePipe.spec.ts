import { Ability } from '@casl/ability'
import { TestBed } from '@angular/core/testing'
import { createApp, createComponent, configureTestingModule, Post } from './spec_helper'

const App = createApp('{{ \'read\' | able: post }}')

describe('AblePipe', () => {
  let fixture
  let ability
  let post

  afterEach(() => {
    if (fixture) {
      fixture.destroy()
    }
  })

  describe('module', () => {
    it('provides standalone `able` pipe', () => {
      configureTestingModule([App])
      fixture = createComponent(App)
      expect(fixture.nativeElement.textContent).toBe('false')
    })
  })

  describe('`able` pipe', () => {
    beforeEach(() => {
      configureTestingModule([App])
      ability = TestBed.inject(Ability)
      post = new Post({ author: 'me' })
    })

    it('updates template when `ability` is updated', () => {
      fixture = createComponent(App, { post })
      ability.update([{ subject: Post.name, action: 'read' }])
      fixture.detectChanges()

      expect(fixture.nativeElement.textContent).toBe('true')
    })

    describe('when abilities depends on object attribute', () => {
      beforeEach(() => {
        ability.update([{ subject: Post.name, action: 'read', conditions: { author: 'me' } }])
        fixture = createComponent(App, { post })
        fixture.detectChanges()
      })

      it('returns `true` if object attribute equals to specified value', () => {
        expect(fixture.nativeElement.textContent).toBe('true')
      })

      it('updates template when object attribute is changed', () => {
        post.author = 'not me'
        fixture.detectChanges()

        expect(fixture.nativeElement.textContent).toBe('false')
      })
    })
  })
})
