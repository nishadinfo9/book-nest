interface Props {
  badge?: string;
  title: string;
  description?: string;
}

export default function SectionTitle({
  badge,
  title,
  description,
}: Props) {
  return (
    <div className="mb-10 text-center">
      {badge && (
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          {badge}
        </p>
      )}

      <h2 className="mt-2 text-3xl font-bold md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}