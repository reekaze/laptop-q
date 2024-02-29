import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";
import { addCartFormSchema, deleteCartFormSchema } from "@/lib/zodSchema";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function POST(req: NextRequest) {
  try {
    const { productVariantId, quantity } = await req.json();
    addCartFormSchema.parse({ productVariantId, quantity });
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json("user not found", { status: 400 });
    }

    const productVariant = await db.productVariant.findUnique({
      where: {
        id: productVariantId,
      },
    });

    if (!productVariant) {
      return NextResponse.json("Product Variant not found", { status: 400 });
    }

    if (quantity > productVariant.quantity) {
      return NextResponse.json(
        "Quantity should be lower or equal to Product stock",
        { status: 400 }
      );
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
    }

    let cartItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productVariantId: productVariantId,
      },
    });

    if (!cartItem) {
      cartItem = await db.cartItem.create({
        data: {
          cartId: cart.id,
          productVariantId: productVariant.id,
          quantity,
        },
      });
      return NextResponse.json(cartItem, { status: 200 });
    }

    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json(cartItem, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues[0].message, { status: 400 });
    }

    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { cartItemId } = await req.json();

    deleteCartFormSchema.parse({
      cartItemId,
    });

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json("user not found", { status: 400 });
    }

    const deletedCartItem = await db.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return NextResponse.json(deletedCartItem, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues[0].message, {
        status: 400,
      });
    }
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
