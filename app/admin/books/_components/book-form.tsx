"use client";

import { FormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {  Loader2 } from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import { getAllAuthors, getAllCategories, getAllPublisher } from "@/http/api";
import RHFInput from "../../_components/RHFInput";
import RHFSelect from "../../_components/RHFSelect";
import { FieldGroup } from "@/components/ui/field";
import { useEffect } from "react";
import { BookType } from "@/types/book.type";

export type FormValue = z.input<typeof FormSchema>;
export type FormOutput = z.output<typeof FormSchema>;

const BookForm = ({
  onSubmit,
  disabled,
  book,
  isEdit,
}: {
  onSubmit: (formValue: FormValue) => void;
  disabled: boolean;
  book: BookType | null;
  isEdit: boolean;
}) => {
  const { handleSubmit, control, reset } = useForm<FormValue>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      authorId: "",
      categoryId: "",
      publisherId: "",
      isbn13: "",
    },
  });

  useEffect(() => {
    if (book && isEdit) {
      console.log("edit book", book);

      reset({
        title: book.title,
        description: book.description,
        price: book.price,
        authorId: book.authorId,
        categoryId: book.categoryId,
        publisherId: book.publisherId,
        isbn13: book.isbn13,
      });
    }
  }, [book, isEdit, reset]);

  const [
    { data: authors = [], isLoading: authorLoading },
    { data: categories = [], isLoading: categoryLoading },
    { data: publishers = [], isLoading: publisherLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["authors"],
        queryFn: getAllAuthors,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["categories"],
        queryFn: getAllCategories,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["publishers"],
        queryFn: getAllPublisher,
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  const submitHandler = (values: FormValue) => {
    console.log(values);
    onSubmit(values);
  };
  return (
    <form id="form-rhf-demo" onSubmit={handleSubmit(submitHandler)}>
      <FieldGroup className="">
        <RHFInput
          name="title"
          control={control}
          label="Title"
          placeholder="Title"
        />
        <RHFInput
          name="description"
          control={control}
          label="Description"
          placeholder="Description"
        />
        <RHFInput
          name="coverImage"
          control={control}
          label="CoverImage"
          type="file"
        />
        <RHFInput
          name="price"
          control={control}
          label="Price"
          type="number"
          placeholder="Price"
        />
        <RHFInput
          name="isbn13"
          control={control}
          label="ISBN13"
          placeholder="ISBN13"
        />

        <RHFSelect
          name="publisherId"
          control={control}
          label="Publisher"
          placeholder="Select Publisher"
          options={publishers}
          loading={publisherLoading}
        />

        <RHFSelect
          name="authorId"
          control={control}
          label="Author"
          placeholder="Select Author"
          options={authors}
          loading={authorLoading}
        />

        <RHFSelect
          name="categoryId"
          control={control}
          label="Category"
          placeholder="Select Category"
          options={categories}
          loading={categoryLoading}
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

export default BookForm;
