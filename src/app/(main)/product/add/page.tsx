"use client";
import Appbar from "@/components/Appbar";
import ImagesInput from "@/components/products/add/ImagesInput";
import Variants from "@/components/products/add/Variants";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { addProductFormSchema } from "@/lib/zodSchema";
import { useState } from "react";
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

type ProductAddPageProps = {};

const ProductAddPage = ({}: ProductAddPageProps) => {
  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      description: "",
      images: [],
      quantities: [0],
      prices: [0],
    },
  });

  const onSubmit = (values: z.infer<typeof addProductFormSchema>) => {
    console.log(values);
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
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prices"
                render={({ field }) => (
                  <FormItem>
                    <Variants price={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Add Product</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductAddPage;
