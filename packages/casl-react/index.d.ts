import { PureComponent, StatelessComponent } from 'react'
import { Ability } from '@casl/ability'

type BaseProps = {
  do: string
  on: Object | string
};

type CanPropsStrict = BaseProps & {
  ability: Ability
}

type CanProps = BaseProps & {
  ability?: Ability
}

declare class CanComponent<T> extends PureComponent<T> {
  allowed: boolean
}

export class Can extends CanComponent<CanPropsStrict> {
}

export class BoundCan extends CanComponent<CanProps> {
}

export function createCanBoundTo(ability: Ability): typeof BoundCan

export function createContextualCan(Consumer: any): StatelessComponent<CanProps>
