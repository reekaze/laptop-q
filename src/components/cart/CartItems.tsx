"use client";
import { CartItemType } from "@/lib/types";
import CartItem from "./CartItem";
import { Separator } from "../ui/separator";

type CartItemProps = {
  cartItems: CartItemType[];
};

const CartItems = ({ cartItems }: CartItemProps) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="p-4 rounded-t-lg bg-green-100/80 shadow-md">
        Select All
      </div>
      <div className="flex flex-col p-4 rounded-b-lg bg-green-100/80 shadow-md">
        {cartItems.map((item, idx) => (
          <div key={item.id}>
            <CartItem item={item} />
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
