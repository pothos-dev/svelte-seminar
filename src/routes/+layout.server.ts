export function load(event) {
  let email = event.locals.email

  return {
    email,
    ipAddress: event.getClientAddress(),
  }
}
