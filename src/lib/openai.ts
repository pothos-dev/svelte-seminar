import { browser } from "$app/environment"
import { writable, type Readable } from "svelte/store"

export function completeText(prompt: string): Readable<string> {
  let store = writable("")

  if (browser) {
    // Only run this code in the browser
    fetch(`/api/completeText?prompt=${encodeURIComponent(prompt)}`).then(
      async (response) => {
        let inputStream = response.body!
        let decoderStream = inputStream.pipeThrough(new TextDecoderStream())
        let reader = decoderStream.getReader()
        while (true) {
          let { done, value } = await reader.read()
          if (done) break
          store.update((s) => s + value)
        }
      }
    )
  }

  return store
}
