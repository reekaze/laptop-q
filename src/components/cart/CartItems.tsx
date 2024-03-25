"use client";
import { CartItemType } from "@/lib/types";
import CartItem from "./CartItem";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { useSelectedCartList } from "@/hooks/useSelectedCartList";
import { useEffect, useState } from "react";

type CartItemProps = {
  cartItems: CartItemType[];
};

const CartItems = ({ cartItems }: CartItemProps) => {
  const selectedList = useSelectedCartList((state) => state.selectedList);
  const updateSelectedList = useSelectedCartList(
    (state) => state.updateSelectedList
  );
  const [isSelectedAll, setIsSelectedAll] = useState(true);
  useEffect(() => {
    setIsSelectedAll(selectedList.every((item) => item));

    return () => {};
  }, [selectedList]);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="p-4 flex gap-4 items-center rounded-t-lg bg-green-100/80 shadow-md">
        <Checkbox
          checked={isSelectedAll}
          onCheckedChange={() => {
            setIsSelectedAll(!isSelectedAll);

            updateSelectedList(selectedList.map((item) => !isSelectedAll));
          }}
        />
        <p>Select All</p>
      </div>
      <div className="flex flex-col p-4 rounded-b-lg bg-green-100/80 shadow-md">
        {cartItems.map((item, idx) => (
          <div key={item.id}>
            <CartItem item={item} index={idx} />
            {idx !== cartItems.length - 1 && (
              <Separator className="my-4 bg-green-200/50 h-1 rounded-xl" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;
