import { db } from '@/lib/db/db';
import { authors, books, categories, publishers } from '@/lib/db/schema';
import { uploadImageToCloudinary } from '@/lib/cloudinary/uploadImage';
import { generateSlug } from '@/helpers/generateSlug';
import { desc, eq } from 'drizzle-orm';
import { BookSchema } from '@/lib/validation';
import { redis } from '@/lib/db/redis';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get('limit') ?? 10);
    const page = Number(searchParams.get('page') ?? 1);

    const cacheKey = `books:page:${page}:limit:${limit}`;
    const cachedBooks = await redis.get(cacheKey);

    if (cachedBooks) {
      console.log('✅ Cache Hit');
      return Response.json(JSON.parse(cachedBooks), { status: 200 });
    }

    console.log('❌ Cache Miss');

    const allBooks = await db
      .select({
        id: books.id,
        slug: books.slug,
        title: books.title,
        price: books.price,
        coverImage: books.coverImage,
        averageRating: books.averageRating,
        category: categories.name,
        publisher: publishers.name,
        author: authors.name,
      })
      .from(books)
      .leftJoin(publishers, eq(publishers.id, books.publisherId))
      .leftJoin(categories, eq(categories.id, books.categoryId))
      .leftJoin(authors, eq(authors.id, books.authorId))
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(books.createdAt));

    await redis.set(cacheKey, JSON.stringify(allBooks), 'EX', 300,);

    return Response.json(allBooks, { status: 200 });
  } catch (error) {
    console.error('Error fetching books:', error);
    return Response.json(
      {
        error: 'Failed to fetch books',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('coverImage') as File;
    const title = formData.get('title');
    const isbn13 = formData.get('isbn13');
    const price = formData.get('price');
    const description = formData.get('description');
    const categoryId = formData.get('categoryId');
    const publisherId = formData.get('publisherId');
    const authorId = formData.get('authorId');
    const discountPrice = formData.get('discountPrice');
    const language = formData.get('language') || 'EN';

    const validation = BookSchema.safeParse({
      title,
      isbn13,
      price,
      discountPrice,
      description,
      categoryId,
      publisherId,
      authorId,
      language,
    });
    console.log({
      title,
      isbn13,
      price,
      discountPrice,
      description,
      categoryId,
      publisherId,
      authorId,
      language,
    });

    if (!validation.success) {
      return Response.json(
        {
          error: 'Validation failed',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = validation.data;
    console.log('validation.data', data);

    const [publisher] = await db
      .select()
      .from(publishers)
      .where(eq(publishers.id, data.publisherId))
      .limit(1);

    if (!publisher) {
      return Response.json({ error: 'Invalid publisherId' }, { status: 400 });
    }

    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, data.categoryId))
      .limit(1);

    if (!category) {
      return Response.json({ error: 'Invalid categoryId' }, { status: 400 });
    }

    let coverImageUrl: string | null = null;

    if (file instanceof File) {
      coverImageUrl = await uploadImageToCloudinary(file, 'books');
    }

    console.log('coverImageUrl', coverImageUrl);

    const slug = generateSlug(data.title);

    await db.insert(books).values({
      title: data.title,
      slug,
      isbn13: data.isbn13 || null,
      price: data.price.toString(),
      discountPrice: data.discountPrice.toString(),
      description: data.description || null,
      categoryId: data.categoryId,
      publisherId: data.publisherId,
      authorId: data.authorId,
      language: data.language,
      coverImage: coverImageUrl,
      status: 'PUBLISHED',
    });

    const key = await redis.keys('book:*')
    if (key.length > 0) {
      await redis.del(...key);
    }

    return Response.json(
      {
        message: 'Book created successfully',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating book:', error);

    return Response.json(
      { message: 'Failed to create book', error },
      {
        status: 500,
      },
    );
  }
}
