import { OPENAI_TOKEN } from "$env/static/private"
import OpenAI from "openai"

export const openAI = new OpenAI({ apiKey: OPENAI_TOKEN })
