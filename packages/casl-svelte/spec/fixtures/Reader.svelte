<script>
  import { untrack } from 'svelte';
  import { useAbility } from '@casl/svelte';
  let { id, action = 'read', subject = 'Post', field = undefined, capture = () => {} } = $props();
  const adapter = useAbility();
  const { can, cannot, relevantRuleFor } = adapter;
  untrack(() => capture(adapter));
  const allowed = $derived(can(action, subject, field));
  const denied = $derived(cannot(action, subject, field));
  const reason = $derived(relevantRuleFor(action, subject, field)?.reason ?? 'none');
</script>

<p data-id={id}>{allowed}:{denied}:{reason}:{adapter.can(action, subject, field)}</p>
