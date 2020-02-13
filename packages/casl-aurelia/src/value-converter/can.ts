import { signalBindings } from 'aurelia-framework';
import { Ability, Subject } from '@casl/ability';

const ABILITY_CHANGED_SIGNAL = 'caslAbilityChanged';
const HAS_AU_SUBSCRIPTION = new WeakMap<object, boolean>();

export class CanValueConverter<A extends string, S extends Subject, C> {
  static inject = [Ability];
  static $resource = {
    name: 'can',
    type: 'valueConverter'
  };

  public readonly signals = [ABILITY_CHANGED_SIGNAL];
  private readonly _ability: Ability<A, S, C>;

  constructor(ability: Ability<A, S, C>) {
    this._ability = ability;
  }

  toView(subject: S, action: A, field?: string) {
    if (!HAS_AU_SUBSCRIPTION.has(this._ability)) {
      this._ability.on('updated', () => signalBindings(ABILITY_CHANGED_SIGNAL));
      HAS_AU_SUBSCRIPTION.set(this._ability, true);
    }

    return this._ability.can(action, subject, field);
  }
}
