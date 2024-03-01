"use client";

import ImageMagnifier from "@/components/ImageMagnifier";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type ProductDisplayProps = {
  links: string[];
};

const ProductDisplay = ({ links }: ProductDisplayProps) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [isListHover, setisListHover] = useState(false);
  const [totalListTranslate, setTotalListTranslate] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <ImageMagnifier src={links[focusIndex]} />

      <div
        onMouseEnter={() => setisListHover(true)}
        onMouseLeave={() => setisListHover(false)}
        className={cn(
          "relative flex flex-row gap-2 max-w-80 transition overflow-x-hidden"
        )}
      >
        {links.map((link, idx) => {
          return (
            <div
              onClick={() => setFocusIndex(idx)}
              key={link}
              className={cn(
                "relative min-w-[74px] min-h-[74px] rounded-md transition",
                idx === focusIndex && "border-green-400 border-2",
                idx !== focusIndex && "hover:border-green-200 hover:border-2"
              )}
              style={{
                transform: `translateX(${totalListTranslate.toString()}px)`,
              }}
            >
              <Image
                src={link}
                alt="image"
                sizes="1"
                fill
                className="object-contain rounded-md"
              />
            </div>
          );
        })}
        <ArrowLeft
          onClick={() => {
            setTotalListTranslate(totalListTranslate + 82);
          }}
          size={20}
          className={cn(
            "absolute p-[3px] cursor-pointer hidden bg-green-300 inset-0 my-auto mx-1 rounded-full text-neutral-700 transition",
            isListHover && totalListTranslate < 0 && "flex"
          )}
        />
        <ArrowRight
          onClick={() => {
            setTotalListTranslate(totalListTranslate - 82);
          }}
          size={20}
          className={cn(
            "absolute p-[3px] cursor-pointer hidden bg-green-300 inset-0 my-auto ml-auto mr-1 rounded-full text-neutral-700 transition",
            isListHover &&
              -totalListTranslate < (links.length - 4) * 82 &&
              "flex"
          )}
        />
      </div>
    </div>
  );
};

export default ProductDisplay;
