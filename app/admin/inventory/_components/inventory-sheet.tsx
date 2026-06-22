import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventory } from "@/http/api";
import { toast } from "sonner";
import { useOpenClose } from "@/store/open-close/open-close";
import InventoryForm, { FormValue } from "./inventory-form";

export function InventorySheet() {
  const queryClient = useQueryClient();
  const { isOpen, onClose } = useOpenClose();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-inventory"],
    mutationFn: async (data: FormData) => createInventory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventories"],
      });
      toast("inventory created successfully", { position: "bottom-right" });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      toast("failed to create inventory", { position: "bottom-right" });
    },
  });
  const onSubmit = (data: FormValue) => {
    mutate(data);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl">Create Book</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <InventoryForm onSubmit={onSubmit} disabled={isPending} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
