import {
  getDashboardRevenue,
  getDashboardOrders,
  getDashboardCustomers,
  getDashboardBooks,
  getRecentOrders,
  getLowStockBooks,
} from "@/services/dashboard.service";

export async function GET() {
  try {
    const revenue = await getDashboardRevenue();
    const orders = await getDashboardOrders();
    const customers = await getDashboardCustomers();
    const books = await getDashboardBooks();
    const recentOrders = await getRecentOrders();
    const lowStockBooks = await getLowStockBooks();

    const dashboard = {
      stats: {
        revenue,
        orders,
        customers,
        books,
      },
      recentOrders,
      lowStockBooks,
    };

    return Response.json(dashboard, { status: 200 });
  } catch (error) {
    console.error("Dashboard API error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load dashboard",
      },
      { status: 500 }
    );
  }
}