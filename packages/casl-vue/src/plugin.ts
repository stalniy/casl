import { VueConstructor } from 'vue';
import { VueAbility } from './types';

const WATCHERS = new WeakMap();

export function abilitiesPlugin(Vue: VueConstructor, defaultAbility?: VueAbility) {
  function renderingDependencyFor(ability: VueAbility) {
    if (WATCHERS.has(ability)) {
      return WATCHERS.get(ability);
    }

    const data = { _touch: true };
    const watcher = typeof Vue.observable === 'function'
      ? Vue.observable(data)
      : new Vue({ data });

    ability.on('updated', () => watcher._touch = !watcher._touch);
    WATCHERS.set(ability, watcher);

    return watcher;
  }

  if (defaultAbility) {
    Object.defineProperty(Vue.prototype, '$ability', { value: defaultAbility });
  }

  Vue.mixin({
    beforeCreate() {
      const { ability, parent } = this.$options;
      const localAbility = ability || (parent ? parent.$ability : null);

      if (localAbility) {
        Object.defineProperty(this, '$ability', { value: localAbility });
      }
    },

    methods: {
      $can(...args: Parameters<VueAbility['can']>): boolean {
        const dep = renderingDependencyFor(this.$ability);
        dep._touch = dep._touch; // eslint-disable-line

        return this.$ability.can(...args);
      }
    }
  });
}
