import { ColumnDef } from "@tanstack/react-table";
import { PaymentType } from "@/types/payment.type";


export const columns = (

): ColumnDef<PaymentType>[] => [
    {
      accessorKey: "book",
      header: "Book",
    },

    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "method",
      header: "Method",
    },
    {
      accessorKey: "gateway",
      header: "Gateway",
    },
    {
      accessorKey: "currency",
      header: "Currency",
    },
    {
      accessorKey: "transactionId",
      header: "Transaction Id",
    },

  ];
