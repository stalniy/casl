import { computed, inject, Injectable, isSignal, OnDestroy, signal, Signal } from "@angular/core";
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

  private _getReactiveAbility(): T {
    this._rules(); // generate side effect for angular to track changes in this signal
    return this._ability;
  }

  can = (...args: Parameters<T['can']>): boolean => {
    return this._getReactiveAbility().can(...args);
  };

  cannot = (...args: Parameters<T['can']>): boolean => {
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
    if (!rule) return null;
    return { result: !rule.inverted, reason: rule.reason };
  };

  whyCannot = (...args: Parameters<T['can']>): ResultWithReason | null => {
    const result = this.whyCan(...args);
    if (!result) return null;
    result.result = !result.result;
    return result;
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
  result: boolean;
  reason: string | undefined;
}

type WithSignals<T extends any[]> = { [K in keyof T]: T[K] | Signal<T[K]> };
function unwrapSignals<T extends any[]>(args: WithSignals<T>): T {
  return args.map(arg => isSignal(arg) ? arg() : arg) as T;
}
