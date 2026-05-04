import React, { ReactNode } from 'react';
import {
  AbilityTuple,
  SubjectType,
  AnyAbility,
  Generics,
  Abilities,
  IfString,
} from '@casl/ability';
import { useAbility } from './hooks/useAbility';

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
  children: ReactNode | ((exposes: {
    isAllowed: boolean;
    ability: T;
    reason: string | undefined;
  }) => ReactNode)
}

export type CanProps<T extends AnyAbility> =
  AbilityCanProps<Generics<T>['abilities']> & CanExtraProps<T>;

function CanComponent<T extends AnyAbility>(props: CanProps<T>) {
  const ability = useAbility();
  const propsWithAliases = props as CanProps<T> & {
    of?: unknown
    a?: unknown
    an?: unknown
    this?: unknown
    on?: unknown
    I?: unknown
    do?: unknown
    field?: string
  };
  const subject =
    propsWithAliases.of ||
    propsWithAliases.a ||
    propsWithAliases.an ||
    propsWithAliases.this ||
    propsWithAliases.on;
  const action = propsWithAliases.I || propsWithAliases.do;
  const field = propsWithAliases.field;
  const rule = React.useMemo(() => {
    return ability.relevantRuleFor(action, subject, field);
  }, [ability, ability.rules, action, subject, field]);
  let isAllowed = !!rule && !rule.inverted;
  if (props.not) isAllowed = !isAllowed;

  const elements = typeof props.children === 'function'
    ? props.children({ isAllowed, ability: ability as T, reason: rule?.reason })
    : props.children;

  return props.passThrough || isAllowed ? elements as ReactNode : null;
}

export const Can = React.memo(CanComponent) as typeof CanComponent;
