import { generateSlug } from "@/helpers/generateSlug";
import { db } from "@/lib/db/db";
import { categories } from "@/lib/db/schema";

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
