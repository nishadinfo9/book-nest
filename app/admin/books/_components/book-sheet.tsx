import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "@/http/api";
import { toast } from "sonner";
import { useOpenClose } from "@/store/open-close/open-close";
import BookForm, { FormValue } from "./book-form";
import { BookType } from "@/types/book.type";

type BookSheetProps = {
  isEdit: boolean;
  book: BookType | null ;
};

export function BookSheet({ isEdit, book }: BookSheetProps) {
  const queryClient = useQueryClient();
  const { isOpen, onClose } = useOpenClose();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-book"],
    mutationFn: async (data: FormData) => createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      toast("book created successfully", { position: "bottom-right" });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      toast("failed to create book", { position: "bottom-right" });
    },
  });
  const onSubmit = (formValue: FormValue) => {
    const formData = new FormData();
    formData.append("title", formValue.title);
    formData.append("description", String(formValue.description));
    formData.append("price", String(formValue.price));
    formData.append("discountPrice", String(formValue.discountPrice));
    formData.append("coverImage", formValue.coverImage);
    formData.append("publisherId", formValue.publisherId)
    formData.append("authorId", formValue.authorId)
    formData.append("categoryId", formValue.categoryId)
    formData.append("isbn13", String(formValue.isbn13))
    mutate(formData);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
  <SheetContent className="w-full sm:max-w-xl flex flex-col">

    <SheetHeader>
      <SheetTitle className="text-2xl">
        {
          isEdit ? 'Update Book' : 'Create Book'
        }
      </SheetTitle>
    </SheetHeader>


    <div className="flex-1 overflow-y-auto p-4">
      <BookForm
        onSubmit={onSubmit}
        disabled={isPending}
        book={book}
        isEdit={isEdit}
      />
    </div>


  </SheetContent>
</Sheet>
  );
}
