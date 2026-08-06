import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function GET() {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return Response.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }


        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, session.user.email))
            .limit(1);

        return Response.json(user, { status: 200 })


    } catch (error) {
        return Response.json(
            { success: false, message: "User not found" },
            { status: 404 }
        );
    }
}
