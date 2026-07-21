export async function POST(request: Request) {
  const body = await request.formData();

  console.log(body);

  // Verify payment
  // Update database if needed

  return new Response("OK");
}