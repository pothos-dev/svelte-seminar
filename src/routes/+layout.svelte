<script lang="ts">
  import "../app.css"
  import ThemePicker, { type Theme } from "./ThemePicker.svelte"

  let theme = $state("light" as Theme)
  $effect(() => {
    theme = (localStorage.getItem("theme") as Theme) ?? theme
  })
  $effect(() => {
    localStorage.setItem("theme", theme)
  })
</script>

<ThemePicker bind:theme />

<main
  data-theme={theme}
  class="bg-background min-h-screen text-text transition-all duration-300 flex flex-col"
>
  <slot />
</main>
