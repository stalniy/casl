import Vue, { VueConstructor } from 'vue'
import { Ability } from '@casl/ability'

export function abilitiesPlugin(Vue: VueConstructor, providedAbility?: Ability): void

declare module "vue/types/vue" {
  interface Vue {
    $ability: Ability
    $can(action: string, subject: any, field?: string): boolean
  }
}
 
declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    ability?: Ability;
  }
}
