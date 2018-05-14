import { Ability } from '@casl/ability';
import Can from './component/can';
import AbilityProvider from './component/abilityProvider';

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
  Vue.component('AbilityProvider', AbilityProvider);
  Vue.component('Can', Can);
}
