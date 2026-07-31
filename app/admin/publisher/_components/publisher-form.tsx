"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import RHFInput from "../../_components/RHFInput";
import { FieldGroup } from "@/components/ui/field";
import { PublisherSchema } from "@/lib/validation/publisherSchema";
import { Publisher } from "@/types/publisher.type";

export type PublisherFormValue = z.input<typeof PublisherSchema>;
export type FormOutput = z.output<typeof PublisherSchema>;

const PublisherForm = ({
  onSubmit,
  disabled,
  isEdit,
  publishers,
}: {
  onSubmit: (formValue: PublisherFormValue) => void;
  disabled: boolean;
  isEdit: boolean;
  publishers?: Publisher;
}) => {
  const { handleSubmit, control, reset } = useForm<PublisherFormValue>({
    resolver: zodResolver(PublisherSchema),

  });

 

  const submitHandler = (values: PublisherFormValue) => {
    console.log(values);
    onSubmit(values);
  };

  return (
    <form id="form-rhf-demo" onSubmit={handleSubmit(submitHandler)}>
      <FieldGroup className="">
        <RHFInput
          name="name"
          control={control}
          label="Name"
          placeholder="name"
          type="text"
        />
        <RHFInput
          name="website"
          control={control}
          label="Website"
          placeholder="website"
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

export default PublisherForm;
