import { inject, Injectable, type OnDestroy, signal } from "@angular/core";
import { Ability, type AnyAbility, type RawRuleOf } from "@casl/ability";

@Injectable({ providedIn: 'root' })
export class AbilityServiceSignal<T extends AnyAbility> implements OnDestroy {
  private readonly _rules = signal<RawRuleOf<T>[]>([]);
  private readonly _ability = inject(Ability) as unknown as T;
  private readonly _disposeAbilitySubscription: () => void;

  constructor() {
    this._disposeAbilitySubscription = this._ability.on('updated', (event) => {
      this._rules.set(event.rules as any);
    });
  }

  ngOnDestroy(): void {
    this._disposeAbilitySubscription();
  }

  can: T['can'] = (...args) => {
    this._rules(); // generate side effect for angular to track changes in this signal
    return this._ability.can(...args);
  };

  cannot: T['cannot'] = (...args) => {
    return !this.can(...args);
  };

  update(rules: T['rules']): void {
    this._ability.update(rules);
  }
}
