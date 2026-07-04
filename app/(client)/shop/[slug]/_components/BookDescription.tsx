export default function BookDescription({
  description,
}: {
  description?: string;
}) {
  return (
    <section className="mt-20">

      <h2 className="text-2xl font-bold mb-4">

        Description

      </h2>

      <p className="leading-8 text-muted-foreground">

        {description}

      </p>

    </section>
  );
}