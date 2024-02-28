<script lang="ts">
  import { page } from "$app/stores"
  import { fly } from "svelte/transition"

  type TodoItem = { id: string; text: string; done?: boolean }

  let newTodoText = $state("")
  let placeholder = $state($page.data.placeholder)

  let todos = $state([
    {
      id: "1",
      text: "Learn SvelteKit",
      done: true,
    },
    {
      id: "2",
      text: "Build something cool",
    },
    {
      id: "3",
      text: "Profit",
    },
  ])

  function submit() {
    if (!newTodoText) return
    todos.push({ id: createId(), text: newTodoText })
    newTodoText = ""
    placeholder = generatePlaceholder()
  }

  function onClick(todo: TodoItem) {
    todo.done = !todo.done
  }

  function clear() {
    todos = todos.filter((todo) => !todo.done)
  }

  function generatePlaceholder() {
    const list = [
      "I need to buy milk...",
      "Walk the dog...",
      "Call mom...",
      "Learn about Svelte...",
      "Build something cool...",
    ]
    const index = Math.floor(Math.random() * list.length)
    return list[index]
  }

  function createId() {
    return Math.random().toString(36).substr(2, 9)
  }
</script>

<div class="todo-list">
  <ul>
    {#each todos as todo (todo.id)}
      {@render TodoItem(todo)}
    {/each}
  </ul>

  <div class="controls">
    {@render Input()}
    <button class="clear" on:click={clear}>
      {@render CleanupIcon()}
    </button>
  </div>
</div>

{#snippet TodoItem(todo)}
  <li out:fly={{ x: 200, duration: 1000 }} in:fly={{ y: 1000, duration: 1000 }}>
    <button class:done={todo.done} on:click={() => onClick(todo)}>
      {todo.text}
    </button>
  </li>
{/snippet}

{#snippet Input()}
  <input
    type="text"
    {placeholder}
    bind:value={newTodoText}
    on:keydown={(e) => e.key === "Enter" && submit()}
  />
{/snippet}

{#snippet CleanupIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    ><path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 6h12M6 12h12M4 18h12"
    />
  </svg>
{/snippet}

<style lang="postcss">
  .todo-list {
    @apply h-full w-full max-w-screen-sm;
    @apply flex flex-col justify-between;
  }

  ul {
    @apply p-4;
    @apply flex flex-col gap-2 items-stretch;
  }

  li > button {
    @apply w-full p-2;
    @apply border border-foreground border-opacity-50 border-solid rounded-md;
    @apply text-start;
  }

  li > button.done {
    @apply line-through opacity-25;
  }

  .controls {
    @apply flex flex-row items-center gap-2 p-4;
  }

  input {
    @apply flex-1 px-4 py-2;
    @apply bg-background;
    @apply border border-solid border-primary rounded-md;
  }

  button.clear {
    @apply aspect-square rounded-full p-1;
  }

  button,
  input {
    @apply hover:bg-foreground hover:bg-opacity-10;
    @apply transition-all duration-300;
  }
</style>
