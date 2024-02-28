import { cn } from "@/lib/utils";
import { ServerCrashIcon } from "lucide-react";
import React from "react";

type SomethingWrongProps = {
  size?: number;
  hscreen?: boolean;
};

const SomethingWrong = ({ size, hscreen = true }: SomethingWrongProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 w-full items-center justify-center",
        hscreen && "h-screen"
      )}
    >
      <ServerCrashIcon
        className={`text-rose-400 animate-pulse`}
        size={size ?? 40}
      />
      <p className="text-p font-semibold">Something Went Wrong.</p>
    </div>
  );
};

export default SomethingWrong;
