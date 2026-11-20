import type { Ability, AnyAbility, TaggedSubject } from '@casl/ability';
import { provideAbility, useAbility, type ReactiveAbility } from '@casl/svelte';

type Post = { kind: 'Post'; title: string };
type User = { kind: 'User'; name: string };
type AppAbility = Ability<
  ['read' | 'edit', Post] | ['read', User],
  { owner: number },
  TaggedSubject<'kind'>
>;
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

// Compiled against the published declarations; invoked only during component initialization by apps.
export function providerContract(ability: AppAbility) {
  const adapter = provideAbility(ability);
  const inferred: Equal<typeof adapter, ReactiveAbility<AppAbility>> = true;
  return { inferred, adapter };
}

export function descendantContract() {
  const { can, cannot, relevantRuleFor, update } = useAbility<AppAbility>();
  const sameCan: Equal<typeof can, AppAbility['can']> = true;
  const sameCannot: Equal<typeof cannot, AppAbility['cannot']> = true;
  const sameRule: Equal<typeof relevantRuleFor, AppAbility['relevantRuleFor']> = true;
  const sameUpdate: Equal<Parameters<typeof update>, Parameters<AppAbility['update']>> = true;
  const result: void = update([{ action: 'edit', subject: 'Post', conditions: { owner: 1 } }]);
  const allowed: boolean = can('edit', { kind: 'Post', title: 'title' }, 'title');
  cannot('read', 'User', 'name');
  const rule: ReturnType<AppAbility['relevantRuleFor']> = relevantRuleFor('read', 'Post');
  // @ts-expect-error unknown action
  can('delete', 'Post');
  // @ts-expect-error invalid action/subject combination
  cannot('edit', 'User');
  // @ts-expect-error invalid action/subject combination
  relevantRuleFor('edit', { kind: 'User', name: 'name' });
  // @ts-expect-error invalid rule action/subject combination
  update([{ action: 'edit', subject: 'User' }]);
  // @ts-expect-error invalid condition type
  update([{ action: 'read', subject: 'Post', conditions: { owner: '1' } }]);
  // @ts-expect-error incomplete subject instance
  can('read', { kind: 'Post' });
  // @ts-expect-error the adapter exposes exactly the four methods
  const rawAbility = useAbility<AppAbility>().ability;
  const fallback: ReactiveAbility<AnyAbility> = useAbility();
  fallback.can('anything', 'Anything');
  return { sameCan, sameCannot, sameRule, sameUpdate, result, allowed, rule, rawAbility };
}
