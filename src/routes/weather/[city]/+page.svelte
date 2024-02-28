<script lang="ts">
  import { completeText } from "$lib/openai"

  let { data } = $props()
  let { city, weather, chatterPrompt } = data
  let { temp, feels_like, humidity } = weather.current

  let chatter = completeText(chatterPrompt)
</script>

<section>
  <header>
    <p>Welcome {city}!</p>
    <p>Your temperature is {temp}°, but feels like {feels_like}°</p>
    <p>The humidity is {humidity}%</p>
  </header>

  <p>{$chatter}</p>

  <!-- <main>
    {#await chatterPromise}
      <p>Loading...</p>
    {:then text}
      <p>{text}</p>
    {/await}
  </main> -->
</section>

<style lang="postcss">
  section {
    @apply m-4 max-w-screen-md;
  }

  header {
    @apply text-sm mb-4;
  }
</style>
