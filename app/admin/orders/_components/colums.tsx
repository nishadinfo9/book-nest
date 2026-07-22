import { ColumnDef } from "@tanstack/react-table";
import { OrderType } from "@/types/order.type";


export const columns = (

): ColumnDef<OrderType>[] => [
  {
    accessorKey: "user",
    header: "User",
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
    accessorKey: "paymentGateway",
    header: "Payment Gateway",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
  },
  {
    accessorKey: "transactionId",
    header: "transactionId",
  },

];
