import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Author } from "@/types/author.type";
import Image from "next/image";

export const columns = (
  onDelete: (id: string) => void,
  onEdit: (id: string) => void,
): ColumnDef<Author>[] => [
   {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const image = row.original.image;
  
        return image ? (
          <Image
            src={image}
            alt={row.original.name}
            height={500}
            width={500}
            loading="lazy"
            className="h-10 w-10 object-cover rounded-sm"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        );
      },
    },
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
            <DropdownMenuItem onClick={() => onEdit(inventory.id)}>
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
