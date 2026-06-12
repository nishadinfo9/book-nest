import cloudinary from "./cloudinary";

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

export async function uploadImageToCloudinary(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"));

        console.log('result', result)

        resolve(result as CloudinaryUploadResult);
      }
    );

    stream.end(buffer);
  });


  return result.secure_url
}