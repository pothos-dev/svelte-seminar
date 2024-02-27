import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = (event) => {
  return {
    placeholder: "This is the placeholder",
    ipAddress: event.getClientAddress(),
  }
}
