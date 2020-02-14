import React, { PureComponent, Fragment, createElement } from 'react';
import PropTypes from 'prop-types';
import { Ability, Unsubscribe, Subject, SubjectType } from '@casl/ability';

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

  // eslint-disable-next-line
  const alias = (names: string, validate: Function) => (props: any, ...args: unknown[]) => {
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

export type AbilityCanProps<A extends string, S extends Subject> =
  { do: A | string, on: S } |
  { I: A | string, a: Extract<S, SubjectType> } |
  { I: A | string, an: Extract<S, SubjectType> } |
  { I: A | string, of: S } |
  { I: A | string, this: Exclude<S, SubjectType> };

export type CanExtraProps<A extends string, S extends Subject, C> = {
  not?: boolean,
  passThrough?: boolean,
  ability: Ability<A, S, C>
};

export type CanProps<
  A extends string = string,
  S extends Subject = Subject,
  C = object
> = AbilityCanProps<A, S> & CanExtraProps<A, S, C>;

export type BoundCanProps<
  A extends string = string,
  S extends Subject = Subject,
  C = object
> = AbilityCanProps<A, S> & Omit<CanExtraProps<A, S, C>, 'ability'> & {
  ability?: Ability<A, S, C>
};

export class Can<
  A extends string = string,
  S extends Subject = Subject,
  C = object,
  IsBound extends boolean = false
> extends PureComponent<true extends IsBound ? BoundCanProps<A, S, C> : CanProps<A, S, C>> {
  static propTypes = propTypes;

  private _isAllowed: boolean = false;
  private _ability: Ability<A, S, C> | null = null;
  private _unsubscribeFromAbility: Unsubscribe = noop;

  componentWillUnmount() {
    this._unsubscribeFromAbility();
  }

  private _connectToAbility(ability?: Ability<A, S, C>) {
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

  private _canRender(): boolean {
    const props: any = this.props;
    const [action, field] = (props.I || props.do).split(/\s+/);
    const subject = props.of || props.a || props.an || props.this || props.on;
    const can = props.not ? 'cannot' : 'can';

    return props.ability[can](action, subject, field);
  }

  render() {
    this._connectToAbility(this.props.ability);
    this._isAllowed = this._canRender();
    return this.props.passThrough || this._isAllowed ? this._renderChildren() : null;
  }

  private _renderChildren() {
    const { children, ability } = this.props;
    const elements = typeof children === 'function'
      ? children(this._isAllowed, ability)
      : children;

    return renderChildren(elements);
  }
}
