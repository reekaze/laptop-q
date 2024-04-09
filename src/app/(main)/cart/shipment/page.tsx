"use client";
import Appbar from "@/components/Appbar";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useSelectedCartList } from "@/hooks/useSelectedCartList";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { addOrderFormSchema } from "@/lib/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAllCartItems } from "@/hooks/useAllCartItems";
import { CartItemType } from "@/lib/types";

const Map = dynamic(() => import("@/components/shipment/Map"), {
  ssr: false,
});

type CartShip = {};

const CartShipmentPage = (CartShip: CartShip) => {
  const center = {
    lat: -6.2,
    lng: 106.816666,
  };
  const { cartItems, status, isRefetching } = useAllCartItems();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const selectedList = useSelectedCartList((state) => state.selectedList);
  const router = useRouter();

  const [position, setPosition] = useState(center);

  const form = useForm<z.infer<typeof addOrderFormSchema>>({
    resolver: zodResolver(addOrderFormSchema),
    defaultValues: {
      contactPhone: "",
      address: "",
    },
  });

  const onSubmit = (values: z.infer<typeof addOrderFormSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    let total = 0;
    let totItem = 0;

    (cartItems as CartItemType[]).map((item, index) => {
      if (selectedList[index] === true) {
        total += item.quantity * item.ProductVariant.price;
        totItem += item.quantity;
      }
    });

    setTotalPrice(total);
    setTotalItem(totItem);

    return () => {};
  }, [cartItems, selectedList]);

  // if (selectedList.length === 0) {
  //   toast({
  //     title: "Please select cart item first",
  //   });
  //   router.push("/cart");
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <Appbar title="Shipment" />
          <div className="flex h-[40vh] flex-col p-4">
            <Map
              setPosition={setPosition}
              position={position}
              center={center}
            />
          </div>
          <div className="flex flex-col gap-2 px-4 sm:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-neutral-700">
                      Detail Address
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Detail Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-neutral-700">
                      Contact Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contact Phone"
                        {...field}
                        type="tel"
                        pattern="[0-9]*"
                        maxLength={14}
                        value={field.value}
                        onChange={(e) => {
                          if (
                            e.target.value === "" ||
                            /^[0-9\b]+$/.test(e.target.value)
                          ) {
                            field.onChange(e.target.value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant={"green"}
              className="mx-4 mt-8 w-full sm:w-min sm:px-14"
            >
              Pay
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CartShipmentPage;
