"use client";
import Appbar from "@/components/Appbar";
import ImagesInput from "@/components/products/add/ImagesInput";
import Variants, { MultiVariants } from "@/components/products/add/Variants";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { addProductFormSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { storage } from "@/app/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { delay } from "@/lib/utils";

type ProductAddPageProps = {};

const ProductAddPage = ({}: ProductAddPageProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      description: "",
      images: [],
    },
  });
  const [activeVariants, setActiveVariants] = useState(0);
  const [type, setType] = useState("");
  const [multiVariants, setMultiVariants] = useState<MultiVariants[]>([]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const uploadImage = async (data: any) => {
    let uploadedImagesUrl: string[] = [];

    for (let i = 0; i < data.images.length; i++) {
      const file = await fetch(data.images[i]).then((r) => r.blob());

      const storageRef = ref(storage, `images/${uuidv4()}`);
      const uploadTask = uploadBytes(storageRef, file);

      const res = await uploadTask;
      const downloadURL = await getDownloadURL(res.ref);

      uploadedImagesUrl.push(downloadURL);
    }

    return uploadedImagesUrl;
  };

  const onSubmit = async (values: z.infer<typeof addProductFormSchema>) => {
    let data: { [k: string]: any } = {};
    data = { ...values };
    if (activeVariants === 0) {
      if (price === 0 || quantity === 0) {
        return toast({
          description: "Price, Quantity must be filled in",
        });
      }
      data.type = "DEFAULT";
      data.variantName = ["DEFAULT"];
      data.price = [price];
      data.quantity = [quantity];
    } else {
      if (type === "") {
        return toast({
          description: "Type must be filled in",
        });
      }

      if (multiVariants.length < 1) {
        return toast({
          description: "At least one variant must be added",
        });
      }

      if (multiVariants.filter((v) => v.name === "").length > 0) {
        return toast({
          description: "All Variant Name must be filled in",
        });
      }

      if (multiVariants.filter((v) => v.price < 1).length > 0) {
        return toast({
          description: "All Price must be filled in",
        });
      }

      if (multiVariants.filter((v) => v.quantity < 1).length > 0) {
        return toast({
          description: "All Quantity must be filled in",
        });
      }

      data.type = type;
      data.variantName = multiVariants.map((v) => v.name);
      data.price = multiVariants.map((v) => v.price);
      data.quantity = multiVariants.map((v) => v.quantity);
    }

    data.images = await uploadImage(data);

    try {
      const res = await axios.post("/api/product/add", data);
      if (res.status === 200) {
        toast({
          description: "Product Added Successfully",
        });

        await delay(1000);
        return location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col bg-green-300/50">
          <Appbar title="Add Product" />
          <div className="m-4 sm:m-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div className=" flex flex-col gap-4 bg-background p-4 sm:p-6 rounded-md shadow-md">
              <p className="font-semibold">General Information</p>
              <Separator />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2">
                    <p className="text-[14px] text-neutral-500">Name</p>

                    <FormControl>
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2">
                    <p className="text-[14px] text-neutral-500">Brand</p>

                    <FormControl>
                      <Input placeholder="Product Brand" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2">
                    <p className="text-[14px] text-neutral-500">Description</p>

                    <FormControl>
                      <Textarea placeholder="Product Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 bg-background p-4 sm:p-6 rounded-md shadow-md">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <ImagesInput
                      images={field.value}
                      onChange={field.onChange}
                      max={6}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Variants
                type={type}
                setType={setType}
                multiVariants={multiVariants}
                setMultiVariants={setMultiVariants}
                price={price}
                setPrice={setPrice}
                quantity={quantity}
                setQuantity={setQuantity}
                activeVariants={activeVariants}
                setActiveVariants={setActiveVariants}
              />

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Add Product"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductAddPage;
