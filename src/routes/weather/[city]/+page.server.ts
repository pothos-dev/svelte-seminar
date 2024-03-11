import { OPENWEATHERMAP_API_KEY } from "$env/static/private"
import { error, type ServerLoadEvent } from "@sveltejs/kit"

export async function load(event) {
  const city = event.params.city

  console.log("Loading data for " + city)

  let results = await geocode(event, city)
  if (results.length == 0) {
    error(404, "City not found")
  }

  let { lat, lon } = results[0]

  let weather = await fetchWeather(event, lat, lon)
  let chatterPrompt = buildWeatherPrompt(city, weather)

  return {
    weather,
    city,
    chatterPrompt,
    // chatterPromise: completeTextAsync(chatterPrompt),
  }
}

type GeocodeResult = { lat: number; lon: number }

type WeatherResult = {
  current: {
    temp: number
    feels_like: number
    humidity: number
    clouds: number
    wind_speed: number
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
  }
}

async function geocode(event: ServerLoadEvent, city: string) {
  let url = new URL("https://api.openweathermap.org/geo/1.0/direct")
  url.searchParams.append("appId", OPENWEATHERMAP_API_KEY)
  url.searchParams.append("q", city)
  let response = await event.fetch(url)
  let data = await response.json()

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

  return data as WeatherResult
}

function buildWeatherPrompt(city: string, weatherResult: WeatherResult) {
  let { temp, feels_like, clouds, humidity, wind_speed, weather } =
    weatherResult.current

  temp = Math.round(temp)
  feels_like = Math.round(feels_like)
  wind_speed = Math.round(wind_speed)
  humidity = Math.round(humidity)
  let shortDescription = weather[0].description

  return `
  You are a radio moderator announcing the weather in ${city}.
  Describe it in a few sentences user over-the-top wording.

  The weather can be described as ${shortDescription}.
  The current temperature is ${temp}°C, but it feels like ${feels_like}°C.
  The humidity is at ${humidity}%, and the wind is blowing at ${wind_speed}m/s.
  The amout of clouds is ${clouds}%.
`
}
