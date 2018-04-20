import { PureComponent, createElement, Consumer } from 'react';
import { Ability } from '@casl/ability';

/**
 * Base properties shared between Can and ContextualCan
 */
type BaseProps = {
  do      : string          ;
  on      : Object | string ;
};


type CanProps = BaseProps & {
  ability : Ability;  
}

type ContextualCanDelegate = (props: BaseProps) => React.PureComponent<BaseProps>

// Class definition
export default class Can extends PureComponent<CanProps>{}

export function createCanBoundTo(ability: Ability): ContextualCanDelegate;
export function createContextualCan<T>(Consumer: Consumer<T>): ContextualCanDelegate;