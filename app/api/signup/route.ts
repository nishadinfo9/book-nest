import { SignUp } from "@/services/signup.service";

export async function POST(req: Request) {
  try {
    const reqData = await req.json();
   await SignUp(reqData)

    return Response.json(
        { message: "User created successfully" },
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