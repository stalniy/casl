import { FrameworkConfiguration } from 'aurelia-framework';
import { PureAbility, AnyAbility } from '@casl/ability';
import { CanValueConverter, AbleValueConverter } from './value-converter/can';

export { CanValueConverter, AbleValueConverter } from './value-converter/can';

export function configure(config: FrameworkConfiguration, defaultAbility?: AnyAbility) {
  if (defaultAbility && defaultAbility instanceof PureAbility) {
    config.container.registerInstance(PureAbility, defaultAbility);
  }

  config.globalResources([
    CanValueConverter,
    AbleValueConverter
  ]);
}
