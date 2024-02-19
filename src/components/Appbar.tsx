"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type AppbarProps = {
  title: string;
};

const Appbar = ({ title }: AppbarProps) => {
  const router = useRouter();
  return (
    <div className="w-full p-4 sm:p-8 flex flex-row gap-6 sm:gap-8 items-center bg-background">
      <div
        onClick={() => {
          router.back();
        }}
        className="p-2 border-2 border-neutral-300 rounded-md bg-background hover:border-green-400 hover:bg-green-200 transition"
      >
        <ArrowLeft />
      </div>
      <h3 className="text-h3 font-semibold">{title}</h3>
    </div>
  );
};

export default Appbar;
