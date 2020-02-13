import { Ability, Subject } from '@casl/ability';
import { VueConstructor } from 'vue';
import './extendVueTypes';

const WATCHERS = new WeakMap();

export function abilitiesPlugin<
  A extends string = string,
  S extends Subject = Subject,
  C = object
>(Vue: VueConstructor, providedAbility?: Ability<A, S, C>) {
  const defaultAbility = providedAbility || new Ability<A, S, C>([]);

  function renderingDependencyFor(ability: Ability) {
    if (WATCHERS.has(ability)) {
      return WATCHERS.get(ability);
    }

    const data = { count: 0 };
    const watcher = typeof Vue.observable === 'function'
      ? Vue.observable(data)
      : new Vue({ data });

    ability.on('updated', () => watcher.count++);
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
      $can(...args: Parameters<Ability<A, S, C>['can']>): boolean {
        const dep = renderingDependencyFor(this.$ability);
        dep.count = dep.count; // eslint-disable-line

        return this.$ability.can(...args);
      }
    }
  });
}
