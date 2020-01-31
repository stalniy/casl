import { createElement, StatelessComponent } from 'react';
import PropTypes from 'prop-types';
import { Ability } from '@casl/ability';
import Can, { AbilityCanProps, CanExtraProps } from './Can';

export type BoundCanProps =
  AbilityCanProps &
  Omit<CanExtraProps, 'ability'> &
  {
    ability?: Ability
  };

class BoundCan extends Can<BoundCanProps> {
  static propTypes = process.env.NODE_ENV === 'production'
    ? { ...Can.propTypes, ability: PropTypes.instanceOf(Ability) }
    : {};
}

export function createCanBoundTo(ability: Ability): typeof BoundCan {
  return class extends BoundCan {
    static defaultProps = { ability };
  };
}

export function createContextualCan(Consumer: any): StatelessComponent<BoundCanProps> {
  return function ContextualCan(props: BoundCanProps) {
    return createElement(Consumer, null, (ability: Ability) => createElement(Can, {
      ability: props.ability || ability,
      ...props,
    }));
  };
}
