export default {
  name: 'Can',
  functional: true,
  props: {
    I: String,
    do: String,
    a: [String, Function],
    of: [String, Function, Object],
    this: [String, Function, Object],
    on: [String, Function, Object],
    not: { type: Boolean, default: false }
  },
  render(h, { props, children, parent }) {
    const [action, field] = (props.I || props.do || '').split(' ');
    const subject = props.of || props.a || props.this || props.on;

    if (!action) {
      throw new Error('[Vue Can]: neither `I` nor `do` property exist');
    }

    if (!subject) {
      throw new Error('[Vue Can]: neither `of` nor `a` nor `this` nor `on` property exist');
    }

    return props.not ^ parent.$can(action, subject, field) ? children : null;
  }
};
