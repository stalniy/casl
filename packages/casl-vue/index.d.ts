import Vue from 'vue'
import { Ability } from '@casl/ability'

export function abilitiesPlugin(Vue: typeof Vue, providedAbility?: Ability): void

declare module "vue/types/vue" {
  interface Vue {
    $ability: Ability
    $can(action: string, subject: any, field?: string): boolean
  }
}
