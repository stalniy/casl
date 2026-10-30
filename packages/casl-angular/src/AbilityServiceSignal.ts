import { computed, inject, Injectable, isSignal, OnDestroy, signal, Signal } from "@angular/core";
import { AnyAbility, Ability, RawRuleOf } from "@casl/ability";

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

  private _getReactiveAbility(): T {
    this._rules(); // generate side effect for angular to track changes in this signal
    return this._ability;
  }

  can: T['can'] = (...args) => {
    return this._getReactiveAbility().can(...args);
  };

  cannot: T['cannot'] = (...args) => {
    return !this.can(...args);
  };

  deferCan(...args: WithSignals<Parameters<T['can']>>): Signal<boolean> {
    return computed(() => this.can(...unwrapSignals(args)));
  }

  deferCannot(...args: WithSignals<Parameters<T['can']>>): Signal<boolean> {
    return computed(() => this.cannot(...unwrapSignals(args)));
  }

  whyCan = (...args: Parameters<T['can']>): ResultWithReason | null => {
    const rule = this._getReactiveAbility().relevantRuleFor(...args);
    if (!rule || rule.inverted) return null;
    return { reason: rule.reason };
  };

  whyCannot = (...args: Parameters<T['can']>): ResultWithReason | null => {
    const rule = this._getReactiveAbility().relevantRuleFor(...args);
    if (rule && !rule.inverted) return null;
    return { reason: rule?.reason };
  };

  deferWhyCan(...args: WithSignals<Parameters<T['can']>>): Signal<ResultWithReason | null> {
    return computed(() => this.whyCan(...unwrapSignals(args)));
  }

  deferWhyCannot(...args: WithSignals<Parameters<T['can']>>): Signal<ResultWithReason | null> {
    return computed(() => this.whyCannot(...unwrapSignals(args)));
  }

  update(rules: T['rules']): void {
    this._ability.update(rules);
  }
}

export interface ResultWithReason {
  reason: string | undefined;
}

type WithSignals<T extends any[]> = { [K in keyof T]: T[K] | Signal<T[K]> };
function unwrapSignals<T extends any[]>(args: WithSignals<T>): T {
  const values = new Array(args.length) as T;
  for (let i = 0, length = args.length; i < length; i++) {
    const arg = args[i];
    values[i] = isSignal(arg) ? arg() : arg;
  }
  return values;
}
