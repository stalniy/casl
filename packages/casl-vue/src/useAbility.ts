import { inject, InjectionKey, provide } from 'vue';
import type { AnyAbility, Ability } from '@casl/ability';
import { reactiveAbility } from './reactiveAbility';

export const ABILITY_TOKEN: InjectionKey<AnyAbility> = Symbol('ability');

export function useAbility<T extends AnyAbility = Ability>(): T {
  const ability = inject<T>(ABILITY_TOKEN);

  if (!ability) {
    throw new Error('Cannot inject Ability instance because it was not provided');
  }

  return ability;
}

export function provideAbility(ability: AnyAbility) {
  provide(ABILITY_TOKEN, reactiveAbility(ability));
}
