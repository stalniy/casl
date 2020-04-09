import { VueConstructor } from 'vue';
import { VueAbility } from './types';
import './extendVueTypes';

const WATCHERS = new WeakMap();

function renderingDependencyFor(Vue: VueConstructor, ability: VueAbility) {
  if (WATCHERS.has(ability)) {
    return WATCHERS.get(ability);
  }

  const data = { _touch: true }; // eslint-disable-line no-underscore-dangle
  const watcher = typeof Vue.observable === 'function'
    ? Vue.observable(data)
    : new Vue({ data });

  ability.on('updated', () => {
    // eslint-disable-next-line no-underscore-dangle
    watcher._touch = !watcher._touch;
  });
  WATCHERS.set(ability, watcher);

  return watcher;
}

function abilityDescriptor(ability?: VueAbility) {
  if (ability) {
    return { value: ability };
  }

  return {
    get() {
      throw new Error('Please provide `Ability` instance either in `abilitiesPlugin` or in ComponentOptions');
    }
  };
}

export function abilitiesPlugin(Vue: VueConstructor, defaultAbility?: VueAbility) {
  Object.defineProperty(Vue.prototype, '$ability', abilityDescriptor(defaultAbility));

  Vue.mixin({
    beforeCreate() {
      const { ability, parent } = this.$options;
      const localAbility = ability || (parent ? parent.$ability : null);

      if (localAbility) {
        Object.defineProperty(this, '$ability', { value: localAbility });
      }
    },

    methods: {
      $can(...args: any): boolean {
        const dep = renderingDependencyFor(Vue, this.$ability);
        dep._touch = dep._touch; // eslint-disable-line
        return this.$ability.can(...args);
      }
    }
  });
}
