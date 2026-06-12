import { db } from "@/lib/db/db";
import { books, categories, publishers } from "@/lib/db/schema";
import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import { generateSlug } from "@/helpers/generateSlug";
import { eq } from "drizzle-orm";
import { bookSchema } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit") ?? 10);
    const page = Number(searchParams.get("page") ?? 1);

    const allBooks = await db
      .select({
        id: books.id,
        title: books.title,
        slug: books.slug,
        price: books.price,
        coverImage: books.coverImage,
        language: books.language,
        averageRating: books.averageRating,
        reviewCount: books.reviewCount,
        status: books.status,
        category: categories.name,
        publisher: publishers.name,
      })
      .from(books)
      .leftJoin(publishers, eq(publishers.id, books.publisherId))
      .leftJoin(categories, eq(categories.id, books.categoryId))
      .limit(limit)
      .offset((page - 1) * limit);

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
    const file = formData.get("coverImage") as File

    const validation = bookSchema.safeParse({
      title: formData.get("title"),
      isbn13: formData.get("isbn13"),
      price: formData.get("price"),
      description: formData.get("description"),
      categoryId: formData.get("categoryId"),
      publisherId: formData.get("publisherId"),
      language: formData.get("language") || "EN",
    });

    if (!validation.success) {
      return Response.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = validation.data;

    const [publisher] = await db
      .select()
      .from(publishers)
      .where(eq(publishers.id, data.publisherId))
      .limit(1);

    if (!publisher) {
      return Response.json({ error: "Invalid publisherId" }, { status: 400 });
    }

    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, data.categoryId))
      .limit(1);

    if (!category) {
      return Response.json({ error: "Invalid categoryId" }, { status: 400 });
    }

  
    let coverImageUrl: string | null = null;

    if (file instanceof File) {
      coverImageUrl = await uploadImageToCloudinary(file, "books");
    }

    const slug = generateSlug(data.title);

    await db.insert(books).values({
      title: data.title,
      slug,
      isbn13: data.isbn13 || null,
      price: data.price.toString(),
      description: data.description || null,
      categoryId: data.categoryId,
      publisherId: data.publisherId,
      language: data.language,
      coverImage: coverImageUrl,
      status: "PUBLISHED",
    });

    return Response.json(
      {
        message: "Book created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating book:", error);

    return Response.json({ error: "Failed to create book" }, { status: 500 });
  }
}
