import { ColumnDef } from "@tanstack/react-table";
import { BookType } from "@/types/book.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

export const columns = (
  onDelete: (id:string)=>void,
  onEdit: (id: string)=>void
): ColumnDef<BookType>[] => [
  {
  accessorKey: "coverImage",
  header: "Cover",
  cell: ({ row }) => {
    const coverImage = row.original.coverImage;

    return coverImage ? (
      <Image
        src={coverImage}
        alt={row.original.title}
        height={500}
        width={500}
        loading="lazy"
        className="h-10 w-10 object-cover rounded-full"
      />
    ) : (
      <span className="text-gray-400">No Image</span>
    );
  },
},
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "author",
    header: "Author",
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
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem onClick={()=> onEdit(book.id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(String(book.slug))}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];