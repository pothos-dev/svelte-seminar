import { OPENAI_API_KEY } from "$env/static/private"
import { OpenAI } from "openai"

let openAI = new OpenAI({ apiKey: OPENAI_API_KEY })

export async function completeTextAsync(prompt: string): Promise<string> {
  const response = await openAI.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
  })

  return response.choices[0].message.content ?? ""
}

export function completeTextStream(prompt: string): ReadableStream<string> {
  return new ReadableStream({
    start(controller) {
      openAI.beta.chat.completions
        .stream({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: prompt,
            },
          ],
        })
        .on("chunk", (chunk) => {
          let str = chunk.choices[0].delta.content ?? ""
          controller.enqueue(str)
        })
        .on("end", () => {
          controller.close()
        })
    },
  })
}
