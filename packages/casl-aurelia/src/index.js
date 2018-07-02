import { Ability } from '@casl/ability';
import { ValueConverterResource } from 'aurelia-binding';
import { CanValueConverter } from './value-converter/can';

export { CanValueConverter } from './value-converter/can';

export function configure(config, providedAbility) {
  if (providedAbility && providedAbility instanceof Ability) {
    config.container.registerInstance(Ability, providedAbility);
  }

  config.globalResources([CanValueConverter])
}
