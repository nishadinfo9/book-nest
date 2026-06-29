"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { columns } from "./_components/colums";
import { AuthorSheet } from "./_components/authors-sheet";
import { useOpenClose } from "@/store/open-close/open-close";
import { DataTable } from "../_components/data-table";
import AuthorTableSkeleton from "./_components/table-skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAuthor, getAllAuthors,  getAuthorById } from "@/http/api";
import { Author } from "@/types/author.type";
import { useState } from "react";

const AuthorPage = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<Author>();
  const [isEdit, setIsEdit] = useState(false);
  const { onOpen } = useOpenClose();
  const queryClient = useQueryClient();

  const {
    data: authors,
    isLoading,
    isError,
  } = useQuery<Author[]>({
    queryKey: ["authors"],
    queryFn: getAllAuthors,
  });

  const { mutate: deleteItem } = useMutation({
    mutationKey: ["delete-author"],
    mutationFn: deleteAuthor,
    onSuccess: (data) => {
      toast(data.message);
      queryClient.invalidateQueries({
        queryKey: ["authors"],
      });
    },

    onError: (error) => {
      toast(error.message);
    },
  });

  const { mutate: editAuthor } = useMutation({
    mutationKey: ["get-author-by-id"],
    mutationFn: getAuthorById,

    onSuccess: (res) => {
      setSelectedAuthor(res.data);
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
        <h2 className="text-2xl font-bold tracking-tight">Authors</h2>
        <Button
          onClick={() => {
            setIsEdit(false);
            setSelectedAuthor(undefined);
            onOpen();
          }}
          size="lg"
        >
          Add Author
        </Button>
        <AuthorSheet isEdit={isEdit} author={selectedAuthor} />
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <AuthorTableSkeleton />
      ) : (
        <DataTable
          columns={columns(handleDelete, handleEdit)}
          data={authors || []}
        />
      )}
    </>
  );
};

export default AuthorPage;