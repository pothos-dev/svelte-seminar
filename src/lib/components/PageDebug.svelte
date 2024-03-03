<script>
  import { browser } from "$app/environment"
  import { page } from "$app/stores"
  import { JsonView } from "@zerodevx/svelte-json-view"
</script>

<!-- Client-rendered only to prevent flickering -->
{#if browser}
  <aside>
    <JsonView json={$page} />
  </aside>
{/if}

<style lang="postcss">
  aside {
    @apply absolute right-0 bottom-0 p-2 max-w-96 max-h-96 overflow-scroll;
    @apply opacity-25 hover:opacity-100;
    @apply transition-all duration-300;
  }
</style>
