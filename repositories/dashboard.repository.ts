import { db } from "@/lib/db/db";
import { books, inventory, orders, users} from "@/lib/db/schema";
import { count, desc, eq, lt, sql } from "drizzle-orm";
const RECENT_ORDERS_LIMIT = 10;
const LOW_STOCK_THRESHOLD = 10;

export const DashboardRepository = {
    

    async getTotalRevenue() {
        return db.select({ revenue: sql<number>`COALESCE(SUM(${orders.totalAmount}),0)`,})
        .from(orders)
        .where(eq(orders.paymentStatus, "PAID"))
     },

    async getTotalOrders() { 
        return db.select({total: count()}).from(orders)

    },

    async getTotalCustomers() {
        return db.select({total: count()})
        .from(users)
        .where(eq(users.role, "CUSTOMER"))
     },

    async getTotalBooks() { 
        return db.select({total: count()})
        .from(books)
    },

    async getRecentOrders() { 
        return db.select({
          id: orders.id,
          amount: orders.totalAmount,
          status: orders.status,
          paymentStatus: orders.paymentStatus,
          createdAt: orders.createdAt})
        .from(orders)
        .orderBy(desc(orders.createdAt))
        .limit(RECENT_ORDERS_LIMIT )
    },

    async getLowStockBooks() { 
        return db
        .select({
          id: books.id,
          title: books.title,
          stock: inventory.availableStock })
        .from(inventory)
        .innerJoin(books, eq(inventory.bookId, books.id))
        .where(lt(inventory.availableStock, LOW_STOCK_THRESHOLD))
        .orderBy(inventory.availableStock)
    },
}