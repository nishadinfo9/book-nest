import { v2 as cloudinary } from "cloudinary";
import { db } from "@/lib/db/db";
import { books } from "@/lib/db/schema";

interface cloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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


