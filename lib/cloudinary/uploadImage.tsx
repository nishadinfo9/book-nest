import cloudinary from "./cloudinary";

export async function uploadImageToCloudinary(
  file: File,
  folder: string = "uploads",
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const result: any = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    stream.end(buffer);
  });

  return result.secure_url;
}
