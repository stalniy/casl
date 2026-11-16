# @casl/svelte

[Svelte 5](https://svelte.dev) integration for [CASL](https://casl.js.org). Provide an application-owned Ability through component context and use reactive permission checks in templates and `$derived` expressions.

## Installation

```sh
pnpm add @casl/ability @casl/svelte
```

Requires `svelte: ^5.7.0` and `@casl/ability: ^7.1.3`. Svelte 3 and 4 are not supported. The package publishes compiled ES modules and TypeScript declarations; applications do not need to compile library rune source.

## Provide an Ability

Define the application's Ability type and a factory. This example uses MongoDB-style conditions; the integration also accepts other CASL Ability implementations and custom subject resolvers.

```ts
// ability.ts
import { createMongoAbility, type MongoAbility } from '@casl/ability';

export type AppAbility = MongoAbility<['read' | 'update', 'Article']>;
export type AppRules = Parameters<AppAbility['update']>[0];

export function createAppAbility(rules: AppRules): AppAbility {
  return createMongoAbility<AppAbility>(rules);
}
```

Call `provideAbility` during a parent component's initialization. The returned value is a reactive adapter around the supplied Ability.

```html
<!-- ArticlePage.svelte -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { provideAbility } from '@casl/svelte';
  import { createAppAbility, type AppRules } from './ability';
  import ArticleActions from './ArticleActions.svelte';

  let { initialRules }: { initialRules: AppRules } = $props();
  const ability = createAppAbility(untrack(() => initialRules));
  const permissions = provideAbility(ability);
</script>

<ArticleActions />
<button onclick={() => permissions.update([])}>Clear permissions</button>
```

`untrack` makes the initial rules capture explicit; later prop changes require an explicit refresh as described below. Each call to `provideAbility` creates one adapter. Descendants share that same adapter through context. A nested provider supplies its own adapter to its descendants without changing the surrounding tree's permissions.

## Check permissions in descendants

Call `useAbility<AppAbility>()` during component initialization. Use native Svelte `{#if}` blocks for conditional UI:

```html
<!-- ArticleActions.svelte -->
<script lang="ts">
  import { useAbility } from '@casl/svelte';
  import type { AppAbility } from './ability';

  const permissions = useAbility<AppAbility>();
  const { can, cannot, relevantRuleFor, update } = permissions;
  const canEdit = $derived(can('update', 'Article', 'title'));
  const denialReason = $derived(
    cannot('update', 'Article')
      ? relevantRuleFor('update', 'Article')?.reason
      : undefined
  );
</script>

{#if permissions.can('read', 'Article')}
  <a href="/articles">Read articles</a>
{/if}
{#if canEdit}
  <a href="/articles/edit">Edit title</a>
{/if}
{#if denialReason}
  <p>{denialReason}</p>
{/if}
<button onclick={() => update([])}>Clear permissions</button>
```

All four methods work when destructured. The context generic is a caller assertion: Svelte context cannot infer the Ability type from the parent, and this generic does not validate it at runtime. Share `AppAbility` with consumers to preserve action, subject, field, update rule, and returned rule types. Omitting the generic uses `AnyAbility` and loses application-specific restrictions.

Checks on a subject name concern the subject type. To evaluate conditions against a particular record, pass the subject instance recognized by your Ability's subject resolver, as you would with CASL core.

## Update and refresh permissions

Update the adapter or retain the original Ability for permission refresh. Both paths invalidate reactive checks:

```ts
// In the provider component, after creating ability and permissions:
function refreshPermissions(rules: AppRules) {
  ability.update(rules);
}

function clearPermissions() {
  permissions.update([]);
}
```

Call these functions from application events, such as completing login, logout, or a permission refresh. The application owns fetching and validating permissions. Never mutate `ability.rules` directly. `update` executes synchronously and returns `void` on the adapter; do not call it from templates or `$derived` expressions. Event handlers such as `onclick` are appropriate.

The provider retains the Ability instance passed during initialization. Reassigning a local Ability variable or changing `initialRules` alone does not replace or update it. For refreshed rules, call `update`. To replace the Ability instance, remount the provider and its descendant subtree, for example with a Svelte `{#key}` block around the provider component. Do not call `provideAbility` again to refresh mounted descendants.

## Reactivity and cleanup

`can`, `cannot`, and `relevantRuleFor` register a dependency when called in a Svelte reactive computation. Checks in templates and `$derived` automatically observe the supplied Ability's `updated` events, including updates through the original Ability and updates that reuse the same rules array. No store subscription is required.

A direct check after a successful update reads current core state. DOM changes follow Svelte's normal scheduling, and an invalidated `$derived` recomputes when next read. Reactive action, subject, and field arguments also participate in Svelte's normal dependency tracking when the calling expression reads them. The adapter does not make plain objects or external facts deeply reactive.

Each adapter shares one core listener while it has tracked readers, even when many descendants call `useAbility`. The listener is removed after the last reader is destroyed. Readers that become active again see current rules. Calls outside reactive computations read current permissions without creating persistent subscriptions; server rendering does not leave a listener behind. The bridge uses Svelte's [createSubscriber](https://svelte.dev/docs/svelte/svelte-reactivity#createSubscriber).

## Server rendering and SvelteKit

Create a separate Ability for each request or independent render tree and call `provideAbility` during component initialization on both the server and client. A mutable, user-specific module singleton may be shared by server requests and expose one user's authorization state to another. Export a factory and create each instance within its request or component tree instead. See SvelteKit's guidance on [avoiding shared state on the server](https://svelte.dev/docs/kit/state-management#Avoid-shared-state-on-the-server).

For hydration, reconstruct the client Ability from permission inputs equivalent to those used for server rendering. Equivalent rules, matchers, subject resolution, and checked data must yield equivalent initial permission results. Initialize the provider before rendering permission-dependent UI on either side.

The `initialRules` prop above is an application input, not a package-provided transport protocol. In SvelteKit, the application can pass serializable permission data from its server load function and create the Ability in a layout or page component. Do not serialize a live Ability instance. Any transport or encoding is application-owned and must preserve the chosen rule semantics, including conditions, inverted rules, fields, and rule order. Custom matchers and resolvers must be configured appropriately on each side; functions and class instances cannot simply be transferred as JSON. Do not put secrets in client permission data.

SvelteKit may retain layouts across navigation. When permission data changes, explicitly update the retained Ability through the application's refresh flow, or remount its provider when replacing the instance. Initializing from a prop once does not synchronize later prop changes.

This package integrates UI checks. Enforce protected operations independently with CASL core on the server using trusted request-specific permissions and the actual resource. Hiding a button does not authorize a server action. Authentication, loading permissions, SvelteKit hooks, guards, and server enforcement belong to the application.

## API

The package exports `provideAbility`, `useAbility`, and the `ReactiveAbility` type:

```ts
import type { AnyAbility } from '@casl/ability';

interface ReactiveAbility<T extends AnyAbility> {
  can: T['can'];
  cannot: T['cannot'];
  relevantRuleFor: T['relevantRuleFor'];
  update: (...args: Parameters<T['update']>) => void;
}

function provideAbility<T extends AnyAbility>(ability: T): ReactiveAbility<T>;
function useAbility<T extends AnyAbility = AnyAbility>(): ReactiveAbility<T>;
```

### provideAbility(ability)

Creates an adapter for the supplied Ability, stores it in the current component's context, and returns it. The Ability type is inferred from the argument. Call during component initialization. Each provider retains its initial instance for its lifetime.

### useAbility<AppAbility>()

Returns the same adapter stored by the nearest provider. Call during component initialization. Throws a descriptive error identifying `provideAbility` when no provider exists. There is no default Ability or module-level authorization state.

### ReactiveAbility<T>

The adapter exposes exactly four methods, each delegated to the supplied Ability instance:

| Method | Behavior |
| --- | --- |
| `can(...args)` | Returns the core permission result and tracks rule updates in reactive computations. Preserves `T['can']` parameters and return type. |
| `cannot(...args)` | Returns the core denial result and tracks rule updates. Preserves `T['cannot']` parameters and return type. |
| `relevantRuleFor(...args)` | Returns the core rule object or `null` and tracks rule updates, including changes to a rule's reason. Preserves `T['relevantRuleFor']` parameters and return type. |
| `update(...args)` | Delegates synchronously to the supplied Ability's public `update`, preserving its rule input type, and returns `void`. Does not register a reactive read. |

The adapter preserves custom Ability behavior and delegates condition matching, subject resolution, and field restrictions to CASL core. It does not replace core methods or expose an `.ability` property; retain the original Ability for other operations. Returned rule objects are the core objects, without copying. Core evaluation and update errors propagate to the caller.

## Development

From the repository root:

```sh
pnpm install
pnpm --filter @casl/ability build
pnpm --filter @casl/svelte lint
pnpm --filter @casl/svelte typecheck
pnpm --filter @casl/svelte test
```

Tests use Jest through the shared CASL DX tooling and Svelte's compiler. Jest runs with Node's ES module support to load compiled Svelte fixtures. Svelte fixtures live in `spec/fixtures`; generated fixture modules are temporary and are removed after each test.
