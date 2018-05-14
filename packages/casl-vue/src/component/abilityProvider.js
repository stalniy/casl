import { Ability } from '@casl/ability';

export default {
  name: 'AbilityProvider',
  props: {
    ability: Ability
  },
  provide() {
    // const { ability } = this;
    return {
      ability: {}
    };
  },
  render(_) {
    return _(this.$slots.default);
  }
};

