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
    this._isAllowed = false;
    this._ability = null;
  }

  componentWillUnmount() {
    this.unsubscribeFromAbility();
  }

  connectToAbility(ability) {
    if (ability === this._ability) {
      return;
    }

    this.unsubscribeFromAbility();
    this._ability = null;

    if (ability) {
      this._ability = ability;
      this.unsubscribeFromAbility = ability.on('updated', () => this.forceUpdate());
    }
  }

  get allowed() {
    return this._isAllowed;
  }

  isAllowed() {
    const params = this.props;
    const [action, field] = (params.I || params.do).split(/\s+/);
    const subject = params.of || params.a || params.an || params.this || params.on;
    const can = params.not ? 'cannot' : 'can';

    return params.ability[can](action, subject, field);
  }

  render() {
    this.connectToAbility(this.props.ability);
    this._isAllowed = this.isAllowed();
    return this.props.passThrough || this._isAllowed ? this.renderChildren() : null;
  }

  renderChildren() {
    const { children, ability } = this.props;
    const elements = typeof children === 'function'
      ? children(this._isAllowed, ability)
      : children;

    return renderChildren(elements);
  }
}
