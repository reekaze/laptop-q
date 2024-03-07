import { CartItemType } from "@/lib/types";
import { delay } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelectedCartList } from "./selectedCartList";

export const useAllCartItems = () => {
  const selectedList = useSelectedCartList((state) => state.selectedList);
  const updateSelectedList = useSelectedCartList(
    (state) => state.updateSelectedList
  );

  const {
    data: cartItems,
    status,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["cart-all"],
    queryFn: async () => {
      const res = await axios.get("/api/cart");

      if (res.status === 200 && res.data !== null) {
        return res.data as CartItemType[];
      }

      return res.data;
    },
  });

  useEffect(() => {
    if (cartItems) {
      const prevLength = selectedList.length;
      updateSelectedList([
        ...selectedList,
        ...Array.from(
          { length: cartItems.length - prevLength },
          (v, k) => true
        ),
      ]);
    }

    return () => {};
  }, [cartItems]);

  return {
    cartItems,
    status,
    refetch,
    isRefetching,
  };
};
