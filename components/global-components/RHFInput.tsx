import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

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
  type = 'text',
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
            placeholder={placeholder}
            {...(type === 'file'
              ? {
                  name: field.name,
                  ref: field.ref,
                  onBlur: field.onBlur,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(e.target.files?.[0] ?? null),
                }
              : type === 'number'
                ? {
                    ...field,
                    value: field.value ?? '',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value),
                      ),
                  }
                : field)}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default RHFInput;
