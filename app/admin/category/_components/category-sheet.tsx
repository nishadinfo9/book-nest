import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useOpenClose } from "@/store/open-close/open-close";
import CategoryForm, { CategoryFormValue } from "./category-form";
import { Category } from "@/types/caretory.type";
import { createCategory } from "@/http/api";

type categorySheetProps = {
  isEdit: boolean;
  categories: Category | undefined;
};

export function CategorySheet({ isEdit, categories }: categorySheetProps) {
  const queryClient = useQueryClient();
  const { isOpen, onClose } = useOpenClose();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: async (data: CategoryFormValue) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast("category created successfully", { position: "bottom-right" });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      toast("failed to create category", { position: "bottom-right" });
    },
  });
  const onSubmit = (data: CategoryFormValue) => {
    mutate(data);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl">Create Category</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <CategoryForm
            onSubmit={onSubmit}
            disabled={isPending}
            isEdit={isEdit}
            categories={categories}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
