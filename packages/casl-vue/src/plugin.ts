import { App } from 'vue';
import { AnyAbility, PureAbility } from '@casl/ability';
import { ABILITY_TOKEN } from './useAbility';
import { reactiveAbility } from './reactiveAbility';

export interface AbilityPluginOptions {
  useGlobalProperties?: boolean
}

export function abilitiesPlugin(app: App, ability: AnyAbility, options?: AbilityPluginOptions) {
  if (!ability || !(ability instanceof PureAbility)) {
    throw new Error('Please provide an Ability instance to abilitiesPlugin plugin');
  }

  app.provide(ABILITY_TOKEN, reactiveAbility(ability));

  if (options && options.useGlobalProperties) {
    app.config.globalProperties.$ability = ability;
    app.config.globalProperties.$can = ability.can.bind(ability);
  }
}
