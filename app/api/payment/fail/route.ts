export async function POST(request: Request) {
  return Response.redirect(
    new URL("/payment/fail", request.url)
  );
}