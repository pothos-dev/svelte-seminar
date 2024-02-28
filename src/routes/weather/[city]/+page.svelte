<script lang="ts">
  let { data } = $props()
  let { city, weather, description } = data
  let { temp, feels_like, humidity } = weather.current
</script>

<section>
  <header>
    <p>Welcome {city}!</p>
    <p>Your temperature is {temp}°, but feels like {feels_like}°</p>
    <p>The humidity is {humidity}%</p>
  </header>

  <main>
    {#await description}
      <p>Loading...</p>
    {:then text}
      <p>{text}</p>
    {/await}
  </main>
</section>

<style lang="postcss">
  section {
    @apply m-4 max-w-screen-md;
  }

  header {
    @apply text-sm mb-4;
  }
</style>
