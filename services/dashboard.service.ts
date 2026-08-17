import { DashboardRepository } from "@/repositories/dashboard.repository";

export async function getDashboardData() {
  const [
    revenue,
    totalOrders,
    totalCustomers,
    totalBooks,
    recentOrders,
    lowStockBooks,
  ] = await Promise.all([
    DashboardRepository.getTotalRevenue(),
    DashboardRepository.getTotalOrders(),
    DashboardRepository.getTotalCustomers(),
    DashboardRepository.getTotalBooks(),
    DashboardRepository.getRecentOrders(),
    DashboardRepository.getLowStockBooks(),
  ]);

  console.timeEnd("end dashboard");

  return {
    stats: {
      revenue: Number(revenue[0]?.revenue ?? 0),
      orders: totalOrders[0]?.total ?? 0,
      customers: totalCustomers[0]?.total ?? 0,
      books: totalBooks[0]?.total ?? 0,
    },
    recentOrders,
    lowStockBooks,
  };
}