import {
  Abilities,
  AbilityTuple,
  AnyAbility,
  ForbiddenError,
  Generics,
  IfString,
  SubjectType,
  Unsubscribe,
} from "@casl/ability";
import { PureComponent, ReactNode } from "react";

const noop = () => {};

type AbilityCanProps<
  T extends Abilities,
  Else = IfString<T, { do: T } | { I: T }>
> = T extends AbilityTuple
  ?
      | { do: T[0]; on: T[1]; field?: string }
      | { I: T[0]; a: Extract<T[1], SubjectType>; field?: string }
      | { I: T[0]; an: Extract<T[1], SubjectType>; field?: string }
      | { I: T[0]; this: Exclude<T[1], SubjectType>; field?: string }
  : Else;

interface ExtraProps {
  not?: boolean;
  passThrough?: boolean;
}

type RenderChildrenParameters<T extends AnyAbility> =
  | [allowed: true, ability: T, forbiddenReason: undefined]
  | [allowed: false, ability: T, forbiddenReason: string];

interface CanExtraProps<T extends AnyAbility> extends ExtraProps {
  ability: T;
  children: ReactNode | ((...args: RenderChildrenParameters<T>) => ReactNode);
}

interface BoundCanExtraProps<T extends AnyAbility> extends ExtraProps {
  ability?: T;
  children: ReactNode | ((...args: RenderChildrenParameters<T>) => ReactNode);
}

type CanRenderWithReason =
  | {
      allowed: true;
      forbiddenReason: undefined;
    }
  | {
      allowed: false;
      forbiddenReason: string;
    };

export type CanProps<T extends AnyAbility> = AbilityCanProps<
  Generics<T>["abilities"]
> &
  CanExtraProps<T>;
export type BoundCanProps<T extends AnyAbility> = AbilityCanProps<
  Generics<T>["abilities"]
> &
  BoundCanExtraProps<T>;

export class Can<
  T extends AnyAbility,
  IsBound extends boolean = false
> extends PureComponent<IsBound extends true ? BoundCanProps<T> : CanProps<T>> {
  private _isAllowed: boolean = false;
  private _ability: T | null = null;
  private _forbiddenReason: string | undefined = undefined;
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
    this._forbiddenReason = undefined;

    if (ability) {
      this._ability = ability;
      this._unsubscribeFromAbility = ability.on("updated", () =>
        this.forceUpdate()
      );
    }
  }

  get allowed() {
    return this._isAllowed;
  }

  private _getCanRenderWithReason(): CanRenderWithReason {
    const props: any = this.props;
    const subject = props.of || props.a || props.an || props.this || props.on;
    const check = props.not ? "cannot" : "can";

    const args = [props.I || props.do, subject, props.field];
    const error =
      check === "can"
        ? ForbiddenError.from(props.ability!).unlessCan(...args)
        : ForbiddenError.from(props.ability!).unlessCannot(...args);

    if (error) {
      return {
        allowed: false,
        forbiddenReason: error.message,
      };
    } else {
      return {
        allowed: true,
        forbiddenReason: undefined,
      };
    }
  }

  render() {
    this._connectToAbility(this.props.ability);
    const { allowed, forbiddenReason } = this._getCanRenderWithReason();
    this._isAllowed = allowed;
    this._forbiddenReason = forbiddenReason;
    return this.props.passThrough || this._isAllowed
      ? this._renderChildren()
      : null;
  }

  private _renderChildren() {
    const { children, ability } = this.props;

    const args = [
      this._isAllowed,
      ability as any,
      this._forbiddenReason,
    ] as RenderChildrenParameters<T>;

    const elements =
      typeof children === "function" ? children(...args) : children;

    return elements as ReactNode;
  }
}
