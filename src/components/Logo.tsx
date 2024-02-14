import { Laptop } from "lucide-react";
import React from "react";

type Props = {};

const Logo = ({}: Props) => {
  return (
    <div className="flex items-center">
      <Laptop className="text-green-500 size-6 sm:size-8" />
      <p className=" ml-2 text-green-500 font-bold text-[18px] sm:text-[24px] cursor-pointer">
        Laptop-Q
      </p>
    </div>
  );
};

export default Logo;
