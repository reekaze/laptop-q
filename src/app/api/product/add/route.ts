import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";
import { addProductFormSchema } from "@/lib/zodSchema";
import { UserType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      brand,
      description,
      images,
      type,
      variantName,
      price,
      quantity,
    } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json("user not found", { status: 400 });
    }

    if (currentUser.type === UserType.BASIC) {
      return NextResponse.json("user type is Basic", { status: 400 });
    }

    addProductFormSchema.parse({ name, brand, description, images });

    if (type === "" || !type) {
      return NextResponse.json("Type should be filled", { status: 400 });
    }

    if (
      !variantName ||
      variantName.filter((v: string) => v === "").length > 0
    ) {
      return NextResponse.json("Variant Name should be filled", {
        status: 400,
      });
    }

    if (!price || price.filter((v: number) => v < 1).length > 0) {
      return NextResponse.json("Price Name should be filled", { status: 400 });
    }

    if (!quantity || quantity.filter((v: number) => v < 1).length > 0) {
      return NextResponse.json("Quantity Name should be filled", {
        status: 400,
      });
    }

    if (
      variantName.length !== price.length ||
      variantName.length !== quantity.length ||
      price.length !== quantity.length
    ) {
      return NextResponse.json(
        "Variant Name, Price, Quantity not filled properly",
        {
          status: 400,
        }
      );
    }

    if (variantName.filter((v: any) => typeof v != "string").length > 0) {
      return NextResponse.json("Variant Name should be string", {
        status: 400,
      });
    }

    if (price.filter((v: any) => typeof v != "number").length > 0) {
      return NextResponse.json("Price should be number", {
        status: 400,
      });
    }

    if (quantity.filter((v: any) => typeof v != "number").length > 0) {
      return NextResponse.json("Quantity should be number", {
        status: 400,
      });
    }

    const newProduct = await db.product.create({
      data: {
        name,
        brand,
        description,
        variantType: type,
        ProductImages: {
          createMany: {
            data: images.map((v: string) => ({
              link: v,
            })),
          },
        },
        ProductVariants: {
          createMany: {
            data: variantName.map((v: string, i: number) => ({
              name: v,
              price: price[i],
              quantity: quantity[i],
            })),
          },
        },
      },
    });

    return NextResponse.json(newProduct, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues[0].message, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
