"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { columns } from "./_components/colums";
import { CategorySheet } from "./_components/category-sheet";
import { useOpenClose } from "@/store/open-close/open-close";
import { DataTable } from "../_components/data-table";
import CategoryTableSkeleton from "./_components/table-skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/types/caretory.type";
import { useState } from "react";
import { deleteCategory, getAllCategories, getCategoryById } from "@/http/api";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [isEdit, setIsEdit] = useState(false);
  const { onOpen } = useOpenClose();
  const queryClient = useQueryClient();

  const {
    data: category,
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { mutate: deleteItem } = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      toast(data.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (error) => {
      toast(error.message);
    },
  });

  const { mutate: editAuthor } = useMutation({
    mutationKey: ["get-category-by-id"],
    mutationFn: getCategoryById,

    onSuccess: (res) => {
      setSelectedCategory(res.data);
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
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        <Button
          onClick={() => {
            setIsEdit(false);
            setSelectedCategory(undefined);
            onOpen();
          }}
          size="lg"
        >
          Add Category
        </Button>
        <CategorySheet isEdit={isEdit} categories={selectedCategory} />
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <CategoryTableSkeleton />
      ) : (
        <DataTable
          columns={columns(handleDelete, handleEdit)}
          data={category || []}
        />
      )}
    </>
  );
};

export default CategoryPage;