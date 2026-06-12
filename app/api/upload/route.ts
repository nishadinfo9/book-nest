import cloudinary from "@/lib/cloudinary/cloudinary";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("image");

    if (!file || !(file instanceof File)) {
      return Response.json({ error: "Invalid file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "books" },
        (error, result) => {
          if (error) {
            console.log("Cloudinary error:", error);
            return reject(error); // ✅ ONLY error
          }

          resolve(result); // ✅ only result
        },
      );

      stream.end(buffer);
    });

    return Response.json(result, { status: 200 });
  } catch (error: any) {
    console.log("UPLOAD ERROR:", error);

    return Response.json(
      {
        error: "Something went wrong",
        details: error?.message || String(error),
      },
      { status: 500 },
    );
  }
}
