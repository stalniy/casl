import { FrameworkConfiguration } from 'aurelia-framework';
import { PureAbility, AnyAbility } from '@casl/ability';
import { CanValueConverter, AbleValueConverter } from './value-converter/can';

export { CanValueConverter, AbleValueConverter } from './value-converter/can';

export function configure<T extends AnyAbility>(
  config: FrameworkConfiguration,
  providedAbility?: T
) {
  if (providedAbility && providedAbility instanceof PureAbility) {
    config.container.registerInstance(
      PureAbility,
      providedAbility
    );
  }

  config.globalResources([
    CanValueConverter,
    AbleValueConverter
  ]);
}
