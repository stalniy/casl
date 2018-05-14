export default {
  name: 'Can',
  inject: ['ability'],
  props: {
    I: {
      type: String,
      required: true
    },
    a: String,
    of: String,
    this: String,
  },
  render(createElement) {
    return this.check() && createElement(this.$children, this.data);
  },
  check() {
    const [action, field] = this.I.split(/\s+/);
    const subject = this.of || this.a || this.this || this.on;
    const ability = this.ability || this.$ability;
    return ability.can(action, subject, field);
  }
};

