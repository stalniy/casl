<script>
  import { untrack } from 'svelte';
  import { provideAbility } from '@casl/svelte';
  let { ability, capture = () => {}, children } = $props();
  const adapter = untrack(() => provideAbility(ability));
  untrack(() => capture(adapter));
</script>

{@render children()}
