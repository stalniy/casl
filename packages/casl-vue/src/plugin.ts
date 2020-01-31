import { Ability, CanArgsType, RawRule } from '@casl/ability';
import { VueConstructor } from 'vue';
import './extendVueTypes';

const WATCHERS = new WeakMap();

export function abilitiesPlugin(Vue: VueConstructor, providedAbility?: Ability) {
  const defaultAbility = providedAbility || new Ability([]);

  function watcherFor(ability: Ability) {
    if (WATCHERS.has(ability)) {
      return WATCHERS.get(ability);
    }

    const data: { rules: RawRule[] | null } = {
      rules: null
    };
    const watcher = typeof Vue.observable === 'function'
      ? Vue.observable(data)
      : new Vue({ data });

    ability.on('updated', (event) => {
      watcher.rules = event.rules;
    });
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
      $can(...args: CanArgsType) {
        const watcher = watcherFor(this.$ability);
        // create rendering dependency
        watcher.rules = watcher.rules; // eslint-disable-line

        return this.$ability.can(...args);
      }
    }
  });
}
