import { Ability } from '@casl/ability';

export default {
  name: 'AbilityProvider',
  props: {
    ability: Ability
  },
<<<<<<< HEAD
  provide() {
    const { ability } = this;
    return {
      ability: ability || undefined
    };
  },
  render(_) {
    return this.$slots.default[0];
    // return _('div');
=======
  // functional: true,
  provide() {
    const { ability } = this;
    return {
      ability: ability || null
    };
  },
  render(_) {
    return _(this.$children);
>>>>>>> 5965a30... add can component
  }
};

