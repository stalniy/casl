import { FrameworkConfiguration } from 'aurelia-framework';
import { Ability, AnyAbility } from '@casl/ability';
import { CanValueConverter, AbleValueConverter } from './value-converter/can';

export { CanValueConverter, AbleValueConverter } from './value-converter/can';

export function configure<T extends AnyAbility>(
  config: FrameworkConfiguration,
  providedAbility?: T
) {
  if (providedAbility && providedAbility instanceof Ability) {
    config.container.registerInstance(
      Ability,
      providedAbility
    );
  }

  config.globalResources([
    CanValueConverter,
    AbleValueConverter
  ]);
}
