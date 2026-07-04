import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAuthor } from "@/http/api";
import { toast } from "sonner";
import { useOpenClose } from "@/store/open-close/open-close";
import { Author } from "@/types/author.type";
import AuthorForm, { AuthorFormValue } from "./authors-form";

type authorSheetProps = {
  isEdit: boolean;
  authors: Author | undefined;
};

export function AuthorSheet({ isEdit, authors }: authorSheetProps) {
  const queryClient = useQueryClient();
  const { isOpen, onClose } = useOpenClose();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-author"],
    mutationFn: async (data: AuthorFormValue) => createAuthor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authors"],
      });
      toast("author created successfully", { position: "bottom-right" });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      toast("failed to create author", { position: "bottom-right" });
    },
  });
  const onSubmit = (data: AuthorFormValue) => {
    mutate(data);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl">Create Author</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <AuthorForm
            onSubmit={onSubmit}
            disabled={isPending}
            isEdit={isEdit}
            authors={authors}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
