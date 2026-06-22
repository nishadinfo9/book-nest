"use client";

import { CreateInventorySchema } from "@/lib/validation/inventorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getBooks, getInventories } from "@/http/api";
import RHFInput from "../../_components/RHFInput";
import RHFSelect from "../../_components/RHFSelect";
import { FieldGroup } from "@/components/ui/field";
import { useQuery } from "@tanstack/react-query";

export type FormValue = z.input<typeof CreateInventorySchema>;
export type FormOutput = z.output<typeof CreateInventorySchema>;

const InventoryForm = ({
  onSubmit,
  disabled,
}: {
  onSubmit: (formValue: FormValue) => void;
  disabled: boolean;
}) => {
  const { handleSubmit, control } = useForm<FormValue>({
    resolver: zodResolver(CreateInventorySchema),
    defaultValues: {
      availableStock: 0,
    },
  });

  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const submitHandler = (values: FormValue) => {
    console.log(values);
    onSubmit(values);
  };

  console.log(books, "books");

  return (
    <form id="form-rhf-demo" onSubmit={handleSubmit(submitHandler)}>
      <FieldGroup className="">
        <RHFSelect
          name="bookId"
          control={control}
          label="Books"
          placeholder="Select Books"
          options={books}
          loading={isLoading}
        />
        <RHFInput
          name="availableStock"
          control={control}
          label="availableStock"
          placeholder="availableStock"
          type="number"
        />

        <Button
          size={"lg"}
          type="submit"
          form="form-rhf-demo"
          disabled={disabled}
        >
          {disabled ? <Loader2 className="size-4 animate-spin " /> : "Create"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default InventoryForm;
