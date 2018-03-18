import { Ability } from '@casl/ability';
import { ValueConverterResource } from 'aurelia-binding';
import { CanValueConverter } from './value-converter/can';

export { CanValueConverter } from './value-converter/can';
export function configure(config, providedAbility) {
  // TODO: replace with easier API after https://github.com/aurelia/framework/pull/858 is done
  config.postTask(() => {
    const resource = new ValueConverterResource('can');

    resource.initialize(config.container, CanValueConverter);
    resource.register(config.aurelia.resources);
  });

  if (providedAbility && providedAbility instanceof Ability) {
    config.container.registerInstance(Ability, providedAbility);
  }
}
