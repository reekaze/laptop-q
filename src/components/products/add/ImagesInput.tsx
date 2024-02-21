"use client";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { ImageIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

type ImagesInputProps = {
  images: string[];
  onChange: (value: any) => void;
  max?: number;
};

const ImagesInput = ({ images, onChange, max }: ImagesInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="font-semibold">Images</div>
      <Separator />
      <div className="relative flex flex-row p-4 gap-4 bg-green-300/50 rounded-md overflow-x-scroll">
        {images.map((image, idx) => {
          return (
            <div key={idx} className="relative min-w-20 min-h-20">
              <Image
                src={image}
                alt="image"
                fill
                className="rounded-xl object-cover"
              />
              <div className="p-1 bg-black rounded-full absolute right-2 top-2">
                <X
                  onClick={() => {
                    onChange(images.filter((_, i) => i !== idx));
                  }}
                  size={15}
                  className="text-white"
                />
              </div>
            </div>
          );
        })}
        <div className="relative w-20 h-20 rounded-xl bg-transparent text-transparent cursor-pointer border-dashed border-2 border-neutral-500">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="file:hidden w-20 h-20 rounded-xl bg-transparent text-transparent cursor-pointer"
            value={""}
            onChange={(event) => {
              const file = event?.target?.files?.[0];
              if (file) {
                if (images.length < (max || 4)) {
                  onChange([...images, URL.createObjectURL(file)]);
                } else {
                  toast({
                    description: `You can only upload ${max || 4} images`,
                  });
                }
              }
            }}
          />
          <div
            onClick={() => {
              inputRef?.current?.click();
            }}
            className="flex flex-row absolute inset-0 m-auto -z-1 items-center justify-center text-neutral-700"
          >
            <PlusIcon size={15} />
            <ImageIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesInput;
