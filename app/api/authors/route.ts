import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { authors } from "@/lib/db/schema";
import { AuthorSchema } from "@/lib/validation/authorSchema";
import { generateSlug } from "@/helpers/generateSlug";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate input
    const parsed = AuthorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // 2. Ensure unique slug (auto-generate if needed)
    const slug = data.slug || generateSlug(data.name);

    // 3. Insert into DB
    const newAuthor = await db
      .insert(authors)
      .values({
        name: data.name,
        slug,
        bio: data.bio ?? null,
        image: data.image || null,
        country: data.country ?? null,
        website: data.website || null,
        isActive: data.isActive ?? true,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Author created successfully",
        data: newAuthor[0],
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Something went wrong",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit") ?? 10);
    const page = Number(searchParams.get("page") ?? 1);

    const allAuthors = await db
      .select({
        id: authors.id,
        name: authors.name,
        isActive: authors.isActive,
        image: authors.image,
      })
      .from(authors)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(authors.createdAt));

    return Response.json(allAuthors, { status: 200 });
  } catch (error) {
    console.log("authors not found");
    return Response.json({ message: "authors not found" }, { status: 500 });
  }
}
