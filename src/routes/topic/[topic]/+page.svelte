<script lang="ts">
  import { page } from "$app/stores"
  import type { PageData } from "./$types"

  export let data: PageData

  $: topic = $page.params.topic
  $: cards = data.flashcards
</script>

<p>The current topic is {topic}</p>

{#await cards}
  <p>loading...</p>
{:then cards}
  {#each cards as card}
    <div>
      <h2>{card.question}</h2>
      <p>{card.answer}</p>
      <p>Links:</p>
      <ul>
        {#each card.links as link}
          <li><a href={"/topic/" + link}>{link}</a></li>
        {/each}
      </ul>
    </div>
  {/each}
{:catch error}
  <p>error: {error.message}</p>
{/await}

<style>
  div {
    border: 1px solid black;
    padding: 1rem;
    margin: 1rem;
  }
</style>
