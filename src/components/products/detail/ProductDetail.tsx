import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      </div>
      <p className="text-h3 font-semibold mb-4 bg-gradient-to-b from-green-400 to-neutral-600 bg-clip-text text-transparent">
        {currenciesFormatter.format(
          product.ProductVariants[selectedVariant].price
        )}
      </p>

      {product.variantType !== "DEFAULT" && (
        <>
          <p className="font-bold">Choose {product.variantType}:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.ProductVariants.map((variant, idx) => {
              return (
                <div
                  key={variant.id}
                  onClick={() => setSelectedVariant(idx)}
                  className={cn(
                    `px-3 py-1 border-2 rounded-xl cursor-pointer text-[14px]`,
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
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline font-semibold">
            Description
          </AccordionTrigger>
          <AccordionContent className="whitespace-pre-wrap">
            {product.description}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductDetail;
