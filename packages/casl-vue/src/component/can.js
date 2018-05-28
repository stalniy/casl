export default {
  name: 'Can',
  inject: ['ability'],
  functional: true,
  props: {
    I: {
      type: String,
      required: true
    },
    a: String,
    of: String,
    this: String,
  },
  render(createElement, {
    props, children, parent, injections
  }) {
    if (injections.ability) {
      injections.ability.watcherForComponent.rules =
      injections.ability.watcherForComponent.rules; // create dependency
    } else {
      parent.$can(); // also create dependency
    }
    const checkContext = Object.assign({
      ability: injections.ability
    }, props, {
      $ability: parent.$ability
    });
    // {
    //   ability: injections.ability,
    //   ...props,
    //   $ability: parent.$ability,
    // };
    return check.call(checkContext) && children.length > 1 ? children : children[0];
  }
};

function check() {
  const [action, field] = this.I.split(/\s+/);
  const subject = this.of || this.a || this.this || this.on;
  const ability = this.ability || this.$ability;
  return ability.can(action, subject, field);
}

