"use client";
import { CartItemType } from "@/lib/types";
import { cn, currenciesFormatter } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import { Input } from "../ui/input";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  useEffect(() => {
    setQuantity(item.quantity);

    return () => {};
  }, [item.quantity]);

  const isQuantityAvailable = quantity < item.ProductVariant.quantity;

  return (
    <div className="flex flex-row gap-4">
      <div className="flex items-center">
        <div className="relative  min-w-10 min-h-10 md:min-w-20 md:min-h-20">
          <Image
            src={item.ProductVariant.Product.ProductImages[0].link}
            alt="image"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col w-full break-all">
        <p>{item.ProductVariant.Product.name}</p>
        {item.ProductVariant.name !== "DEFAULT" && (
          <>
            <p className="font-semibold">
              {item.ProductVariant.Product.variantType}:{" "}
              {item.ProductVariant.name}
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-1 items-end">
        <p className="font-semibold">
          {currenciesFormatter.format(item.ProductVariant.price)}
        </p>
        <div className="flex gap-2 justify-between">
          <div
            onClick={() => {
              quantity > 1 && setQuantity(quantity - 1);
            }}
            className={cn(
              "p-2 bg rounded-md cursor-pointer flex items-center",
              quantity > 1 ? "bg-green-200" : "bg-green-100/50"
            )}
          >
            <Minus
              size={15}
              className={cn(quantity > 1 ? "text-black " : "text-slate-400")}
            />
          </div>
          <Input
            value={quantity}
            type="number"
            className="text-center min-w-12 max-h-8 text-[14px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuantity(parseInt(e.target.value))
            }
          />
          <div
            onClick={() => {
              if (isQuantityAvailable) {
                setQuantity(quantity + 1);
              }
            }}
            className={cn(
              "p-2 bg-green-200 rounded-md cursor-pointer flex items-center",
              isQuantityAvailable ? "bg-green-200 " : "bg-green-100/50"
            )}
          >
            <Plus
              size={15}
              className={cn(
                isQuantityAvailable ? "text-black " : "text-slate-400"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
