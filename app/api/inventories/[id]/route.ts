import { db } from "@/lib/db/db";
import { inventory } from "@/lib/db/schema";
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
