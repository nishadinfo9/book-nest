import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { ComponentProps, memo } from 'react';

interface RHFInputProps<T extends FieldValues> extends ComponentProps<
  typeof Input
> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

const RHFInput = <T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: RHFInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            id={name}
            aria-invalid={fieldState.invalid}
            autoComplete={name}
            {...props}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default RHFInput;
