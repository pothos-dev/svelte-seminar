import { OPENWEATHERMAP_API_KEY } from "$env/static/private"
import type { ServerLoadEvent } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async (event) => {
  const city = event.params.city

  console.log("Loading data for " + city)

  let results = await geocode(event, city)
  let { lat, lon } = results[0]

  let weather = await fetchWeather(event, lat, lon)

  return { weather, city }
}

async function geocode(event: ServerLoadEvent, city: string) {
  let url = new URL("https://api.openweathermap.org/geo/1.0/direct")
  url.searchParams.append("appId", OPENWEATHERMAP_API_KEY)
  url.searchParams.append("q", city)
  let response = await event.fetch(url)
  let data = await response.json()

  type GeocodeResult = { lat: number; lon: number }

  return data as GeocodeResult[]
}

async function fetchWeather(event: ServerLoadEvent, lat: number, lon: number) {
  let url = new URL("https://api.openweathermap.org/data/3.0/onecall")
  url.searchParams.append("appId", OPENWEATHERMAP_API_KEY)
  url.searchParams.append("lat", lat.toString())
  url.searchParams.append("lon", lon.toString())
  url.searchParams.append("exclude", "minutely,hourly,daily,alerts")
  url.searchParams.append("units", "metric")
  url.searchParams.append("lang", "en")
  let response = await event.fetch(url)
  let data = await response.json()

  type WeatherResult = {
    current: {
      temp: 15.54
      feels_like: 14.61
      humidity: 56
      clouds: 100
      wind_speed: 0.92
      weather: Array<{
        id: 804
        main: "Clouds"
        description: "overcast clouds"
        icon: "04n"
      }>
    }
  }

  return data as WeatherResult
}
