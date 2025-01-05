import { inject, Injectable, OnDestroy, signal } from "@angular/core";
import { AnyAbility, PureAbility, RawRuleOf } from "@casl/ability";

@Injectable({ providedIn: 'root' })
export class AbilityServiceSignal<T extends AnyAbility> implements OnDestroy {
  private readonly _rules = signal<RawRuleOf<T>[]>([]);
  private readonly _ability = inject(PureAbility) as unknown as T;
  private readonly _disposeAbilitySubscription: () => void;

  constructor() {
    this._disposeAbilitySubscription = this._ability.on('updated', (event) => {
      this._rules.set(event.rules as any);
    });
  }

  ngOnDestroy(): void {
    this._disposeAbilitySubscription();
  }

  can = (...args: Parameters<T['can']>): boolean => {
    this._rules(); // generate side effect for angular to track changes in this signal
    return this._ability.can(...args);
  };

  cannot = (...args: Parameters<T['can']>): boolean => {
    return !this.can(...args);
  };

  update(rules: T['rules']): void {
    this._ability.update(rules);
  }
}