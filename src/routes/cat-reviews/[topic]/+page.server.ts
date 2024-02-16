import { openAI } from "$lib/openai"
import { cached } from "$lib/redis"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
  const { topic } = params

  return {
    review: cached(`review/${topic}`, () => generateReview(topic)),
    image: cached(`image/${topic}`, () => generateImage(topic)),
  }
}

async function generateReview(topic: string) {
  // Define the data that should be passed to the function
  type Review = {
    text: string
    rating: number
    relatedTopics: string[]
  }

  // Convert it into a JSON schema
  let schema = {
    type: "object",
    properties: {
      text: {
        type: "string",
        description: "The review text",
      },
      rating: {
        type: "number",
        description: "The rating out of 5 stars",
      },
      relatedTopics: {
        type: "array",
        description: "Topics related to the review",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "string",
          pattern: "^[a-z-]+$",
        },
      },
    },
    required: ["text", "rating", "relatedTopics"],
  }

  let prompt = `
  You are a cat.
  Write a very short review (max 3 sentences) about ${topic}.
  Give it a rating out of 5 starts.
  `

  return new Promise<Review>((resolve, reject) => {
    let runner = openAI.beta.chat.completions.runTools({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "system", content: prompt }],
      tools: [
        {
          type: "function",
          function: {
            name: "review",
            description: "Generate a review for a topic",
            parameters: schema,
            parse: JSON.parse,
            function(review: Review) {
              resolve(review)
            },
          },
        },
      ],
    })
    runner.on("error", reject)
  })
}

async function generateImage(topic: string) {
  let prompt = `
    You are a cat.
    Draw a picture of ${topic}.
    `

  const result = await openAI.images.generate({
    model: "dall-e-3",
    prompt,
    size: "1024x1024",
    response_format: "url",
  })

  return result.data[0]
}

async function fakeFetchReview(topic: string) {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  return `I am a cat. I like to sleep and eat. I give "${topic}" 5 stars.`
}
