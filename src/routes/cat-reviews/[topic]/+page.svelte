<script lang="ts">
  import type { PageData, RouteParams } from "./$types"
  import { page } from "$app/stores"

  let { data, params } = $page
  let { review, image } = data as PageData
  let { topic } = params as RouteParams

  let dots = $state("")

  $effect(() => {
    setInterval(() => {
      dots = dots + "."
      if (dots.length > 3) dots = ""
    }, 300)
  })
</script>

<div class="container">
  <div class="header">My thoughts about {topic}?</div>
  <div class="review">
    {#await review}
      <div>Let me think{dots}</div>
    {:then { text, rating, relatedTopics }}
      <div>{text}</div>
      <div>Rating: {rating}</div>
      <div>Related topics: {relatedTopics.join(", ")}</div>
    {:catch error}
      <div class="error">Oh no, I haz the dumb: {error}</div>
    {/await}
  </div>
  <div class="image">
    {#await image then { , revised_prompt }}
      <img src={url} alt={revised_prompt} />
    {:catch error}
      <div class="error">Oh no, I haz the dumb: {error}</div>
    {/await}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
    height: 100vh;
  }

  .header {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .review {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
</style>
