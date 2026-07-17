import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, provider, externalId,password } = body;


    if (!name || !email || !password) {
      return Response.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }


    // check duplicate user
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);


    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      provider: provider || "credentials",
      externalId: externalId || null,
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