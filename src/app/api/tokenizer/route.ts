import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

const midtransClient = require("midtrans-client");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

const DELIVERY_PRICE = 10;

export async function POST(req: NextRequest) {
  try {
    const { gross_amount } = await req.json();

    if (!gross_amount) {
      return NextResponse.json("Gross amount should be filled", {
        status: 400,
      });
    }

    if (!Number(gross_amount)) {
      return NextResponse.json("Gross amount should be number", {
        status: 400,
      });
    }

    if (gross_amount <= 0) {
      return NextResponse.json("Gross amount should be greater than zero", {
        status: 400,
      });
    }

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json("user not found", {
        status: 400,
      });
    }

    let parameter = {
      transaction_details: {
        order_id: uuidv4(),
        gross_amount: gross_amount + DELIVERY_PRICE,
      },
    };

    const token = await snap.createTransactionToken(parameter);

    return NextResponse.json(token, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues[0].message, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
