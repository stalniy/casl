import type { AnyAbility } from '@casl/ability';
import { getContext, setContext } from 'svelte';
import { reactiveAbility, type ReactiveAbility } from './reactiveAbility.js';

export type { ReactiveAbility } from './reactiveAbility.js';

const abilityContext = Symbol('casl.ability');

export function provideAbility<T extends AnyAbility>(ability: T): ReactiveAbility<T> {
  const adapter = reactiveAbility(ability);
  setContext(abilityContext, adapter);
  return adapter;
}

export function useAbility<T extends AnyAbility = AnyAbility>(): ReactiveAbility<T> {
  const adapter = getContext<ReactiveAbility<T> | undefined>(abilityContext);

  if (!adapter) {
    throw new Error('Cannot find an Ability. Call provideAbility in a parent component.');
  }

  return adapter;
}
