import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import { db } from "@/lib/db/db";
import { publishers } from "@/lib/db/schema";
import { PublisherSchema } from "@/lib/validation/publisherSchema";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const logo = formData.get('logo') as File;
    const website = formData.get('website');

    // 1. Validate input
    const parsed = PublisherSchema.safeParse({ name, logo, website });

    if (!parsed.success) {
      return Response.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;
    let publisherImageUrl: string | null = null;


    if (logo instanceof File) {
      try {
        publisherImageUrl = await uploadImageToCloudinary(logo, 'publisher');
      } catch (error) {
        console.log(error);
      }
    }

    await db.insert(publishers).values({
      name: data.name,
      logo: publisherImageUrl || null,
      website: data.website || null,
      isActive: data.isActive ?? true,
    }).returning()
    
    return Response.json(
      { message: "publisher creatded successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log("publisher creatded Error", error);
    return Response.json(
      { error: "publisher creatded Error" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit") ?? 10);
    const page = Number(searchParams.get("page") ?? 1);

    const allPublishers = await db
      .select()
      .from(publishers)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(publishers.createdAt));

    return Response.json(allPublishers, { status: 200 });
  } catch (error) {
    console.log("Publishers not found", error);
    return Response.json({ message: "Publishers not found" }, { status: 500 });
  }
}