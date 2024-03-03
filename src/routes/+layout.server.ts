export function load(event) {
  return {
    ipAddress: event.getClientAddress(),
  }
}
