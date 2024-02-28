import { cn } from "@/lib/utils";
import { BirdIcon } from "lucide-react";
import React from "react";

type NotFoundProps = {
  color?: string;
  size?: number;
  title?: string;
  hscreen?: boolean;
};

const NotFound = ({ title, color, size, hscreen = true }: NotFoundProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 w-full items-center justify-center",
        hscreen && "h-screen"
      )}
    >
      <BirdIcon
        className={`${color ?? "text-neutral-500"}`}
        size={size ?? 40}
      />
      <p className="text-p font-semibold">{title && title + " "}not found</p>
    </div>
  );
};

export default NotFound;
