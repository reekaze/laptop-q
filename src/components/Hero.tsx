import Image from "next/image";
import React from "react";

type Props = {};

const Hero = ({}: Props) => {
  return (
    <div className="flex relative overflow-hidden w-full min-h-[300px] max-h-[500px] h-[50vw]">
      <div className="absolute top-[30%] sm:top-[40%] left-[5%] w-2/5 md:w-1/3 z-10 p-2 md:p-4 bg-slate-600/50 backdrop-blur-sm rounded-md">
        <h3 className=" text-p sm:text-h3 font-bold text-white">
          Elevate Your Digital Experience with Great Laptop Quality.
        </h3>
      </div>

      <Image
        src={"/images/laptop-hero.jpg"}
        fill
        objectFit="cover"
        alt="hero"
        className="hover:scale-110 absolute w-full transition"
      />
    </div>
  );
};

export default Hero;
