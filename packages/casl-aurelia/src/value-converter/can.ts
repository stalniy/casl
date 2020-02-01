import { signalBindings } from 'aurelia-framework';
import { Ability, CanArgsType } from '@casl/ability';

const ABILITY_CHANGED_SIGNAL = 'caslAbilityChanged';
const HAS_AU_SUBSCRIPTION = new WeakMap<Ability, boolean>();

export class CanValueConverter {
  signals = [ABILITY_CHANGED_SIGNAL];

  static inject = [Ability];

  static $resource = {
    name: 'can',
    type: 'valueConverter'
  };

  private _ability: Ability;

  constructor(ability: Ability) {
    this._ability = ability;
  }

  toView(subject: CanArgsType[1], action: CanArgsType[0], field?: CanArgsType[2]) {
    if (!HAS_AU_SUBSCRIPTION.has(this._ability)) {
      this._ability.on('updated', () => signalBindings(ABILITY_CHANGED_SIGNAL));
      HAS_AU_SUBSCRIPTION.set(this._ability, true);
    }

    return this._ability.can(action, subject, field);
  }
}
