"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { SelectedVariantContext } from "@/hooks/useSelectedVariant";
import { ProductWithImagesWithVariants } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import React, { ChangeEvent, useContext, useState } from "react";

type AddToCardProps = {
  product: ProductWithImagesWithVariants;
};

const AddToCart = ({ product }: AddToCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { selectedVariant, setSelectedVariant } = useContext(
    SelectedVariantContext
  );

  const isQuantityAvailable =
    quantity < product.ProductVariants[selectedVariant].quantity;

  const handleOnClick = () => {
    if (quantity < 1 || isNaN(quantity)) {
      toast({
        description: "Quantity minimum is 1",
      });
    } else if (quantity > product.ProductVariants[selectedVariant].quantity) {
      toast({
        description: "Quantity should below or same as Stock",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 border-2 border-green-400 rounded-lg p-4 h-min sticky top-[83px] text-[14px]">
      <p className="">Quantity</p>
      <div className="flex gap-2 justify-between">
        <div
          onClick={() => {
            quantity > 1 && setQuantity(quantity - 1);
          }}
          className={cn(
            "p-2 bg rounded-md cursor-pointer flex items-center",
            quantity > 1 ? "bg-green-200 " : "bg-green-100/50"
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

      <p className="font-semibold">
        Stock: {product.ProductVariants[selectedVariant].quantity}
      </p>

      <Button onClick={handleOnClick} variant={"green"}>
        Add To Cart
      </Button>
    </div>
  );
};

export default AddToCart;
