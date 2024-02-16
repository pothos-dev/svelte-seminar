import { REDIS_URL } from "$env/static/private"

import Redis from "ioredis"
const client = new Redis(REDIS_URL)

export async function cached<T>(
  key: string,
  create: () => Promise<T> | T
): Promise<T> {
  let cachedData = await client.get(key)
  if (cachedData) {
    return JSON.parse(cachedData)
  } else {
    console.log("Cache miss", key)
    let data = await create()
    await client.set(key, JSON.stringify(data))
    return data
  }
}
