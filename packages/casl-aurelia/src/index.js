import { Ability } from '@casl/ability';

export { CanValueConverter } from './value-converter/can';

export function configure(config, providedAbility) {
  config.globalResources('./value-converter/can');

  if (providedAbility && providedAbility instanceof Ability) {
    config.container.registerInstance(Ability, providedAbility);
  }
}
