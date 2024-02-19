import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { sign } from "jsonwebtoken";
import { formLoginSchema } from "@/lib/zodSchema";
import * as z from "zod";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    formLoginSchema.parse({ email, password });

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json("User not found", {
        status: 400,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json("Password not valid", {
        status: 400,
      });
    }

    //generate JWT Token
    const payload = {
      id: user.id,
      email: user.email,
    };

    // set token expires
    const expires = 60 * 60 * 24 * 30 * 12;

    const token = sign(payload, process.env.JWT_SECRET!, {
      expiresIn: expires,
    });

    //set http-only cookie in response header

    const res = NextResponse.json("Login success", {
      status: 200,
    });

    res.cookies.set({
      name: "token",
      value: token,
      maxAge: expires,
      httpOnly: true,
      sameSite: "strict",
    });

    return res;
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
