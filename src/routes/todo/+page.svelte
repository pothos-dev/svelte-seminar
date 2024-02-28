<script lang="ts">
  import TodoList from "$lib/components/TodoList.svelte"
</script>

<div>
  <TodoList />
</div>

<style lang="postcss">
  div {
    @apply h-full;
    @apply flex flex-col items-center;
  }
</style>
