import { Laptop } from "lucide-react";
import React from "react";

type Props = {};

const Logo = ({}: Props) => {
  return (
    <div className="flex items-center">
      <Laptop size={30} className="text-green-500" />
      <p className=" ml-2 text-green-500 font-bold text-[24px] cursor-pointer">
        Laptop-Q
      </p>
    </div>
  );
};

export default Logo;
