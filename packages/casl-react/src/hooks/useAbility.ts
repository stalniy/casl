import React from 'react';
import { AnyAbility } from '@casl/ability';

export function useAbility<T extends AnyAbility>(context: React.Context<T>): T {
  if (process.env.NODE_ENV !== 'production' && typeof React.useContext !== 'function') {
    throw new Error('You must use React >= 16.8 in order to use useAbility()');
  }

  const ability = React.useContext<T>(context);
  const [rules, setRules] = React.useState<T['rules']>();

  React.useEffect(() => ability.on('updated', (event) => {
    if (event.rules !== rules) {
      setRules(event.rules);
    }
  }), []);

  return ability;
}
