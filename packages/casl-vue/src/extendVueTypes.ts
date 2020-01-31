import { Ability, CanArgsType } from '@casl/ability';

declare module 'vue/types/vue' {
  interface Vue {
    $ability: Ability
    $can(action: CanArgsType[0], subject: CanArgsType[1], field?: CanArgsType[2]): boolean
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    ability?: Ability;
  }
}
