import { Ability, AbilityBuilder } from '@casl/ability';
import Can from './component/can';

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
    provide() {
      return {
        ability: undefined
      };
    },
    methods: {
      $can(...args) {
        watcher.rules = watcher.rules; // create dependency
        return this.$ability.can(...args);
      },
      $defineAbility(fn) {
        const watcherForComponent = new Vue({
          data: {
            rules: []
          }
        });
        const abilityForComponent = AbilityBuilder.define(fn);
        abilityForComponent.on('updated', ({ rules }) => {
          watcherForComponent.rules = rules;
        });
        abilityForComponent.watcherForComponent = watcherForComponent;
        return abilityForComponent;
      }
    }
  });
  Vue.component('Can', Can);
}
