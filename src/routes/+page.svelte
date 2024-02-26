<script lang="ts">
  type TodoItem = { id: string; text: string; done?: boolean }

  let value = $state("")
  let placeholder = $state("")

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

  $effect(() => {
    placeholder = generatePlaceholder()
  })

  function submit() {
    if (!value) return
    todos.push({ id: createId(), text: value })
    value = ""
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

<ul>
  {#each todos as todo (todo.id)}
    <li>
      <button on:click={() => onClick(todo)}>
        {todo.text}
      </button>
    </li>
  {/each}
  <button class="clear" on:click={clear}>🧹</button>
  <input
    type="text"
    {placeholder}
    bind:value
    on:keydown={(e) => e.key === "Enter" && submit()}
  />
</ul>
