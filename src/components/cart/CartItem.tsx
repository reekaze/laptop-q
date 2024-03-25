"use client";
import { CartItemType } from "@/lib/types";
import { cn, currenciesFormatter } from "@/lib/utils";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useUpdateCartItem } from "@/hooks/useUpdateCartItem";
import { useDeleteCartItem } from "@/hooks/useDeleteCartItem";
import { Checkbox } from "../ui/checkbox";
import { useSelectedCartList } from "@/hooks/useSelectedCartList";

type CartItemProps = {
  item: CartItemType;
  index: number;
};

const CartItem = ({ item, index }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isMounted, setIsMounted] = useState(false);

  const selectedList = useSelectedCartList((state) => state.selectedList);
  const updateSelectedList = useSelectedCartList(
    (state) => state.updateSelectedList
  );

  const isQuantityAvailable = quantity < item.ProductVariant.quantity;
  const isQuantityOver = quantity > item.ProductVariant.quantity;

  const { updateCartItem } = useUpdateCartItem({
    productVariantId: item.productVariantId,
    quantity,
  });

  const { deleteCartItem } = useDeleteCartItem({
    cartItemId: item.id,
    index,
  });

  useEffect(() => {
    setQuantity(item.quantity);

    return () => {};
  }, [item.quantity]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (isMounted && !isQuantityOver && !isNaN(quantity) && quantity > 0) {
        (document.activeElement as HTMLElement).blur();
        updateCartItem();
      }
    }, 1000);
    setIsMounted(true);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [quantity, isQuantityOver]);

  return (
    <div className="flex flex-row gap-4">
      <div className="h-auto flex items-center">
        <Checkbox
          checked={selectedList[index]}
          onCheckedChange={() => {
            updateSelectedList(
              selectedList.map((val, i) => (i === index ? !val : val))
            );
          }}
        />
      </div>
      <div className="flex items-center">
        <div className="relative min-w-10 min-h-10 md:min-w-20 md:min-h-20">
          <Image
            src={item.ProductVariant.Product.ProductImages[0].link}
            alt="image"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col w-full break-all text-[12px] sm:text-[16px]">
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

      <div className="flex flex-col gap-2 items-end">
        <p className="font-semibold text-[14px] sm:text-p">
          {currenciesFormatter.format(item.ProductVariant.price)}
        </p>
        <div className="flex items-center gap-2">
          <Trash2Icon
            onClick={() => {
              deleteCartItem();
            }}
            className="flex flex-shrink-0 text-slate-400 cursor-pointer size-4 sm:size-5"
          />
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
              className={cn(
                quantity > 1 ? "text-black " : "text-slate-400",
                "size-2 sm:size-4"
              )}
            />
          </div>
          <Input
            value={quantity}
            type="number"
            autoComplete="off"
            className="text-center min-w-10 sm:min-w-12 max-h-6 sm:max-h-8 text-[11px] sm:text-[14px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuantity(parseInt(e.target.value.replace(/^0+/, "")))
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
                isQuantityAvailable ? "text-black " : "text-slate-400",
                "size-2 sm:size-4"
              )}
            />
          </div>
        </div>
        {isQuantityOver && (
          <p className="font-semibold">max: {item.ProductVariant.quantity}</p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
