import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditableField } from "./editable-field";

interface Field {
  label: string;
  value?: string | number | null;
}

interface Props {
  title: string;
  fields: Field[];
}

export function ProfileSection({ title, fields }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <EditableField
            key={field.label}
            label={field.label}
            value={field.value}
          />
        ))}
      </CardContent>
    </Card>
  );
}