import { setError, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import * as z from "zod"
import type { Actions } from "./$types"

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  age: z.number().int().min(18).default(18),
  subscribe: z.boolean().default(true),
})

import { fail } from "@sveltejs/kit"

export async function load(event) {
  return {
    signUpForm: await superValidate(zod(signUpSchema)),
  }
}

export let actions: Actions = {
  async signUp(event) {
    const form = await superValidate(event.request, zod(signUpSchema))
    if (!form.valid) {
      return fail(400, { form })
    }
    if (!form.data.subscribe) {
      setError(form, "subscribe", "You must be subscribed!")
    }
    if (form.data.password != "hello123") {
      setError(form, "password", "Invalid password")
    }

    return { form }
  },
}
