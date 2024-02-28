"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type LoadSpinProps = {
  color?: string;
  size?: number;
  hscreen?: boolean;
};

const LoadSpin = ({ color, size, hscreen = true }: LoadSpinProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center",
        hscreen && "h-screen"
      )}
    >
      <Loader2
        className={`animate-spin ${color ?? "text-green-400"}`}
        size={size ?? 40}
      />
    </div>
  );
};

export default LoadSpin;
