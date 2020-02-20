import { createElement as h, StatelessComponent, ComponentClass } from 'react';
import { AnyAbility } from '@casl/ability';
import { Can, BoundCanProps } from './Can';

interface BoundCanClass<T extends AnyAbility> extends ComponentClass<BoundCanProps<T>> {
  new (props: BoundCanProps<T>, context?: any): Can<T, true>
}

export function createCanBoundTo<T extends AnyAbility>(ability: T): BoundCanClass<T> {
  return class extends Can<T, true> {
    static defaultProps = { ability } as BoundCanClass<T>['defaultProps'];
  };
}

export function createContextualCan<T extends AnyAbility>(
  Consumer: any
): StatelessComponent<BoundCanProps<T>> {
  return function ContextualCan(props: BoundCanProps<T>) {
    return h(Consumer, null, (ability: T) => h(Can as any, {
      ability,
      ...props,
    } as any));
  };
}
