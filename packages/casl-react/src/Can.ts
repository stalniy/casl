import React, { PureComponent, Fragment, createElement } from 'react';
import PropTypes from 'prop-types';
import { Ability, Unsubscribe, AbilitySubject } from '@casl/ability';

const noop = () => {};
const renderChildren = Fragment
  ? (children?: React.ReactNodeArray) => {
    if (!children) {
      return null;
    }

    return children.length > 1
      ? createElement(Fragment, null, ...children)
      : React.Children.only(children);
  }
  : React.Children.only;
let propTypes = {};

if (process.env.NODE_ENV !== 'production') {
  const REQUIRED_OBJECT_OR_STRING = PropTypes
    .oneOfType([PropTypes.object, PropTypes.string])
    .isRequired;

  const alias = (names: string, validate: Function) => (props: any, ...args: unknown[]) => { // eslint-disable-line
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

export type AbilityCanProps =
  { do: string, on: AbilitySubject } |
  { I: string, a: Exclude<AbilitySubject, object> } |
  { I: string, an: Exclude<AbilitySubject, object> } |
  { I: string, of: AbilitySubject } |
  { I: string, this: object };

export type CanExtraProps = {
  not?: boolean,
  passThrough?: boolean,
  ability: Ability
};

export type CanProps = AbilityCanProps & CanExtraProps;

export default class Can<T extends AbilityCanProps=CanProps> extends PureComponent<CanProps> {
  static propTypes = propTypes;

  private _isAllowed: boolean = false;

  private _ability: Ability | null = null;

  private _unsubscribeFromAbility: Unsubscribe = noop;

  componentWillUnmount() {
    this._unsubscribeFromAbility();
  }

  connectToAbility(ability: Ability) {
    if (ability === this._ability) {
      return;
    }

    this._unsubscribeFromAbility();
    this._ability = null;

    if (ability) {
      this._ability = ability;
      this._unsubscribeFromAbility = ability.on('updated', () => this.forceUpdate());
    }
  }

  get allowed() {
    return this._isAllowed;
  }

  isAllowed() {
    const props: any = this.props;
    const [action, field] = (props.I || props.do).split(/\s+/);
    const subject = props.of || props.a || props.an || props.this || props.on;
    const can = props.not ? 'cannot' : 'can';

    return props.ability[can](action, subject, field);
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
