import { Ability } from '@casl/ability';
import { signalBindings } from 'aurelia-binding';
import { ABILITY_CHANGED_SIGNAL } from './value-converter/can';

export default function configureAbility(config, providedAbility) {
  let ability;

  if (providedAbility && providedAbility instanceof Ability) {
    config.container.registerInstance(Ability, providedAbility);
  }

  ability = config.container.get(Ability);

  return ability.on('updated', () => signalBindings(ABILITY_CHANGED_SIGNAL));
}
