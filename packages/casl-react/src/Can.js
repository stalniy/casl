import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ability from '../config/ability';

const noop = () => {};

export default class Can extends PureComponent {
  static propTypes = {
    run: PropTypes.string,
    on: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  };

  unsubscribeFromAbility = noop;
  state = {
    allowed: false
  };

  get allowed() {
    return this.state.allowed;
  }

  componentWillMount() {
    this.unsubscribeFromAbility = ability.on('update', () => {
      setTimeout(() => this.recheck(), 0)
    });
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
