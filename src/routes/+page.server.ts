import { openAI } from "$lib/openai"
import type { PageServerLoad } from "./$types"

async function loadImage(prompt: string): Promise<string> {
  const response = await openAI.images.generate({
    prompt,
    size: "256x256",
    style: "natural",
    response_format: "url",
    quality: "standard",
  })
  const images = response.data
  const first = images[0]
  return first.url!
}

export const load: PageServerLoad = async ({}) => {
  const num = 1
  const images = new Array(num).fill(0).map(() => loadImage("A tarot card with a cat on it"))
  return { images }
}
