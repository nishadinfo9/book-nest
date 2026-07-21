export async function POST(request: Request) {
  return Response.redirect(
    new URL("/payment/cancel", request.url)
  );
}