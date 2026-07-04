import Image from "next/image";

export default function BookGallery({
  image,
}: {
  image?: string;
}) {
  return (
    <div className="rounded-xl border p-6">

      <Image
        src={image || "/book-placeholder.png"}
        alt="Book"
        width={450}
        height={650}
        className="w-full rounded-lg object-cover"
      />

    </div>
  );
}