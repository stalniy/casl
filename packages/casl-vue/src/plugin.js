import { Ability } from '@casl/ability';

export function abilitiesPlugin(Vue, providedAbility) {
  const ability = providedAbility || new Ability([]);
  const watcher = new Vue({
    data: {
      rules: []
    }
  });

  ability.on('updated', ({ rules }) => {
    watcher.rules = rules;
  });

  Object.defineProperty(Vue.prototype, '$ability', { value: ability });

  Vue.mixin({
    methods: {
      $can(...args) {
        watcher.rules = watcher.rules; // create dependency
        return this.$ability.can(...args);
      }
    }
  });
}
