import type { AnyAbility, MongoAbility } from '@casl/ability';
import { inject, InjectionKey, provide } from 'vue';
import { reactiveAbility } from './reactiveAbility';

export const ABILITY_TOKEN: InjectionKey<AnyAbility> = Symbol('ability');

export function useAbility<T extends AnyAbility = MongoAbility>(): T {
  const ability = inject<T>(ABILITY_TOKEN);

  if (!ability) {
    throw new Error('Cannot inject Ability instance because it was not provided');
  }

  return ability;
}

export function provideAbility(ability: AnyAbility) {
  provide(ABILITY_TOKEN, reactiveAbility(ability));
}
