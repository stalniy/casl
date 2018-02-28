import { Ability } from '@casl/ability';

export const ABILITY_CHANGED_SIGNAL = 'caslAbilityChanged';

export class CanValueConverter {
  signals = [ABILITY_CHANGED_SIGNAL];

  static inject = [Ability];

  constructor(ability) {
    this.ability = ability;
  }

  toView(subject, action) {
    return this.ability.can(action, subject);
  }
}
