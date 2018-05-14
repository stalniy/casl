import { createElement } from 'react';
import PropTypes from 'prop-types';
import { Ability } from '@casl/ability';
import Can from './Can';

export function createCanBoundTo(ability) {
  return class BoundCan extends Can {
    static propTypes = Object.assign({}, Can.propTypes, {
      ability: PropTypes.instanceOf(Ability)
    });

    constructor(...args) {
      super(...args);
      this.state.ability = this.state.ability || ability;
    }
  };
}

export function createContextualCan(Consumer) {
  return function ContextualCan(props) {
    return createElement(Consumer, null, ability => createElement(Can, {
      ability: props.ability || ability,
      I: props.I || props.do,
      a: props.a || props.of || props.this || props.on,
      children: props.children
    }));
  };
}
