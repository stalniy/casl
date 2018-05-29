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
  functional: true,
  props: {
    I: String,
    do: String,
    a: [String, Function],
    of: [String, Function],
    this: [String, Function],
    on: [String, Function]
  },
  render(createElement, {
    props, children, parent
  }) {
    validateProps(props);
    const action = props.I || props.do || '';
    const subject = props.of || props.a || props.this || props.on;
    if (parent.$can(action, subject)) {
      return children.length > 1 ? children : children[0];
    }
    return null;
  }
};
