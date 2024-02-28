<script lang="ts">
  import PageDebug from "$lib/components/PageDebug.svelte"
  import ThemePicker, { type Theme } from "$lib/components/ThemePicker.svelte"
  import "../app.css"

  let { data } = $props()

  let theme = $state("forest" as Theme)
</script>

<!-- Provide theme to all children -->
<div data-theme={theme}>
  <!-- ThemePicker in the top right corner -->
  <ThemePicker bind:theme />

  <!-- Page Metadata in the bottom right corner -->
  <PageDebug />

  <!-- App Header -->
  <header>
    Hello {data.ipAddress}
  </header>

  <!-- Page Content -->
  <slot />
</div>

<style lang="postcss">
  :global(body) {
    @apply flex min-h-screen;
  }

  div {
    @apply flex-1;
    @apply flex flex-col;
    @apply bg-background text-foreground;
  }

  header {
    @apply h-12 px-4;
    @apply bg-foreground bg-opacity-5;
    @apply drop-shadow-md;
    @apply flex flex-row items-center;
  }
</style>
