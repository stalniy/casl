import { Ability } from '@casl/ability';

declare module 'vue/types/vue' {
  interface Vue {
    $ability: Ability
    $can(...args: Parameters<Ability['can']>): boolean
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    ability?: Ability;
  }
}
