<script lang="ts">
  import { page } from "$app/stores"
  import ThemePicker, { type Theme } from "$lib/components/ThemePicker.svelte"
  import "../app.css"
  import type { PageData } from "./$types"

  let { ipAddress } = $page.data as PageData

  let theme = $state("forest" as Theme)
</script>

<div data-theme={theme} class="bg-background w-screen h-screen flex flex-col">
  <header
    class="h-12 bg-foreground bg-opacity-5 drop-shadow-md flex flex-row items-center text-foreground px-4"
  >
    Hello {ipAddress}
  </header>
  <slot />
</div>

<ThemePicker bind:theme />
