<script lang="ts">
  let { data } = $props()
  let { city, weather } = data
  let { temp, feels_like, humidity } = weather.current
</script>

<p>Welcome {city}!</p>
<p>Your temperature is {temp}°, but feels like {feels_like}°</p>
<p>The humidity is {humidity}%</p>
