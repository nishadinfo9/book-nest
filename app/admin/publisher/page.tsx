"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { columns } from "./_components/colums";
import { PublisherSheet } from "./_components/publisher-sheet";
import { useOpenClose } from "@/store/open-close/open-close";
import { DataTable } from "../_components/data-table";
import PublisherTableSkeleton from "./_components/table-skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Publisher } from "@/types/publisher.type";
import { useState } from "react";
import { deletePublisher, getAllPublishers, getPublisherById } from "@/http/api";

const PublisherPage = () => {
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher>();
  const [isEdit, setIsEdit] = useState(false);
  const { onOpen } = useOpenClose();
  const queryClient = useQueryClient();

  const {
    data: publisher,
    isLoading,
    isError,
  } = useQuery<Publisher[]>({
    queryKey: ["publishers"],
    queryFn: getAllPublishers,
  });

  const { mutate: deleteItem } = useMutation({
    mutationKey: ["delete-publisher"],
    mutationFn: deletePublisher,
    onSuccess: (data) => {
      toast(data.message);
      queryClient.invalidateQueries({
        queryKey: ["publishers"],
      });
    },

    onError: (error) => {
      toast(error.message);
    },
  });

  const { mutate: editAuthor } = useMutation({
    mutationKey: ["get-publisher-by-id"],
    mutationFn: getPublisherById,

    onSuccess: (res) => {
      setSelectedPublisher(res.data);
      setIsEdit(true);
      onOpen();
    },
  });

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const handleEdit = (id: string) => {
    editAuthor(id);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Publishers</h2>
        <Button
          onClick={() => {
            setIsEdit(false);
            setSelectedPublisher(undefined);
            onOpen();
          }}
          size="lg"
        >
          Add Publisher
        </Button>
        <PublisherSheet isEdit={isEdit} publishers={selectedPublisher} />
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <PublisherTableSkeleton />
      ) : (
        <DataTable
          columns={columns(handleDelete, handleEdit)}
          data={publisher || []}
        />
      )}
    </>
  );
};

export default PublisherPage;