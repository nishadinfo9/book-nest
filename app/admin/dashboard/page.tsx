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

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/http/api";
import { OrderResponse } from "@/types/order.type";

const AdminPage = () => {

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const stats = dashboardData?.stats;

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
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>

              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{item.amount}</div>

              <p className="text-xs text-muted-foreground">
                {item.percentage}
              </p>
            </CardContent>
          </Card>
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
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      #{order.id.slice(0, 8)}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">
                        {order.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          order.paymentStatus === "PAID"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      ৳{order.amount}
                    </TableCell>
                  </TableRow>
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
                <div
                  key={book.id}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{book.title}</p>

                    <p className="text-sm text-muted-foreground">
                      Remaining Stock
                    </p>
                  </div>

                  <Badge variant="destructive">
                    {book.stock}
                  </Badge>
                </div>
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