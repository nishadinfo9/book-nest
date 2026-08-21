import { DashboardRepository } from "@/repositories/dashboard.repository";

export async function getDashboardRevenue() {
  const revenue = await DashboardRepository.getTotalRevenue();

  return Number(revenue[0]?.revenue ?? 0);
}

export async function getDashboardOrders() {
  const orders = await DashboardRepository.getTotalOrders();

  return orders[0]?.total ?? 0;
}

export async function getDashboardCustomers() {
  const customers = await DashboardRepository.getTotalCustomers();

  return customers[0]?.total ?? 0;
}

export async function getDashboardBooks() {
  const books = await DashboardRepository.getTotalBooks();

  return books[0]?.total ?? 0;
}

export async function getRecentOrders() {
  return DashboardRepository.getRecentOrders();
}

export async function getLowStockBooks() {
  return DashboardRepository.getLowStockBooks();
}