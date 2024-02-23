import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type productParams = {
  params: {
    productId: string;
  };
};

export async function GET(
  req: NextRequest,
  { params: { productId } }: productParams
) {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        ProductImages: true,
        ProductVariants: true,
      },
    });

    if (!product) {
      return NextResponse.json("product not found", {
        status: 400,
      });
    }

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
