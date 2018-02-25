export function abilitiesPlugin(Vue, ability) {
  const watcher = new Vue({
    data: {
      rules: []
    }
  });

  ability.on('updated', ({ rules }) => {
    watcher.rules = rules;
  });

  Vue.mixin({
    methods: {
      $can(...args) {
        watcher.rules = watcher.rules; // create dependency
        return ability.can(...args);
      }
    }
  });
}
