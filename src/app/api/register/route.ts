import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserType } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json("Username, Email, Password is required", {
        status: 400,
      });
    }
    const existingEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return NextResponse.json("Email is used", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        username,
        email,
        hashedPassword,
        type: UserType.BASIC,
      },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
