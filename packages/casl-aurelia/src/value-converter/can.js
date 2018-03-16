import { signalBindings } from 'aurelia-binding';
import { Ability } from '@casl/ability';

const ABILITY_CHANGED_SIGNAL = 'caslAbilityChanged';
const ABILITY_HAS_SUBSCRIPTION_FIELD = typeof Symbol === 'undefined' ? `__hasAuSubscription${Date.now()}` : Symbol('hasAuSubscription')

export class CanValueConverter {
  signals = [ABILITY_CHANGED_SIGNAL];

  static inject = [Ability];

  constructor(ability) {
    this.ability = ability;
  }

  toView(subject, action) {
    if (!this.ability[ABILITY_HAS_SUBSCRIPTION_FIELD]) {
      this.ability.on('updated', () => signalBindings(ABILITY_CHANGED_SIGNAL));
      this.ability[ABILITY_HAS_SUBSCRIPTION_FIELD] = true
    }

    return this.ability.can(action, subject);
  }
}
