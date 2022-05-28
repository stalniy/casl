import { PureComponent, ReactNode } from 'react';
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

type AbilityCanProps<
  T extends Abilities,
  Else = IfString<T, { do: T } | { I: T }>
> = T extends AbilityTuple
  ? { do: T[0], on: T[1], field?: string } |
  { I: T[0], a: Extract<T[1], SubjectType>, field?: string } |
  { I: T[0], an: Extract<T[1], SubjectType>, field?: string } |
  { I: T[0], this: Exclude<T[1], SubjectType>, field?: string }
  : Else;

interface ExtraProps {
  not?: boolean
  passThrough?: boolean
}

interface CanExtraProps<T extends AnyAbility> extends ExtraProps {
  ability: T
  children: ReactNode | ((isAllowed: boolean, ability: T) => ReactNode)
}

interface BoundCanExtraProps<T extends AnyAbility> extends ExtraProps {
  ability?: T
  children: ReactNode | ((isAllowed: boolean, ability: T) => ReactNode)
}

export type CanProps<T extends AnyAbility> =
  AbilityCanProps<Generics<T>['abilities']> & CanExtraProps<T>;
export type BoundCanProps<T extends AnyAbility> =
  AbilityCanProps<Generics<T>['abilities']> & BoundCanExtraProps<T>;

export class Can<
  T extends AnyAbility,
  IsBound extends boolean = false
> extends PureComponent<IsBound extends true ? BoundCanProps<T> : CanProps<T>> {
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
      ? children(this._isAllowed, ability as any)
      : children;

    return elements as ReactNode;
  }
}
