import { Ability } from '@casl/ability';
import { VueConstructor } from 'vue';
import { VueAbility } from './types';

const WATCHERS = new WeakMap();

export function abilitiesPlugin(
  Vue: VueConstructor,
  providedAbility?: VueAbility
) {
  const defaultAbility = providedAbility || (new Ability([]) as VueAbility);

  function renderingDependencyFor(ability: VueAbility) {
    if (WATCHERS.has(ability)) {
      return WATCHERS.get(ability);
    }

    const data = { touch: true };
    const watcher = typeof Vue.observable === 'function'
      ? Vue.observable(data)
      : new Vue({ data });

    ability.on('updated', () => watcher.touch = !watcher.touch);
    WATCHERS.set(ability, watcher);

    return watcher;
  }

  Object.defineProperty(Vue.prototype, '$ability', { value: defaultAbility });

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
        dep.touch = dep.touch; // eslint-disable-line

        return this.$ability.can(...args);
      }
    }
  });
}
