import type { AnyAbility } from '@casl/ability';
import { createSubscriber } from 'svelte/reactivity';

export interface ReactiveAbility<T extends AnyAbility> {
  can: T['can'];
  cannot: T['cannot'];
  relevantRuleFor: T['relevantRuleFor'];
  update: (...args: Parameters<T['update']>) => void;
}

export function reactiveAbility<T extends AnyAbility>(ability: T): ReactiveAbility<T> {
  const subscribe = createSubscriber(invalidate => ability.on('updated', invalidate));

  return {
    can: (...args: Parameters<T['can']>) => {
      subscribe();
      return ability.can(...args);
    },
    cannot: (...args: Parameters<T['cannot']>) => {
      subscribe();
      return ability.cannot(...args);
    },
    relevantRuleFor: (...args: Parameters<T['relevantRuleFor']>) => {
      subscribe();
      return ability.relevantRuleFor(...args);
    },
    update: (...args: Parameters<T['update']>) => {
      (ability.update as (...rules: Parameters<T['update']>) => unknown)(...args);
    },
  };
}
