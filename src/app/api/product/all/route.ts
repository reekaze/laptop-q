import db from "@/lib/db";
import { Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const PRODUCT_BATCH = 4;

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get("cursor");
  try {
    let products: Product[] = [];

    if (cursor) {
      products = products = await db.product.findMany({
        take: PRODUCT_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        include: {
          ProductImages: true,
          ProductVariants: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      products = products = await db.product.findMany({
        take: PRODUCT_BATCH,
        include: {
          ProductImages: true,
          ProductVariants: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (products.length === PRODUCT_BATCH) {
      nextCursor = products[PRODUCT_BATCH - 1].id;
    }

    return NextResponse.json(
      {
        products,
        nextCursor,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
