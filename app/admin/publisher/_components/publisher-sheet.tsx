import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useOpenClose } from "@/store/open-close/open-close";
import PublisherForm, { PublisherFormValue } from "./publisher-form";
import { Publisher } from "@/types/publisher.type";
import { createPublisher } from "@/http/api";

type publisherSheetProps = {
  isEdit: boolean;
  publishers: Publisher | undefined;
};

export function PublisherSheet({ isEdit, publishers }: publisherSheetProps) {
  const queryClient = useQueryClient();
  const { isOpen, onClose } = useOpenClose();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-publisher"],
    mutationFn: async (data: PublisherFormValue) => createPublisher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["publishers"],
      });
      toast("publisher created successfully", { position: "bottom-right" });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      toast("failed to create publisher", { position: "bottom-right" });
    },
  });
  const onSubmit = (data: PublisherFormValue) => {
    mutate(data);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl">Create publisher</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <PublisherForm
            onSubmit={onSubmit}
            disabled={isPending}
            isEdit={isEdit}
            publishers={publishers}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
