import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json("user not found");
    }

    let cart = await db.cart.findFirst({
      where: {
        userId: currentUser.id,
      },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: currentUser.id,
        },
      });

      return NextResponse.json(null, {
        status: 200,
      });
    }

    const cartItems = await db.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        ProductVariant: {
          include: {
            Product: {
              include: {
                ProductImages: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
