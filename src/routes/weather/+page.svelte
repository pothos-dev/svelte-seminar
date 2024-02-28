<script lang="ts" context="module">
  let cities = [
    "Vienna",
    "Berlin",
    "Amsterdam",
    "Paris",
    "London",
    "Madrid",
    "Rome",
    "Lisbon",
    "Prague",
    "Budapest",
    "Warsaw",
    "Stockholm",
  ]
</script>

{#each cities as city}
  <p>Check the weather in <a href="/weather/{city}">{city}</a>!</p>
{/each}
