import { db } from "@/lib/db/db";
import { authors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const singleAuthors = await db
      .select({
        id: authors.id,
        name: authors.name,
        isActive: authors.isActive,
        image: authors.image,
        slug: authors.slug,
        bio: authors.bio,
        country: authors.country,
        website: authors.website,
      })
      .from(authors)
      .where(eq(authors.slug, slug))
      .limit(1);

    if (!singleAuthors.length) {
      return Response.json({ error: "authors not found" }, { status: 404 });
    }

    return Response.json(
      singleAuthors[0],
    );
  } catch (error) {
    console.error("authors not found:", error);
    return Response.json({ error: "authors not found" }, { status: 404 });
  }
}

export async function PATCH() { }
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    await db.delete(authors).where(eq(authors.slug, slug));
    return Response.json("author deleted successfully", { status: 200 });
  } catch (error) {
    console.log("author deleting failed", error);
    return Response.json(
      { message: "author deleting failed" },
      { status: 500 },
    );
  }
}
