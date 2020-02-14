import { createElement as h, StatelessComponent, ComponentClass } from 'react';
import PropTypes from 'prop-types';
import { Ability, Subject } from '@casl/ability';
import { Can, BoundCanProps } from './Can';

interface BoundCanClass<
  A extends string,
  S extends Subject,
  C
> extends ComponentClass<BoundCanProps<A, S, C>> {
  new (props: BoundCanProps<A, S, C>, context?: any): Can<A, S, C, true>
}

export function createCanBoundTo<
  A extends string,
  S extends Subject,
  C
>(ability: Ability<A, S, C>): BoundCanClass<A, S, C> {
  return class extends Can<A, S, C, true> {
    static defaultProps = { ability };
    static propTypes = process.env.NODE_ENV === 'production'
      ? { ...Can.propTypes, ability: PropTypes.instanceOf(Ability) }
      : {};
  };
}

export function createContextualCan<
  A extends string,
  S extends Subject,
  C
>(Consumer: any): StatelessComponent<BoundCanProps<A, S, C>> {
  return function ContextualCan(props: BoundCanProps<A, S, C>) {
    return h(Consumer, null, (ability: Ability<A, S, C>) => h(Can as BoundCanClass<A, S, C>, {
      ability,
      ...props,
    }));
  };
}
