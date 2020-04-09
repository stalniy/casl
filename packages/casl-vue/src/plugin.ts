import { VueConstructor } from 'vue';
import { VueAbility } from './types';
import './extendVueTypes';

const WATCHERS = new WeakMap();

export function abilitiesPlugin(Vue: VueConstructor, defaultAbility?: VueAbility) {
  function renderingDependencyFor(ability: VueAbility) {
    if (WATCHERS.has(ability)) {
      return WATCHERS.get(ability);
    }

    const data = { _touch: true }; // eslint-disable-line no-underscore-dangle
    const watcher = typeof Vue.observable === 'function'
      ? Vue.observable(data)
      : new Vue({ data });

    // eslint-disable-next-line no-underscore-dangle
    ability.on('updated', () => watcher._touch = !watcher._touch);
    WATCHERS.set(ability, watcher);

    return watcher;
  }

  const descriptor = defaultAbility
    ? { value: defaultAbility }
    : {
      get() {
        throw new Error('Please provide `Ability` instance either in `abilitiesPlugin` or in ComponentOptions');
      }
    };
  Object.defineProperty(Vue.prototype, '$ability', descriptor);

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
        const dep = renderingDependencyFor(this.$ability);
        dep._touch = dep._touch; // eslint-disable-line

        return this.$ability.can(...args);
      }
    }
  });
}
