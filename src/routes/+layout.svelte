<script lang="ts">
  import ThemePicker, { type Theme } from "$lib/components/ThemePicker.svelte"
  import "../app.css"

  let { data } = $props()

  let theme = $state("forest" as Theme)
</script>

<!-- ThemePicker in the top right corner -->
<ThemePicker bind:theme />

<!-- Provide theme to all children -->
<div data-theme={theme}>
  <header>
    Hello {data.ipAddress}
  </header>
  <slot />
</div>

<style lang="postcss">
  div {
    @apply w-screen h-screen;
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
