import { REDIS_PASSWORD } from "$env/static/private"
import { Redis } from "@upstash/redis"
import fs from "fs"

const redis = new Redis({
  // TODO: store url in .env
  url: "https://eu1-fun-redbird-39665.upstash.io",
  token: REDIS_PASSWORD,
})

export async function writeToCache(key: string, data: any) {
  fs.writeFileSync("cache.json", JSON.stringify(data))
  await redis.set(key, JSON.stringify(data))
}

export async function readFromCache(key: string) {
  const data = await redis.get<string>(key)
  if (!data) return null
  return JSON.parse(data)
}
