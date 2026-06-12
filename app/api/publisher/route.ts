import { db } from "@/lib/db/db";
import { publishers } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    await db.insert(publishers).values({name});
    return Response.json(
      { message: "publisher creatded successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log("publisher creatded Error", error);
    return Response.json(
      { error: "publisher creatded Error" },
      { status: 500 },
    );
  }
}
