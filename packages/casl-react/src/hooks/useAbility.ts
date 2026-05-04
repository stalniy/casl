import { createElement, useContext, useCallback, useSyncExternalStore, createContext } from 'react';
import type { AnyAbility } from '@casl/ability';

const AbilityContext = createContext<AnyAbility | null>(null);
const EMPTY_RULES: any[] = [];
const noop = () => {};

export function AbilityProvider<T extends AnyAbility>({
  children,
  value,
}: {
  children: React.ReactNode;
  value: T;
}) {
  return createElement(AbilityContext.Provider, { value }, children);
}

export function useAbility<T extends AnyAbility>(): T {
  const ability = useContext(AbilityContext);
  const subscribe = useCallback(
    (callback: () => void) => ability?.on('updated', callback) || noop,
    [ability],
  );
  const getSnapshot = useCallback(() => ability?.rules || EMPTY_RULES, [ability]);

  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  if (!ability) {
    throw new Error('AbilityContext is not provided. Please make sure to wrap your component tree with <AbilityProvider>.');
  }

  return ability as T;
}
