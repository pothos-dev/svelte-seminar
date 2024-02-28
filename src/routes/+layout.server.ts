import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = (event) => {
  return {
    ipAddress: event.getClientAddress(),
  }
}
