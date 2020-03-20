import React, { PureComponent, Fragment, createElement } from 'react';
import {
  Unsubscribe,
  AbilityTuple,
  SubjectType,
  AnyAbility,
  Generics,
  Abilities,
  IfString,
} from '@casl/ability';

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

type AbilityCanProps<
  T extends Abilities,
  Else = IfString<T, { do: T } | { I: T }>
> = T extends AbilityTuple
  ? { field?: string } & (
    { do: T[0], on: T[1] } |
    { I: T[0], a: Extract<T[1], SubjectType> } |
    { I: T[0], an: Extract<T[1], SubjectType> } |
    { I: T[0], of: T[1] } |
    { I: T[0], this: Exclude<T[1], SubjectType> }
  )
  : Else;

type CanExtraProps<T extends AnyAbility> = {
  not?: boolean,
  passThrough?: boolean,
  ability: T
};

export type CanProps<T extends AnyAbility> =
  AbilityCanProps<Generics<T>['abilities']> & CanExtraProps<T>;
export type BoundCanProps<T extends AnyAbility> =
  AbilityCanProps<Generics<T>['abilities']> &
  Omit<CanExtraProps<T>, 'ability'> & { ability?: T };
export class Can<T extends AnyAbility, IsBound extends boolean = false> extends PureComponent<
true extends IsBound
  ? BoundCanProps<T>
  : CanProps<T>
> {
  private _isAllowed: boolean = false;
  private _ability: T | null = null;
  private _unsubscribeFromAbility: Unsubscribe = noop;

  componentWillUnmount() {
    this._unsubscribeFromAbility();
  }

  private _connectToAbility(ability?: T) {
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
    const subject = props.of || props.a || props.an || props.this || props.on;
    const can = props.not ? 'cannot' : 'can';

    return props.ability[can](props.I || props.do, subject, props.field);
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
