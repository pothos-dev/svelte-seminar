<script lang="ts" context="module">
  export const themes = ["light", "dark", "forest", "ocean", "fire"] as const
  export type Theme = (typeof themes)[number]
</script>

<script lang="ts">
  import { slide } from "svelte/transition"

  let { theme } = $props<{ theme: Theme }>()

  function toggleTheme() {
    const currentIndex = themes.indexOf(theme)
    theme = themes[(currentIndex + 1) % themes.length]
  }

  let icon = $derived.by(() => {
    if (theme === "light") return "🌞"
    if (theme === "dark") return "🌙"
    if (theme === "forest") return "🌲"
    if (theme === "ocean") return "🌊"
    if (theme === "fire") return "🔥"
  })
</script>

{#key theme}
  <button transition:slide={{ axis: "x" }} onclick={toggleTheme}>
    {icon}
  </button>
{/key}

<slot />

<style lang="postcss">
  button {
    @apply absolute top-0 right-0;
    @apply text-3xl;
    @apply cursor-pointer;
  }
</style>
