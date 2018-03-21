import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Ability } from '@casl/ability';

const noop = () => {};

export default class Can extends PureComponent {
  static propTypes = {
    do: PropTypes.string.isRequired,
    on: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    children: PropTypes.any.isRequired,
    ability: PropTypes.instanceOf(Ability).isRequired
  };

  constructor(...args) {
    super(...args);

    this.unsubscribeFromAbility = noop;
    this.state = {
      ability: this.props.ability,
      allowed: false
    };
  }

  get allowed() {
    return this.state.allowed;
  }

  componentWillReceiveProps(props) {
    if (props.ability && this.state.ability !== props.ability) {
      this.connectToAbility(props.ability);
      this.setState({ ability: props.ability });
    }
  }

  componentWillMount() {
    this.connectToAbility(this.state.ability);
  }

  componentWillUnmount() {
    this.unsubscribeFromAbility();
  }

  connectToAbility(ability) {
    this.unsubscribeFromAbility();

    if (ability) {
      this.unsubscribeFromAbility = ability.on('updated', () => this.recheck());
      this.recheck();
    }
  }

  recheck() {
    return this.setState({ allowed: this.check() });
  }

  check() {
    return this.state.ability.can(this.props.do, this.props.on);
  }

  render() {
    return this.state.allowed ? this.renderChildren() : '';
  }

  renderChildren() {
    const { children } = this.props;

    return typeof children === 'function' ? children(this.state.ability) : React.Children.only(children);
  }
}
