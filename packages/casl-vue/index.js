function abilitiesPlugin(Vue, ability) {
  var watcher = new Vue({
    data: {
      rules: []
    }
  });

  ability.on('updated', function (_ref) {
    var rules = _ref.rules;

    watcher.rules = rules;
  });

  Vue.mixin({
    methods: {
      $can: function $can() {
        watcher.rules = watcher.rules; // create dependency
        return ability.can.apply(ability, arguments);
      }
    }
  });
}

export { abilitiesPlugin };
