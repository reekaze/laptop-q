"use client";
import { Loader2 } from "lucide-react";
import React from "react";

type LoadSpinProps = {
  color?: string;
  size?: number;
};

const LoadSpin = ({ color, size }: LoadSpinProps) => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Loader2
        className={`animate-spin ${color ?? "text-green-400"}`}
        size={size ?? 40}
      />
    </div>
  );
};

export default LoadSpin;
