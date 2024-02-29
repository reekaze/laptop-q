import { AxiosOnError } from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAllCartItems } from "./useAllCartItems";

type useDeleteCartItemProps = {
  cartItemId: string;
};

export const useDeleteCartItem = ({ cartItemId }: useDeleteCartItemProps) => {
  const { refetch: refectAllCartItems } = useAllCartItems();
  const {
    data,
    mutate: deleteCartItem,
    status,
  } = useMutation({
    mutationKey: [`delete-cart-item-${cartItemId}`],
    mutationFn: async () => {
      const res = await axios.delete("/api/cart/update", {
        data: { cartItemId },
      });
    },
    onSuccess: (data) => {
      refectAllCartItems();
    },
    onError: AxiosOnError,
  });

  return {
    data,
    deleteCartItem,
    status,
  };
};
