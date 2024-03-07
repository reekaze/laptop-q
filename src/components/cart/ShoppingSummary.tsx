"use client";
import { useAllCartItems } from "@/hooks/useAllCartItems";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { CartItemType } from "@/lib/types";
import { currenciesFormatter } from "@/lib/utils";
import { useSelectedCartList } from "@/hooks/selectedCartList";
import LoadSpin from "../LoadSpin";
import { useRouter } from "next/navigation";

type ShoppingSummaryProps = {};

const ShoppingSummary = ({}: ShoppingSummaryProps) => {
  const router = useRouter();
  const { cartItems, status, isRefetching } = useAllCartItems();

  const selectedList = useSelectedCartList((state) => state.selectedList);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    let total = 0;
    let totItem = 0;

    (cartItems as CartItemType[]).map((item, index) => {
      if (selectedList[index] === true) {
        total += item.quantity * item.ProductVariant.price;
        totItem += item.quantity;
      }
    });

    setTotalPrice(total);
    setTotalItem(totItem);

    return () => {};
  }, [cartItems, selectedList]);

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
      <Button
        variant={"green"}
        disabled={isRefetching}
        onClick={() => totalItem != 0 && router.push("/cart/shipment")}
      >
        {isRefetching ? (
          <LoadSpin hscreen={false} color="text-black" size={20} />
        ) : (
          `Buy${totalItem !== 0 ? " " + totalItem : ""}`
        )}
      </Button>
    </div>
  );
};

export default ShoppingSummary;
