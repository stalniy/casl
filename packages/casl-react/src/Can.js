import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Ability } from '@casl/ability';

const noop = () => {};
const REQUIRED_OBJECT_OR_STRING = PropTypes
  .oneOfType([PropTypes.object, PropTypes.string])
  .isRequired;

function alias(names, validate) {
  return (props, ...args) => { // eslint-disable-line
    if (!names.split(' ').some(name => props[name])) {
      return validate(props, ...args);
    }
  };
}

export default class Can extends PureComponent {
  static propTypes = {
    I: alias('do', PropTypes.string.isRequired),
    a: alias('on this of', REQUIRED_OBJECT_OR_STRING),
    of: alias('on a this', REQUIRED_OBJECT_OR_STRING),
    this: alias('on a of', REQUIRED_OBJECT_OR_STRING),
    do: alias('I', PropTypes.string.isRequired),
    on: alias('this a of', REQUIRED_OBJECT_OR_STRING),
    children: PropTypes.any.isRequired,
    ability: PropTypes.instanceOf(Ability).isRequired
  };

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

    return this.state.ability.can(action, subject, field);
  }

  render() {
    return this.state.allowed ? this.renderChildren() : null;
  }

  renderChildren() {
    const { children } = this.props;

    return typeof children === 'function' ? children(this.state.ability) : React.Children.only(children);
  }
}
