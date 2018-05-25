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
<<<<<<< HEAD
    return _('div', {}, this.$slots.default);
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
=======
    return _(this.$slots.default[0]);
>>>>>>> 1a5bfbf... add test,fix can component
  }
};
