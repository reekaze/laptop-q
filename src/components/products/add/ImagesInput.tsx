"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
      <ScrollArea className="w-full">
        <div className="relative flex flex-row gap-4 rounded-md bg-green-300/50 p-4">
          {images.map((image, idx) => {
            return (
              <div key={idx} className="relative min-h-20 min-w-20">
                <Image
                  src={image}
                  alt="image"
                  fill
                  className="rounded-xl object-cover"
                />
                <div className="absolute right-2 top-2 rounded-full bg-black p-1">
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
          <div className="relative h-20 w-20 cursor-pointer rounded-xl border-2 border-dashed border-neutral-500 bg-transparent text-transparent">
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              className="h-20 w-20 cursor-pointer rounded-xl bg-transparent text-transparent file:hidden"
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
              className="-z-1 absolute inset-0 m-auto flex flex-row items-center justify-center text-neutral-700"
            >
              <PlusIcon size={15} />
              <ImageIcon />
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ImagesInput;
