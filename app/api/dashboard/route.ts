import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";

import {
  books,
  inventory,
  orders,
  users,
} from "@/lib/db/schema";

import {
  count,
  desc,
  eq,
  lt,
  sql,
} from "drizzle-orm";

export async function GET() {
  try {
    const [
      revenue,
      totalOrders,
      totalCustomers,
      totalBooks,
      recentOrders,
      lowStockBooks,
    ] = await Promise.all([
      // Total Revenue
      db
        .select({
          revenue: sql<number>`COALESCE(SUM(${orders.totalAmount}),0)`,
        })
        .from(orders)
        .where(eq(orders.paymentStatus, "PAID")),

      // Total Orders
      db
        .select({
          total: count(),
        })
        .from(orders),

      // Total Customers
      db
        .select({
          total: count(),
        })
        .from(users)
        .where(eq(users.role, "CUSTOMER")),

      // Total Books
      db
        .select({
          total: count(),
        })
        .from(books),

      // Recent Orders
      db
        .select({
          id: orders.id,
          amount: orders.totalAmount,
          status: orders.status,
          paymentStatus: orders.paymentStatus,
          createdAt: orders.createdAt,
        })
        .from(orders)
        .orderBy(desc(orders.createdAt))
        .limit(10),

      // Low Stock Books
      db
        .select({
          id: books.id,
          title: books.title,
          stock: inventory.availableStock,
        })
        .from(inventory)
        .innerJoin(books, eq(inventory.bookId, books.id))
        .where(lt(inventory.availableStock, 10))
        .orderBy(inventory.availableStock),
    ]);

    console.log({ revenue,
      totalOrders,
      totalCustomers,
      totalBooks,
      recentOrders,
      lowStockBooks,})

    return NextResponse.json({
      success: true,

      stats: {
        revenue: Number(revenue[0]?.revenue ?? 0),
        orders: totalOrders[0]?.total ?? 0,
        customers: totalCustomers[0]?.total ?? 0,
        books: totalBooks[0]?.total ?? 0,
      },
      recentOrders,
      lowStockBooks,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}