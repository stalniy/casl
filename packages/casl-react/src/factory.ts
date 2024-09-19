import { AnyAbility } from '@casl/ability';
import { ComponentClass, Consumer, FunctionComponent, createElement as h } from 'react';
import { BoundCanProps, Can } from './Can';

interface BoundCanClass<T extends AnyAbility> extends ComponentClass<BoundCanProps<T>> {
  new (props: BoundCanProps<T>, context?: any): Can<T, true>
}

export function createCanBoundTo<T extends AnyAbility>(ability: T): BoundCanClass<T> {
  return class extends Can<T, true> {
    static defaultProps = { ability } as BoundCanClass<T>['defaultProps'];
  };
}
console.log('trigger')

export function createContextualCan<T extends AnyAbility>(
  Getter: Consumer<T>
): FunctionComponent<BoundCanProps<T>> {
  return (props: BoundCanProps<T>) => h(Getter, {
    children: (ability: T) => h(Can, {
      ability,
      ...props,
    } as any)
  });
}
