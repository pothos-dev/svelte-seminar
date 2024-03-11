export function handle({ event, resolve }) {
  let email = event.cookies.get("email")
  event.locals.email = email
  return resolve(event)
}
