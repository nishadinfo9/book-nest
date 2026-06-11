import { db } from "@/lib/db/db";
import { books } from "@/lib/db/schema";

export async function GET(req: Request) {
  try {
    const allBooks = await db.select().from(books);
    return Response.json(allBooks, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return Response.json(
      {
        error: "Failed to fetch books",
      },
      { status: 500 },
    );
  }
}
