import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import db from "../db";

export const getCurrentUser = async () => {
  const token = cookies().get("token")?.value;

  if (token) {
    const decode = verify(token, process.env.JWT_SECRET!);
    const id = (decode as JwtPayload)?.id;

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  return null;
};
