"use client"

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { columns } from "./_components/colums";
import { BookType } from "@/types/book.type";
import { BookSheet } from "./_components/book-sheet";
import { useOpenClose } from "@/store/open-close/open-close";
import { DataTable } from "../_components/data-table";
import ProductTableSkeleton from "./_components/table-skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBook, getBooks } from "@/http/api";

const ProductPage = () => {
  const { onOpen } = useOpenClose();
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<BookType[]>({
    queryKey: ["books"],
    queryFn: getBooks,
  });


  const { mutate } = useMutation({
    mutationKey: ["delete-book"],
    mutationFn: deleteBook,
    onSuccess: (data) => {
      toast(data.message);
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },

    onError: (error) => {
      toast(error.message);
      console.error("Delete failed:", error);
    },
  });

  const handleDelete = async (id: string) => {
    try {
      mutate(id);

      console.log("Deleted:", id);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Books</h2>
        <Button onClick={onOpen} size={"lg"}>
          Add Book
        </Button>
        <BookSheet />
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <ProductTableSkeleton />
      ) : (
        <DataTable columns={columns(handleDelete)} data={products || []} />
      )}
    </>
  );
};

export default ProductPage;