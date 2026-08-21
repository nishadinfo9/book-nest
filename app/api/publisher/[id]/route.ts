import { db } from "@/lib/db/db";
import { publishers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() { }
export async function PATCH() { }

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        await db.delete(publishers).where(eq(publishers.id, id));
        return Response.json("publisher deleted successfully", { status: 200 });
    } catch (error) {
        console.log("publisher deleting failed", error);
        return Response.json(
            { message: "publisher deleting failed" },
            { status: 500 },
        );
    }
}

