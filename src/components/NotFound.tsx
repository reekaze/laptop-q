import { BirdIcon } from "lucide-react";
import { title } from "process";
import React from "react";

type NotFoundProps = {
  color?: string;
  size?: number;
  title?: string;
};

const NotFound = ({ title, color, size }: NotFoundProps) => {
  return (
    <div className="flex flex-col gap-8 w-full h-screen items-center justify-center">
      <BirdIcon
        className={`${color ?? "text-neutral-500"}`}
        size={size ?? 40}
      />
      <p className="text-p font-semibold">{title && title + " "}not found</p>
    </div>
  );
};

export default NotFound;
