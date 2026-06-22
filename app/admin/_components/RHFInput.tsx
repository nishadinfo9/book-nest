import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type RHFInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};

const RHFInput = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
}: RHFInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>

          <Input
            type={type}
            {...(type === "file"
              ? {
                  onChange: (e) => {
                    field.onChange(e.target.files?.[0]);
                  },
                }
              : type === "number"
                ? {
                    value: field.value ?? "",
                    onChange: (e) => field.onChange(Number(e.target.value)),
                  }
                : field)}
            placeholder={placeholder}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default RHFInput;
