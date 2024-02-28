import { setError, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import * as z from "zod"
import type { Actions } from "./$types"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  age: z.number().int().min(18),
  subscribe: z.boolean().default(true),
})

import { fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async (event) => {
  return {
    form: await superValidate(zod(schema)),
  }
}

export let actions: Actions = {
  async default(event) {
    const form = await superValidate(event.request, zod(schema))
    if (!form.valid) {
      return fail(400, { form })
    }
    if (form.data.password != "hello123") {
      return setError(form, "password", "Invalid password")
    }

    return redirect(303, "/")
  },
}
