import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SelectedVariantContext } from "@/hooks/useSelectedVariant";
import { ProductWithImagesWithVariants } from "@/lib/types";
import { cn, currenciesFormatter } from "@/lib/utils";
import { Star, StarIcon } from "lucide-react";
import React, { useContext, useState } from "react";

type ProductDetailProps = {
  product: ProductWithImagesWithVariants;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { selectedVariant, setSelectedVariant } = useContext(
    SelectedVariantContext
  );

  return (
    <div className="flex flex-col w-full gap-2">
      <p className="font-semibold tracking-wide line-clamp-3">{product.name}</p>
      <div className="flex items-center text-base text-neutral-500 gap-2">
        <p className="flex items-center">
          <Star fill="#ffa70f" strokeWidth={0} size={20} /> {product.rate}
        </p>
        <div className="text-neutral-300">|</div>
        <p>Rating {product.rater}</p>
        <div className="text-neutral-300">|</div>
        <p>Sold {product.sold}</p>
        <div className="text-neutral-300">|</div>
      </div>
      <p className="text-h3 font-semibold pb-4">
        {currenciesFormatter.format(
          product.ProductVariants[selectedVariant].price
        )}
      </p>

      {product.variantType !== "DEFAULT" && (
        <>
          <p className="font-bold">Choose {product.variantType}:</p>
          <div className="flex flex-wrap gap-2">
            {product.ProductVariants.map((variant, idx) => {
              return (
                <div
                  key={variant.id}
                  onClick={() => setSelectedVariant(idx)}
                  className={cn(
                    `px-3 py-1 border-2 rounded-xl cursor-pointer`,
                    idx === selectedVariant
                      ? "border-green-500 text-green-500 bg-green-100/50"
                      : "border-neutral-300 hover:border-green-200"
                  )}
                >
                  {variant.name}
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="flex flex-col text-base">
        <p>Description:</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
