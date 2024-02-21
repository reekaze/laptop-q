"use client";
import { Laptop } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/")} className="flex items-center">
      <Laptop className="text-green-500 size-6 sm:size-8" />
      <p className=" ml-2 text-green-500 font-bold text-[18px] sm:text-[24px] cursor-pointer">
        Laptop-Q
      </p>
    </div>
  );
};

export default Logo;
