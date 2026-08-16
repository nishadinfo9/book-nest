import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs'
import { RegisterSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const reqData = body;

    const { data, success } = RegisterSchema.safeParse(reqData)

    if (!success) {
      return Response.json({ message: 'user validation failed' }, { status: 404 })
    }

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);


    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      provider: data.provider || "credentials",
      externalId: data.externalId || null,
      role: "CUSTOMER",
      emailVerified: false,
      isActive: true,
    });

    return Response.json(
      {
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("User creation error:", error);

    return Response.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}