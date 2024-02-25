import { Button } from "@/components/ui/button";
import { SelectedVariantContext } from "@/hooks/useSelectedVariant";
import { ProductWithImagesWithVariants } from "@/lib/types";
import { Minus, Plus } from "lucide-react";
import React, { useContext, useState } from "react";

type AddToCardProps = {
  product: ProductWithImagesWithVariants;
};

const AddToCart = ({ product }: AddToCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { selectedVariant, setSelectedVariant } = useContext(
    SelectedVariantContext
  );
  return (
    <div className="flex flex-col gap-4 border-2 border-green-400 rounded-lg p-4 h-min">
      <p className="">Quantity</p>
      <div className="flex gap-2 justify-between">
        <div
          onClick={() => {
            quantity > 1 && setQuantity(quantity - 1);
          }}
          className="p-1 bg bg-green-200 rounded-md cursor-pointer flex items-center"
        >
          <Minus size={15} />
        </div>
        <p>{quantity}</p>
        <div
          onClick={() => {
            if (quantity < product.ProductVariants[selectedVariant].quantity) {
              setQuantity(quantity + 1);
            }
          }}
          className="p-1 bg bg-green-200 rounded-md cursor-pointer flex items-center"
        >
          <Plus size={15} />
        </div>
      </div>

      <Button variant={"green"}>Add To Cart</Button>
    </div>
  );
};

export default AddToCart;
