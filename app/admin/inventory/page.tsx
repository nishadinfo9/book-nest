'use client'

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { columns } from "./_components/colums";
import { InventorySheet } from "./_components/inventory-sheet";
import { useOpenClose } from "@/store/open-close/open-close";
import { DataTable } from "../_components/data-table";
import InventoryTableSkeleton from "./_components/table-skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteInventory, getInventories } from "@/http/api";
import { InventoryType } from "@/types/inventory.type";

const Inventory = () => {
const { onOpen } = useOpenClose();
  const queryClient = useQueryClient();

  const {
    data: inventories,
    isLoading,
    isError,
  } = useQuery<InventoryType[]>({
    queryKey: ["inventories"],
    queryFn: getInventories,
  });

  console.log('inventories', inventories)

  const { mutate } = useMutation({
    mutationKey: ["delete-inventory"],
    mutationFn: deleteInventory,
    onSuccess: (data) => {
      console.log(data);
      toast(data.message);
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },

    onError: (error) => {
      toast(error.message);
      console.error("Delete failed:", error);
    },
  });

  const handleDelete = async (id: string) => {
    try {
      mutate(id);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };


  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Books</h2>
        <Button
          onClick={() => {
            onOpen();
          }}
          size={"lg"}
        >
          Add Book
        </Button>
        <InventorySheet />
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <InventoryTableSkeleton />
      ) : (
        <DataTable
          columns={columns(handleDelete)}
          data={inventories || []}
        />
      )}
    </>
  );
};

export default Inventory;
