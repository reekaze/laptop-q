"use client";
import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { currenciesFormatter } from "@/lib/utils";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  imageLink: string;
  name: string;
  price: number;
  rate: number;
  sold: number;
  elementRef: React.RefObject<HTMLDivElement> | null;
};

const ProductCard = ({
  id,
  imageLink,
  name,
  price,
  rate,
  sold,
  elementRef,
}: ProductCardProps) => {
  const router = useRouter();
  return (
    <Link href={`/product/${id}`}>
      <div
        className="w-full h-[30vw] min-h-[320px] max-h-[380px] flex flex-col bg-background border-neutral-300 border rounded-xl cursor-pointer hover:border-green-500/80 hover:scale-105 transition shadow-md"
        ref={elementRef}
      >
        <div className="w-full h-[15vw] min-h-32 max-h-44 relative">
          <Image
            src={imageLink}
            alt="image"
            sizes={"1"}
            fill
            className=" object-contain rounded-t-xl"
          />
        </div>
        <Separator className="h-1" />
        <div className="flex-1 py-2 px-3 flex flex-col gap-2">
          <p className="line-clamp-2 mb-auto">{name}</p>
          <h3 className="text-h3 font-semibold bg-gradient-to-b from-green-400 to-neutral-600 bg-clip-text text-transparent flex w-min">
            {currenciesFormatter.format(price)}
          </h3>
          <div className="flex items-center text-neutral-500">
            <Star fill="#ffa70f" strokeWidth={0} size={30} />
            {rate}
          </div>
          <p className="text-neutral-500">{sold}+ sold</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
