import { FrameworkConfiguration } from 'aurelia-framework'

export declare class CanValueConverter {
  constructor(ability: Ability)

  toView(subject: any, action: string): boolean
}

export function configure(config: FrameworkConfiguration, ability?: Ability): void

