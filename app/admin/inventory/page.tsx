"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { columns } from "./_components/colums";
import { InventorySheet } from "./_components/inventory-sheet";
import { useOpenClose } from "@/store/open-close/open-close";
import { DataTable } from "../_components/data-table";
import InventoryTableSkeleton from "./_components/table-skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteInventory, getInventories, getInventoryById } from "@/http/api";
import { InventoryType } from "@/types/inventory.type";
import { useState } from "react";

const Inventory = () => {
  const [selectedInventory, setSelectedInventory] = useState<InventoryType>();
  const [isEdit, setIsEdit] = useState(false);
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

  const { mutate: deleteItem } = useMutation({
    mutationKey: ["delete-inventory"],
    mutationFn: deleteInventory,
    onSuccess: (data) => {
      toast(data.message);
      queryClient.invalidateQueries({
        queryKey: ["inventories"],
      });
    },

    onError: (error) => {
      toast(error.message);
    },
  });

  const { mutate: editInventory } = useMutation({
    mutationKey: ["get-inventory-by-id"],
    mutationFn: getInventoryById,

    onSuccess: (res) => {
      setSelectedInventory(res.data);
      setIsEdit(true);
      onOpen();
    },
  });

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const handleEdit = (id: string) => {
    editInventory(id);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Inventories</h2>
        <Button
          onClick={() => {
            setIsEdit(false);
            setSelectedInventory(undefined);
            onOpen();
          }}
          size="lg"
        >
          Add Inventory
        </Button>
        <InventorySheet isEdit={isEdit} inventory={selectedInventory} />
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <InventoryTableSkeleton />
      ) : (
        <DataTable
          columns={columns(handleDelete, handleEdit)}
          data={inventories || []}
        />
      )}
    </>
  );
};

export default Inventory;
