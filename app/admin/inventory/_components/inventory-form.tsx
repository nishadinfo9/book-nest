"use client";

import { CreateInventorySchema } from "@/lib/validation/inventorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getBooks } from "@/http/api";
import RHFInput from "../../_components/RHFInput";
import RHFSelect from "../../_components/RHFSelect";
import { FieldGroup } from "@/components/ui/field";
import { useQuery } from "@tanstack/react-query";
import { InventoryType } from "@/types/inventory.type";
import { useEffect } from "react";

export type FormValue = z.input<typeof CreateInventorySchema>;
export type FormOutput = z.output<typeof CreateInventorySchema>;

const InventoryForm = ({
  onSubmit,
  disabled,
  isEdit,
  inventory,
}: {
  onSubmit: (formValue: FormValue) => void;
  disabled: boolean;
  isEdit: boolean;
  inventory: InventoryType;
}) => {
  const { handleSubmit, control, reset } = useForm<FormValue>({
    resolver: zodResolver(CreateInventorySchema),
    defaultValues: {
      availableStock: 0,
    },
  });

  useEffect(() => {
    if (inventory && isEdit) {
      console.log("edit inventory", inventory);

      reset({
        bookId: inventory.bookId,
        availableStock: inventory.availableStock,
      });
    }
  }, [inventory, isEdit, reset]);

  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const submitHandler = (values: FormValue) => {
    console.log(values);
    onSubmit(values);
  };

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

export default InventoryForm;
