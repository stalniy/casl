export default {
  name: 'Can',
  functional: true,
  props: {
    I: String,
    do: String,
    a: [String, Function],
    of: [String, Function, Object],
    this: [String, Function, Object],
    on: [String, Function, Object]
  },
  render(createElement, { props, children, parent }) {
    const action = props.I || props.do;
    const subject = props.of || props.a || props.this || props.on;

    if (!action) {
      throw new Error('Can: neither `I` nor `do` property exist');
    }

    if (!subject) {
      throw new Error('Can: neither `of` nor `a` nor `this` nor `on` property exist');
    }

    if (!parent.$can(action, subject)) {
      return null;
    }

    return children.length > 1 ? children : children[0];
  }
};
