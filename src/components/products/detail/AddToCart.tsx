"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { SelectedVariantContext } from "@/hooks/useSelectedVariant";
import { AxiosOnError } from "@/lib/helper";
import { ProductWithImagesWithVariants } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, Minus, Plus } from "lucide-react";
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
    } else {
      mutate();
    }
  };

  const { mutate, data, isPending } = useMutation({
    mutationKey: [`cart-add-${product.ProductVariants[selectedVariant].id}`],
    mutationFn: async () => {
      const res = await axios.post("/api/cart/add", {
        productVariantId: product.ProductVariants[selectedVariant].id,
        quantity,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast({
        description: "Product Added Successfully",
      });
    },
    onError: AxiosOnError,
  });

  return (
    <div className="flex flex-col gap-4 border-2 bg-white border-green-400 rounded-lg p-4 h-min sticky md:top-[83px] bottom-0 md:w-fit w-full text-[14px]">
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
              isQuantityAvailable ? "text-black " : "text-slate-400"
            )}
          />
        </div>
      </div>

      <p className="font-semibold">
        Stock: {product.ProductVariants[selectedVariant].quantity}
      </p>

      <Button disabled={isPending} onClick={handleOnClick} variant={"green"}>
        {isPending ? (
          <Loader2 className="animate-spin text-white" />
        ) : (
          "Add To Cart"
        )}
      </Button>
    </div>
  );
};

export default AddToCart;
