import { completeTextStream } from "$lib/openai.server"

export function GET(event) {
  let prompt = event.url.searchParams.get("prompt")!
  let stream = completeTextStream(prompt)
  return new Response(stream)
}
