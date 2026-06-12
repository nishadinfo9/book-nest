export async function GET(request: Request) {
  try {
    return Response.json(
      { message: "Health check successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Health check failed:", error);
    return Response.json(
      {
        error: "Health check failed",
      },
      { status: 500 },
    );
  }
}
