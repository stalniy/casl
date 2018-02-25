import configureAbility from './configure';

export { CanValueConverter } from './value-converter/can';

export function configure(config, providedAbility) {
  config.globalResources('./value-converter/can');
  config.preTask(() => configureAbility(config, providedAbility));
}
