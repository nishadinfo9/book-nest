"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import RHFInput from "../../_components/RHFInput";
import { FieldGroup } from "@/components/ui/field";
import { Category } from "@/types/caretory.type";
import { CategorySchema } from "@/lib/validation/categorySchema";

export type CategoryFormValue = z.input<typeof CategorySchema>;
export type FormOutput = z.output<typeof CategorySchema>;

const CategoryForm = ({
  onSubmit,
  disabled,
  isEdit,
  categories,
}: {
  onSubmit: (formValue: CategoryFormValue) => void;
  disabled: boolean;
  isEdit: boolean;
  categories?: Category;
}) => {
  const { handleSubmit, control, reset } = useForm<CategoryFormValue>({
    resolver: zodResolver(CategorySchema),

  });

 

  const submitHandler = (values: CategoryFormValue) => {
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

export default CategoryForm;
