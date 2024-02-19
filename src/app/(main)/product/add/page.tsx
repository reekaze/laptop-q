"use client";
import Appbar from "@/components/Appbar";
import ImagesInput from "@/components/products/add/ImagesInput";
import Variants from "@/components/products/add/Variants";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type ProductAddPageProps = {};

const ProductAddPage = ({}: ProductAddPageProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [price, setPrice] = useState(0);

  return (
    <div className="w-full flex flex-col bg-green-300/50">
      <Appbar title="Add Product" />
      <div className="m-4 sm:m-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <div className=" flex flex-col gap-4 bg-background p-4 sm:p-6 rounded-md shadow-md">
          <p className="font-semibold">General Information</p>
          <Separator />
          <p className="text-[14px] text-neutral-500">Name</p>
          <Input />
          <p className="text-[14px] text-neutral-500">Brand</p>
          <Input />
          <p className="text-[14px] text-neutral-500">Description</p>
          <Textarea />
        </div>
        <div className="flex flex-col gap-4 bg-background p-4 sm:p-6 rounded-md shadow-md">
          <ImagesInput images={images} setImages={setImages} />
          {/* <Variants /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductAddPage;
