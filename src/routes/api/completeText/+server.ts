import { completeTextStream } from "$lib/openai.server"

export function GET({ url }) {
  let prompt = url.searchParams.get("prompt")!
  let stream = completeTextStream(prompt)
  return new Response(stream)
}
