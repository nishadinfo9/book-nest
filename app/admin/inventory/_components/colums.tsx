import { ColumnDef } from "@tanstack/react-table";
import { InventoryType } from "@/types/inventory.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const columns = (
  onDelete: (id: string) => void,
): ColumnDef<InventoryType>[] => [
  {
    accessorKey: "bookId",
    header: "BookId",
  },
  {
    accessorKey: "availableStock",
    header: "AvailableStock",
  },
  {
    accessorKey: "reservedStock",
    header: "ReservedStock",
  },
  {
    accessorKey: "soldStock",
    header: "SoldStock",
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(String(book.id))}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
