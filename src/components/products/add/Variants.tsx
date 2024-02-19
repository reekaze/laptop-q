"use client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type VariantsProps = {};

const Variants = ({}: VariantsProps) => {
  const [activeVariants, setActiveVariants] = useState(0);
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
      {activeVariants === 0 ? <div>asd</div> : <div>bca</div>}
    </div>
  );
};

export default Variants;
