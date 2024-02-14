import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const LoadSpin = (props: Props) => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Loader2 className="animate-spin text-green-400" size={40} />
    </div>
  );
};

export default LoadSpin;
