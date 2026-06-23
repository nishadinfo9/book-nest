import { db } from "@/lib/db/db";
import { books, inventory } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await db.delete(inventory).where(eq(inventory.id, id));
    return Response.json("inventory deleted successfully", { status: 200 });
  } catch (error) {
    console.log("inevntory deleting failed", error);
    return Response.json(
      { message: "inevntory deleting failed" },
      { status: 500 },
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const singleInventory = await db
      .select({
        id: inventory.id,
        book: books.title,
        availableStock: inventory.availableStock,
        reservedStock: inventory.reservedStock,
        soldStock: inventory.soldStock,
      })
      .from(inventory)
      .leftJoin(books, eq(inventory.bookId, books.id))
      .where(eq(inventory.id, id))
      .limit(1);

    if (!singleInventory.length) {
      return Response.json({ error: "inventory not found" }, { status: 404 });
    }

    return Response.json({
      data: singleInventory[0],
    });
  } catch (error) {
    console.error("inventory not found:", error);
    return Response.json({ error: "inventory not found" }, { status: 404 });
  }
}
