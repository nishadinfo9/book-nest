"use client";

import { AuthorSchema } from "@/lib/validation/authorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import RHFInput from "../../_components/RHFInput";
import { FieldGroup } from "@/components/ui/field";
import { Author } from "@/types/author.type";

export type AuthorFormValue = z.input<typeof AuthorSchema>;
export type FormOutput = z.output<typeof AuthorSchema>;

const AuthorForm = ({
  onSubmit,
  disabled,
  isEdit,
  authors,
}: {
  onSubmit: (formValue: AuthorFormValue) => void;
  disabled: boolean;
  isEdit: boolean;
  authors?: Author;
}) => {
  const { handleSubmit, control, reset } = useForm<AuthorFormValue>({
    resolver: zodResolver(AuthorSchema),

  });

 

  const submitHandler = (values: AuthorFormValue) => {
    console.log(values);
    onSubmit(values);
  };

  return (
    <form id="form-rhf-demo" onSubmit={handleSubmit(submitHandler)}>
      <FieldGroup className="">
        <RHFInput
          name="name"
          control={control}
          label="name"
          placeholder="name"
          type="text"
        />

        <Button
          size={"lg"}
          type="submit"
          form="form-rhf-demo"
          disabled={disabled}
        >
          {disabled ? (
            <Loader2 className="size-4 animate-spin " />
          ) : isEdit ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default AuthorForm;
