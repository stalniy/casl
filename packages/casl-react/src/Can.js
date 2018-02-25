import React, { PureComponent } from 'react';

const noop = () => {};

export default class Can extends PureComponent {
  unsubscribeFromAbility = noop;
  state = {
    allowed: false
  };

  get allowed() {
    return this.state.allowed;
  }

  componentWillMount() {
    this.unsubscribeFromAbility = ability.on('updated', () => this.recheck());
    this.recheck();
  }

  componentWillUnmount() {
    this.unsubscribeFromAbility();
  }

  recheck() {
    return this.setState({ allowed: this.check() });
  }

  check() {
    return ability.can(this.props.run, this.props.on);
  }

  render() {
    return this.state.allowed ? React.Children.only(this.props.children) : '';
  }
}
