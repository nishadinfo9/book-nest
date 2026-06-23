import { db } from "@/lib/db/db";
import { books, inventory } from "@/lib/db/schema";
import { CreateInventorySchema } from "@/lib/validation/inventorySchema";
import {  eq } from "drizzle-orm";

export async function POST(request: Request) {
  const data = await request.json();

  const validation = CreateInventorySchema.safeParse(data);

  if (!validation.success) {
    return Response.json(validation.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  try {
    await db.insert(inventory).values(validation.data);
    return Response.json(
      { message: "inevntory created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log("inevntory creation failed", error);
    return Response.json(
      { message: "inevntory creation failed" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const inventories = await db
      .select({
        id: inventory.id,
        book: books.title,
        availableStock: inventory.availableStock,
        reservedStock: inventory.reservedStock,
        soldStock: inventory.soldStock,
      })
      .from(inventory)
      .leftJoin(books, eq(inventory.bookId, books.id))

    return Response.json(inventories, { status: 200 });
  } catch (error) {
    console.log("inevntory getting failed", error);
    return Response.json(
      { message: "inevntory getting failed" },
      { status: 500 },
    );
  }
}
