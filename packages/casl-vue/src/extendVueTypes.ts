import { AnyAbility } from '@casl/ability';

declare module 'vue/types/vue' {
  interface Vue {
    $ability: AnyAbility
    $can(this: this, ...args: Parameters<this['$ability']['can']>): boolean
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    ability?: V['$ability'];
  }
}
