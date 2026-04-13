import React from 'react';
import { AnyAbility } from '@casl/ability';

export function useAbility<T extends AnyAbility>(context: React.Context<T>): T {
  const ability = React.useContext<T>(context);

  const subscribe = React.useCallback(
    (callback: () => void) => ability.on('updated', callback),
    [ability],
  );

  const getSnapshot = React.useCallback(() => ability.rules, [ability]);

  React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return ability;
}
