import { ColumnDef } from "@tanstack/react-table";
import { OrderType } from "@/types/order.type";


export const columns = (

): ColumnDef<OrderType>[] => [
  {
    accessorKey: "book",
    header: "Book",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
  },


];
