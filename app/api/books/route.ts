import { db } from "@/lib/db/db";
import { books, categories, publishers } from "@/lib/db/schema";
import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import { generateSlug } from "@/helpers/generateSlug";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const isbn13 = formData.get("isbn13") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const publisherId = formData.get("publisherId") as string;
    const language = (formData.get("language") as string) || "EN";

    const file = formData.get("coverImage") as File | null;

    // 🧠 1. Basic validation
    if (!title || !price || !categoryId || !publisherId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 🧠 2. Convert price properly
    const numericPrice = Number(price);

    if (isNaN(numericPrice)) {
      return Response.json({ error: "Invalid price" }, { status: 400 });
    }

    // 🧠 3. Check foreign keys (IMPORTANT FIX)
    const publisher = await db
      .select()
      .from(publishers)
      .where(eq(publishers.id, publisherId))
      .limit(1);

    if (!publisher) {
      return Response.json({ error: "Invalid publisherId" }, { status: 400 });
    }

    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId))
      .limit(1);

    if (!category) {
      return Response.json({ error: "Invalid categoryId" }, { status: 400 });
    }

    // 🖼️ 4. Upload image
    let coverImageUrl: string | null = null;

    if (file && file instanceof File) {
      coverImageUrl = await uploadImageToCloudinary(file, "books");
    }

    // 🔗 5. Slug
    const slug = generateSlug(title);

    // 💾 6. Insert book
    const newBook = await db
      .insert(books)
      .values({
        title,
        slug,
        isbn13,
        price: numericPrice.toString(),
        description,
        categoryId,
        publisherId,
        language,
        coverImage: coverImageUrl,
        status: "PUBLISHED",
      })
      .returning();

    return Response.json(
      {
        message: "Book created successfully",
        book: newBook[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating book:", error);

    return Response.json(
      {
        error: "Failed to create book",
      },
      { status: 500 },
    );
  }
}
