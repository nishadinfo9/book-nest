import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Category } from "@/types/caretory.type";

export const columns = (
  onDelete: (id: string) => void,
  onEdit: (id: string) => void,
): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.isActive ? (
            <span className="text-green-600">Yes</span>
          ) : (
            <span className="text-red-500">No</span>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(category.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(category.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
