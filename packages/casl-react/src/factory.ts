import { AnyAbility } from '@casl/ability';
import { Consumer, FunctionComponent, createElement } from 'react';
import { BoundCanProps, Can } from './Can';

export function createContextualCan<T extends AnyAbility>(
  Getter: Consumer<T>
): FunctionComponent<BoundCanProps<T>> {
  return (props: BoundCanProps<T>) => createElement(Getter, {
    children: (ability: T) => 
      createElement(Can, { ...props, ability: props.ability || ability } as any),
  });
}
