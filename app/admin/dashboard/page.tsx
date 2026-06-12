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

const revenueCharts = [
  {
    id: 1,
    icon: DollarSign,
    title: "Total Revenue",
    amount: "$45,231.89",
    parcentage: "+20.1% from last month",
  },
  {
    id: 2,
    icon: Users,
    title: "Subscriptions",
    amount: "+2350",
    parcentage: "+180.1% from last month",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Sales",
    amount: "+12,234",
    parcentage: "+19% from last month",
  },
  {
    id: 4,
    icon: Activity,
    title: "Active Now",
    amount: "+573",
    parcentage: "+201 since last hour",
  },
];

const tableData = [
  {
    name: "Liam Johnson",
    email: "liam@example.com",
    type: "Sale",
    status: "Approved",
    date: "2023-06-23",
    amount: "$250.00",
  },
  {
    name: "Olivia Smith",
    email: "olivia@example.com",
    type: "Refund",
    status: "Declined",
    date: "2023-06-24",
    amount: "$150.00",
  },
  {
    name: "Noah Williams",
    email: "noah@example.com",
    type: "Subscription",
    status: "Approved",
    date: "2023-06-25",
    amount: "$350.00",
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    type: "Sale",
    status: "Approved",
    date: "2023-06-26",
    amount: "$450.00",
  },
  {
    name: "Liam Johnson",
    email: "liam@example.com",
    type: "Sale",
    status: "Approved",
    date: "2023-06-27",
    amount: "$550.00",
  },
];
const AdminPage = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {revenueCharts.map((item) => (
          <Card key={item.id} x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.amount}</div>
              <p className="text-xs text-muted-foreground">{item.parcentage}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent transactions from your store.
              </CardDescription>
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
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden xl:table-column">Type</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead className="hidden xl:table-column">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {item.email}
                      </div>
                    </TableCell>

                    <TableCell className="hidden xl:table-column">
                      {item.type}
                    </TableCell>

                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        {item.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      {item.date}
                    </TableCell>

                    <TableCell className="text-right">{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminPage;