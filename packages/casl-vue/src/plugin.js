import { Ability } from '@casl/ability';

const WATCHER_KEY = typeof Symbol === 'undefined'
  ? `__w${Date.now()}`
  : Symbol('vue.watcher');

export function abilitiesPlugin(Vue, providedAbility) {
  const defaultAbility = providedAbility || new Ability([]);

  function createWatcherFor(ability) {
    const watcher = new Vue({
      data: {
        rules: []
      }
    });

    ability.on('updated', (event) => {
      watcher.rules = event.rules;
    });

    ability[WATCHER_KEY] = watcher;

    return watcher;
  }

  Object.defineProperty(Vue.prototype, '$ability', {
    writable: true,
    value: defaultAbility
  });

  Vue.mixin({
    beforeCreate() {
      const { ability, parent } = this.$options;

      if (ability) {
        this.$ability = ability;
      } else if (parent && parent.$ability) {
        this.$ability = parent.$ability;
      }
    },

    methods: {
      $can(...args) {
        const ability = this.$ability;
        const watcher = ability[WATCHER_KEY]
          ? ability[WATCHER_KEY]
          : createWatcherFor(ability);

        watcher.rules = watcher.rules; // create rendering dependency

        return ability.can(...args);
      }
    }
  });
}
