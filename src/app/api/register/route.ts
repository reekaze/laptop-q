import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserType } from "@prisma/client";
import { formRegisterSchema } from "@/lib/zodSchema";
import * as z from "zod";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    formRegisterSchema.parse({ username, email, password });

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
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues[0].message, { status: 400 });
    }

    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
