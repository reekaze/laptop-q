import { CartItemType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllCartItems = () => {
  const {
    data: cartItems,
    status,
    refetch,
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

  return {
    cartItems,
    status,
    refetch,
  };
};
