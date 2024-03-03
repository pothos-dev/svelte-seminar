import { fail, redirect } from "@sveltejs/kit"

export let actions = {
  async default(event) {
    let data = await event.request.formData()
    let email = data.get("email")
    let password = data.get("password")

    if (password == "hello123") {
      return redirect(303, "/")
    } else {
      return fail(400, { errorMessage: "Invalid password" })
    }
  },
}
