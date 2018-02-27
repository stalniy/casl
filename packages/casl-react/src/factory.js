import React from 'react';
import Can from './Can';

export function createCanBoundTo(ability) {
  return class BoundCan extends Can {
    __ability = ability;
  }
}

export createContextualCan(Consumer) {
  return function ContextualCan({ props }) {
    return React.createElement(Consumer, null, (ability) => {
      return React.createElement(Can, {
        ability,
        run: props.run,
        on: props.on,
        children: props.children
      });
    });
  }
}
