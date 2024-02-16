import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const res = NextResponse.json("logout", { status: 200 });

  //remove token froom cookies in client side
  res.cookies.set({
    name: "token",
    value: "",
    maxAge: 0,
    httpOnly: true,
    sameSite: "strict",
  });

  return res;
}
