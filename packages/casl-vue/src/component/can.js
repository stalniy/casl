function check() {
  const actionFiled = this.I || this.do || '';
  const [action, field] = actionFiled.split(/\s+/);
  const subject = this.of || this.a || this.this || this.on;
  const ability = this.ability || this.$ability;
  return ability.can(action, subject, field);
}

function validateProps(props) {
  if (!props.I && !props.do) {
    console.error('Invalid prop:neither of prop:`I` and prop:`do` exist');     // eslint-disable-line
  }
  if (!props.of && !props.a && !props.this && !props.on) {
    console.error('Invalid prop:neither of prop:`of`,prop:`a`,prop:`this`,prop:`on` exist');     // eslint-disable-line
  }
}

export default {
  name: 'Can',
  inject: ['ability'],
  functional: true,
  props: {
    I: String,
    do: String,
    a: [String, Object],
    of: [String, Object],
    this: [String, Object],
    on: [String, Object]
  },
  render(createElement, {
    props, children, parent, injections
  }) {
    validateProps(props);
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
    return check.call(checkContext) && children.length > 1 ? children : children[0];
  }
};
