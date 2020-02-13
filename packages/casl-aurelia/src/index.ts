import { FrameworkConfiguration } from 'aurelia-framework';
import { Ability, Subject } from '@casl/ability';
import { CanValueConverter } from './value-converter/can';

export { CanValueConverter } from './value-converter/can';

export function configure<
  A extends string = string,
  S extends Subject = Subject,
  C = object
>(config: FrameworkConfiguration, providedAbility?: Ability<A, S, C>) {
  if (providedAbility && providedAbility instanceof Ability) {
    config.container.registerInstance(
      Ability as unknown as Ability<A, S, C>,
      providedAbility
    );
  }

  config.globalResources([CanValueConverter]);
}
