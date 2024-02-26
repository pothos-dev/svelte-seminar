<script lang="ts" context="module">
  import { nanoid } from "nanoid"
  import { fly } from "svelte/transition"

  export type TodoItem = { id: string; text: string; done?: boolean }

  function randomPlaceholder() {
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

  let defaultTodos: TodoItem[] = [
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
  ]
</script>

<script lang="ts">
  let todos = $state(defaultTodos)

  let placeholder = $state(randomPlaceholder())
  let value = $state("")

  function submit() {
    if (!value) return
    todos.push({ id: nanoid(), text: value })
    value = ""
    placeholder = randomPlaceholder()
  }

  function onClick(todo: TodoItem) {
    todo.done = !todo.done
  }

  function clear() {
    todos = todos.filter((todo) => !todo.done)
  }
</script>

<ul>
  {#each todos as todo (todo.id)}
    {@render todoItem(todo)}
  {/each}
  {@render clearButton()}
  {@render todoInput()}
</ul>

{#snippet todoItem(todo: TodoItem)}
  <li>
    <button
      in:fly={{ y: 1000, opacity: 0, duration: 500 }}
      out:fly={{ x: 500, opacity: 0, duration: 500 }}
      class:done={todo.done}
      on:click={() => onClick(todo)}
    >
      {todo.text}
    </button>
  </li>
{/snippet}

{#snippet todoInput()}
  <input
    type="text"
    {placeholder}
    bind:value
    on:keydown={(e) => e.key === "Enter" && submit()}
  />
{/snippet}

{#snippet clearButton()}
  <button class="clear" on:click={clear}>🧹</button>
{/snippet}

<style lang="postcss">
  ul {
    @apply flex-1 p-4;
    @apply flex flex-col gap-1;
    @apply max-w-screen-md self-center w-full;
  }

  .clear {
    @apply text-3xl;
    @apply bg-text bg-opacity-5;
    @apply rounded-full;
    @apply p-2 aspect-square;

    @apply mt-auto;
    @apply self-end;
  }

  li > button {
    @apply bg-text bg-opacity-10;
    @apply px-4 py-2;
    @apply text-lg text-left;
    @apply w-full rounded-md;
    @apply transition-colors duration-200;
  }
  .done {
    @apply line-through;
    @apply text-text text-opacity-25;
  }

  input {
    @apply bg-primary bg-opacity-40;
    @apply placeholder-primary;
    @apply px-4 py-2 rounded-md;
    @apply text-lg;
  }
</style>
