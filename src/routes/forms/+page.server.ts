import { fail } from "@sveltejs/kit"

export let actions = {
  async default(event) {
    event.locals.email

    const data = await event.request.formData()
    let email = data.get("email") as string
    let password = data.get("password")

    // let storedPassword = await readFromCache(`${email}/password`)
    if (password !== "password123") {
      return fail(401, { message: "Invalid password" })
    }

    event.cookies.set("email", email, { path: "/", httpOnly: true })
  },
}
