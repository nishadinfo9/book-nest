import { BookType } from "@/types/book.type";

export default function BookMeta({
  book,
}: {
  book: BookType;
}) {
  return (
    <section className="mt-16">

      <h2 className="text-2xl font-bold mb-6">

        Book Details

      </h2>

      <div className="rounded-lg border">

        <table className="w-full">

          <tbody>

            <Row
              title="Language"
              value={book.language}
            />

            <Row
              title="ISBN"
              value={book.isbn13}
            />

            <Row
              title="Author"
              value={book.author}
            />

            <Row
              title="Publisher"
              value={book.publisherId}
            />

          </tbody>

        </table>

      </div>

    </section>
  );
}

function Row({
  title,
  value,
}: {
  title: string;
  value?: string;
}) {
  return (
    <tr className="border-b">

      <td className="p-4 font-medium">
        {title}
      </td>

      <td className="p-4 text-muted-foreground">
        {value || "-"}
      </td>

    </tr>
  );
}