import { PureAbility } from '@casl/ability'
import { TestBed } from '@angular/core/testing'
import { createApp, createComponent, configureTestingModule, Post } from './spec_helper'

const AppWithAblePipe = createApp('{{ \'read\' | able: post }}')
const AppWithAblePurePipe = createApp('{{ \'read\' | ablePure: post | async }}')

describe('Ability pipes', () => {
  let fixture
  let ability
  let post

  afterEach(() => {
    if (fixture) {
      fixture.destroy()
    }
  })

  describe('module', () => {
    it('provides deprecated impure `can` pipe', () => {
      configureTestingModule([AppWithAblePurePipe])
      fixture = createComponent(AppWithAblePurePipe)
      expect(fixture.nativeElement.textContent).toBe('false')
    })

    it('provides impure `able` pipe', () => {
      configureTestingModule([AppWithAblePipe])
      fixture = createComponent(AppWithAblePipe)
      expect(fixture.nativeElement.textContent).toBe('false')
    })
  })

  describe('`able` pipe', () => {
    behavesLikeAbilityPipe(AppWithAblePipe)
  })

  describe('`ablePure` pipe', () => {
    behavesLikeAbilityPipe(AppWithAblePurePipe)
  })

  function behavesLikeAbilityPipe(App) {
    beforeEach(() => {
      configureTestingModule([App])
      ability = TestBed.inject(PureAbility)
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

      if (App !== AppWithAblePurePipe) {
        it('updates template when object attribute is changed', () => {
          post.author = 'not me'
          fixture.detectChanges()

          expect(fixture.nativeElement.textContent).toBe('false')
        })
      }
    })
  }
})
