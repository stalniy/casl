import React from 'react';
import { AnyAbility } from '@casl/ability';

export function useAbility<T extends AnyAbility>(context: React.Context<T>): T {
  const ability = React.useContext<T>(context);
  const [rules, setRules] = React.useState<T['rules']>();

  React.useEffect(() => ability.on('updated', (event) => {
    if (event.rules !== rules) {
      setRules(event.rules);
    }
  }), []);

  return ability;
}
