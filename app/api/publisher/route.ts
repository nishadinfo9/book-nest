import { db } from "@/lib/db/db";
import { publishers } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit") ?? 10);
    const page = Number(searchParams.get("page") ?? 1);

    const allPublishers = await db
      .select()
      .from(publishers)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(publishers.createdAt));

    return Response.json(allPublishers, { status: 200 });
  } catch (error) {
    console.log("Publishers not found", error);
    return Response.json({ message: "Publishers not found" }, { status: 500 });
  }
}