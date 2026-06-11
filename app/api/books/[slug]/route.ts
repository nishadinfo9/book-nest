import { db } from "@/lib/db/db";
import { books } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const book = await db
      .select()
      .from(books)
      .where(eq(books.slug, params.slug))
      .limit(1);

    return Response.json({
      data: book[0],
    });
  } catch (error) {
    console.error("Book not found:", error);
    return Response.json({ error: "Book not found" }, { status: 404 });
  }
}
