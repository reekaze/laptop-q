"use client";
import { useAllCartItems } from "@/hooks/useAllCartItems";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { CartItemType } from "@/lib/types";
import { currenciesFormatter } from "@/lib/utils";
import { useUpdateCartItem } from "@/hooks/useUpdateCartItem";

type ShoppingSummaryProps = {};

const ShoppingSummary = ({}: ShoppingSummaryProps) => {
  const { cartItems, status, isRefetching } = useAllCartItems();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    (cartItems as CartItemType[]).map((item) => {
      total += item.quantity * item.ProductVariant.price;
    });

    setTotalPrice(total);

    return () => {};
  }, [cartItems]);

  return (
    <div className="sticky bottom-0 md:top-[83px] w-full md:w-min min-w-56 h-min flex flex-col gap-4 p-4 bg-green-200 rounded-lg shadow-md">
      <p className="font-semibold">Shopping Summary</p>
      <div className="flex flex-row justify-between">
        <p>Total</p>
        {isRefetching ? (
          <div className="w-24 h-6 rounded-xl bg-green-300 animate-pulse" />
        ) : (
          <p className="font-semibold">
            {currenciesFormatter.format(totalPrice)}
          </p>
        )}
      </div>
      <Button variant={"green"}>Buy</Button>
    </div>
  );
};

export default ShoppingSummary;
