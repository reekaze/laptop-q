"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type VariantsProps = {
  price: number[];
  onChange: (value: any) => void;
};

const Variants = ({}: VariantsProps) => {
  const [activeVariants, setActiveVariants] = useState(0);

  const [type, setType] = useState("");
  const [variants, setVariants] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="font-semibold">Variants</div>
        <div className="flex flex-row gap-2">
          {["Single", "Multi"].map((item, idx) => {
            return (
              <Badge
                onClick={() => {
                  setActiveVariants(idx);
                }}
                key={item}
                className={cn(
                  "cursor-pointer",
                  activeVariants !== idx &&
                    "hover:bg-green-100 hover:text-green-400  hover:border-green-200",
                  activeVariants === idx
                    ? "bg-green-200 hover:bg-green-200 text-green-700 border-2 border-green-500"
                    : "bg-white text-black"
                )}
              >
                {item}
              </Badge>
            );
          })}
        </div>
      </div>
      <Separator />
      {activeVariants === 0 ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <p className="text-[14px] text-neutral-500">Price ($)</p>
            <Input type="number" className="w-1/2 " />
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-[14px] text-neutral-500">Quantity</p>
            <Input type="number" className="w-1/2 " />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-[14px] text-neutral-500 flex-1">Type</p>
          <div className="flex gap-4">
            <Input
              value={type}
              onChange={(value) => setType(value.currentTarget.value)}
            />
          </div>

          <Separator />
          <div className="flex flex-col">
            {variants.map((variant, idx) => {
              return <div key={idx}>{variant}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Variants;
