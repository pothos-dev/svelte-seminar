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

<div
  class="todo-list h-full flex flex-col justify-between bg-background text-foreground md:max-w-screen-md"
>
  <ul class="flex flex-col gap-2 p-4 items-stretch justify-end">
    {#each todos as todo (todo.id)}
      {@render TodoItem(todo)}
    {/each}
  </ul>
  <div class="flex flex-row gap-2 p-4">
    {@render Input()}
    <button class="clear" on:click={clear}>
      {@render CleanupIcon()}
    </button>
  </div>
</div>

{#snippet TodoItem(todo)}
  <li
    class="p-2 border border-foreground border-opacity-50 border-solid rounded-md"
    out:fly={{ x: 200, duration: 1000 }}
    in:fly={{ y: 1000, duration: 1000 }}
  >
    <button
      class="text-foreground"
      class:line-through={todo.done}
      class:opacity-50={todo.done}
      on:click={() => onClick(todo)}
    >
      {todo.text}
    </button>
  </li>
{/snippet}

{#snippet Input()}
  <input
    class="flex-1 border border-solid border-primary px-4 py-2 rounded-md bg-background"
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
