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
    onEdit: (id: string) => void,
): ColumnDef<InventoryType>[] => [
  {
    accessorKey: "book",
    header: "Books",
  },
{
  accessorKey: "availableStock",
  header: "Available Stock",
  cell: ({ row }) => {
    const stock = row.original.availableStock;

    let color = "";

    if (stock >= 50) {
      color = "text-green-600";
    } else if (stock <= 30 && stock > 10) {
      color = "text-yellow-400";
    } else if (stock <= 10) {
      color = "text-red-600";
    }

    return (
      <span className={`${color}`}>
        {stock}
      </span>
    );
  },
},
  {
    accessorKey: "reservedStock",
    header: "Reserved Stock",
  },
  {
    accessorKey: "soldStock",
    header: "Sold Stock",
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const inventory = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={()=> onEdit(inventory.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(inventory.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
