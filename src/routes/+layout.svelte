<script>
  import "../app.css"
</script>

<slot />

<style>
  :global(body) {
    @apply bg-background text-foreground;
  }
</style>
