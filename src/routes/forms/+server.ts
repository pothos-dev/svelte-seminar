export async function POST(event) {
  const message = await event.request.text()
  console.log("Received message: " + message)
  return new Response()
}
