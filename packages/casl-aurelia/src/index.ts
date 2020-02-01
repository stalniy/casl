import { FrameworkConfiguration } from 'aurelia-framework';
import { Ability } from '@casl/ability';
import { CanValueConverter } from './value-converter/can';

export { CanValueConverter } from './value-converter/can';

export function configure(config: FrameworkConfiguration, providedAbility?: Ability) {
  if (providedAbility && providedAbility instanceof Ability) {
    config.container.registerInstance(Ability, providedAbility);
  }

  config.globalResources([CanValueConverter]);
}
