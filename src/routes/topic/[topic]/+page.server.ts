import { loadCache, writeCache } from "$lib/cache"
import { openAI } from "$lib/openai"
import type { PageServerLoad } from "./$types"

type Flashcard = {
  question: string
  answer: string
  links: string[]
}

async function getFlashcards(topic: string): Promise<Flashcard[]> {
  const cards: Flashcard[] = []

  const completion = await openAI.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: "You generate a single flashcard for learning about " + topic },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "flashcard",
          description: "Generate a flashcard for learning a topic",
          parameters: {
            type: "object",
            properties: {
              question: {
                type: "string",
                description: "The question to ask",
              },
              answer: {
                type: "string",
                description: "The short answer to the question",
              },
              links: {
                type: "array",
                description: "Points to other topics of interest.",
                minItems: 1,
                maxItems: 3,
                items: {
                  type: "string",
                  pattern: "^[a-z-]+$",
                },
              },
            },
            required: ["question", "answer", "links"],
          },
        },
      },
    ],
  })

  completion.choices.forEach(choice => {
    for (const call of choice.message.tool_calls ?? []) {
      if (call.function.name === "flashcard") {
        cards.push(JSON.parse(call.function.arguments))
      }
    }
  })

  return cards
}

export const load: PageServerLoad = async ({ params }) => {
  const { topic } = params

  const cacheKey = "/topic/" + topic
  const cached = loadCache(cacheKey)
  if (cached) {
    const flashcards = Promise.resolve(cached)
    return { flashcards }
  } else {
    const flashcards = getFlashcards(topic).then(cards => {
      writeCache(cacheKey, cards)
      return cards
    })
    return { flashcards }
  }
}
