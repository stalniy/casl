import { Pipe } from '@angular/core'
import { Ability } from '@casl/ability'

@Pipe({ name: 'can' })
export class CanPipe {
  constructor(private ability: Ability) {}

  transform(resource, action) {
    return this.ability.can(action, resource)
  }
}
