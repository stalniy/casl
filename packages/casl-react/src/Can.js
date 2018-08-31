import React, { PureComponent, Fragment, createElement } from 'react';
import PropTypes from 'prop-types';
import { Ability } from '@casl/ability';

const noop = () => {};
const renderChildren = Fragment
  ? children => createElement.apply(null, [Fragment, null].concat(children))
  : React.Children.only;
let propTypes = {};

if (process.env.NODE_ENV !== 'production') {
  const REQUIRED_OBJECT_OR_STRING = PropTypes
    .oneOfType([PropTypes.object, PropTypes.string])
    .isRequired;

  const alias = (names, validate) => (props, ...args) => { // eslint-disable-line
    if (!names.split(' ').some(name => props[name])) {
      return validate(props, ...args);
    }
  };

  propTypes = {
    I: alias('do', PropTypes.string.isRequired),
    a: alias('on this of an', REQUIRED_OBJECT_OR_STRING),
    an: alias('on this of a', REQUIRED_OBJECT_OR_STRING),
    of: alias('on a this an', REQUIRED_OBJECT_OR_STRING),
    this: alias('on a of an', REQUIRED_OBJECT_OR_STRING),
    do: alias('I', PropTypes.string.isRequired),
    on: alias('this a of an', REQUIRED_OBJECT_OR_STRING),
    not: PropTypes.bool,
    passThrough: PropTypes.bool,
    children: PropTypes.any.isRequired,
    ability: PropTypes.instanceOf(Ability).isRequired
  };
}

export default class Can extends PureComponent {
  static propTypes = propTypes;

  constructor(...args) {
    super(...args);

    this.unsubscribeFromAbility = noop;
    this.state = {
      ability: this.props.ability,
      allowed: false
    };
  }

  get allowed() {
    return this.state.allowed;
  }

  componentWillReceiveProps(props) {
    if (props.ability && this.state.ability !== props.ability) {
      this.setState({ ability: props.ability });
      this.connectToAbility(props.ability);
    } else {
      this.recheck(props);
    }
  }

  componentWillMount() {
    this.connectToAbility(this.state.ability);
  }

  componentWillUnmount() {
    this.unsubscribeFromAbility();
  }

  connectToAbility(ability) {
    this.unsubscribeFromAbility();

    if (ability) {
      this.unsubscribeFromAbility = ability.on('updated', () => this.recheck());
      this.recheck();
    }
  }

  recheck(props) {
    return this.setState({ allowed: this.check(props) });
  }

  check(props = null) {
    const params = props || this.props;
    const [action, field] = (params.I || params.do).split(/\s+/);
    const subject = params.of || params.a || params.this || params.on;
    const can = params.not ? 'cannot' : 'can';

    return this.state.ability[can](action, subject, field);
  }

  render() {
    const canRender = this.props.passThrough || this.state.allowed;
    return canRender ? this.renderChildren() : null;
  }

  renderChildren() {
    const { children } = this.props;
    const elements = typeof children === 'function'
      ? children(this.state.allowed, this.state.ability)
      : children;

    return renderChildren(elements);
  }
}
