<script>
  import Provider from './Provider.svelte';
  import Reader from './Reader.svelte';
  let { ability, nested, capture = () => {} } = $props();
  let first = $state(true);
  let second = $state(true);
  let action = $state('read');
  let subject = $state('Post');
  let field = $state(undefined);
  export function replace(value) { ability = value; }
  export function readers(a, b) { first = a; second = b; }
  export function check(a, s, f) { action = a; subject = s; field = f; }
</script>

<Provider {ability} capture={(adapter) => capture('provider', adapter)}>
  {#if first}<Reader id="first" {action} {subject} {field} capture={(adapter) => capture('first', adapter)} />{/if}
  {#if second}<Reader id="second" capture={(adapter) => capture('second', adapter)} />{/if}
  {#if nested}
    <Provider ability={nested} capture={(adapter) => capture('nested', adapter)}>
      <Reader id="nested" capture={(adapter) => capture('nestedReader', adapter)} />
    </Provider>
  {/if}
</Provider>
