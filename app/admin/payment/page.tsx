"use client";

import { columns } from "./_components/colums";

import { DataTable } from "../_components/data-table";
import PaymentTableSkeleton from "./_components/table-skeleton";
import { getpaymantHistory } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { PaymentType } from "@/types/payment.type";


const PaymentHistory = () => {

  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery<PaymentType[]>({
    queryKey: ["payments"],
    queryFn: getpaymantHistory,
  });





  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Payments</h2>
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <PaymentTableSkeleton />
      ) : (
        <DataTable
          columns={columns()}
          data={payments || []}
        />
      )}
    </>
  );
};

export default PaymentHistory;
