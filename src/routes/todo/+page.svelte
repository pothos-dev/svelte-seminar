<script>
  import { slide } from "svelte/transition"

  let todos = $state([
    {
      id: 1,
      title: "Do the laundry",
      completed: false,
    },
    {
      id: 2,
      title: "Do the dishes",
      completed: true,
    },
    {
      id: 3,
      title: "Do the shopping",
      completed: false,
    },
  ])

  let anyCompleted = $derived(todos.some((todo) => todo.completed))

  function clearCompleted() {
    todos = todos.filter((todo) => !todo.completed)
  }

  function onClick(todo) {
    todo.completed = !todo.completed
  }

  let text = $state("")
  function addTodo() {
    if (!text) return

    todos.push({
      id: todos.length + 1,
      title: text,
      completed: false,
    })
    text = ""
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      addTodo()
    }
  }
</script>

<div class="container">
  <!-- Clear done -->
  <button
    class="clear"
    class:opacity-0={!anyCompleted}
    on:click={clearCompleted}>Clear done</button
  >

  <!-- List of Todos -->
  {#each todos as todo (todo.id)}
    <button
      class="todo"
      class:completed={todo.completed}
      in:slide
      out:slide
      on:click={() => onClick(todo)}
    >
      {todo.title}
    </button>
  {/each}

  <!-- Input -->
  <input
    type="text"
    placeholder="Add a new todo"
    bind:value={text}
    on:keydown={onKeyDown}
  />
</div>

<style>
  .container {
    @apply max-w-sm mx-auto flex flex-col gap-2;
  }

  button,
  input {
    @apply border border-solid px-4 py-2 cursor-pointer;
  }

  .clear {
    @apply border-red-500 text-red-500 transition duration-300;
  }

  .todo.completed {
    @apply line-through text-slate-800;
  }

  input {
    @apply text-black;
  }
</style>
