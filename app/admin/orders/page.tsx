"use client";

import { columns } from "./_components/colums";

import { DataTable } from "../_components/data-table";
import OrderTableSkeleton from "./_components/table-skeleton";
import { getAllOrders } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { OrderType } from "@/types/order.type";


const Inventory = () => {

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<OrderType[]>({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });





  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Inventories</h2>
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <OrderTableSkeleton />
      ) : (
        <DataTable
          columns={columns()}
          data={orders || []}
        />
      )}
    </>
  );
};

export default Inventory;
