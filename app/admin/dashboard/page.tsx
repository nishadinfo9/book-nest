'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/http/api";
import { OrderResponse } from "@/types/order.type";
import DashboardSkeleton from "./_components/dashboardSkeleton";
import RevenueCard from "./_components/revenueCard";
import RecentOrdersComp from "./_components/recentOrdersComp";
import LowCostComp from "./_components/lowCostComp";

const AdminPage = () => {

  const { data: dashboardData, isError, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  
  const stats = dashboardData?.stats;
  
  console.log('stats', stats)

  const revenueCharts = [
    {
      id: 1,
      icon: DollarSign,
      title: "Total Revenue",
      amount: `৳${stats?.revenue ?? 0}`,
      percentage: "Lifetime Revenue",
    },
    {
      id: 2,
      icon: CreditCard,
      title: "Orders",
      amount: stats?.orders ?? 0,
      percentage: "Total Orders",
    },
    {
      id: 3,
      icon: Users,
      title: "Customers",
      amount: stats?.customers ?? 0,
      percentage: "Registered Customers",
    },
    {
      id: 4,
      icon: Activity,
      title: "Books",
      amount: stats?.books ?? 0,
      percentage: "Available Books",
    },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {revenueCharts.map((item) => (
          <RevenueCard key={item.id} item={item} />
        ))}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle> Recent Orders  </CardTitle>

            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData?.recentOrders.map((order: OrderResponse) => (
                  <RecentOrdersComp key={order.id} order={order} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Books</CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">
            {dashboardData?.lowStockBooks.length ? (
              dashboardData.lowStockBooks.map((book: OrderResponse) => (
                <LowCostComp key={book.id} book={book} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No low stock books 🎉
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminPage;