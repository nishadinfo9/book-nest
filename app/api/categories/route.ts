import { generateSlug } from "@/helpers/generateSlug";
import { db } from "@/lib/db/db";
import { categories } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const slug = generateSlug(name);

    await db.insert(categories).values({
      name,
      slug,
      isActive: true,
    });

    return Response.json(
      {
        message: "Category created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("category creating Error", error);
    return Response.json({ error: "category creating Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit") ?? 10);
    const page = Number(searchParams.get("page") ?? 1);

    const allCategories = await db
      .select()
      .from(categories)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(categories.createdAt));

    return Response.json(allCategories, { status: 200 });
  } catch (error) {
    console.log("categories not found", error);
    return Response.json({ message: "categories not found" }, { status: 500 });
  }
}