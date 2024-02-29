import { AxiosOnError } from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAllCartItems } from "./useAllCartItems";

type useUpdateCartItemProps = {
  productVariantId: string;
  quantity: number;
};

export const useUpdateCartItem = ({
  productVariantId,
  quantity,
}: useUpdateCartItemProps) => {
  const { refetch } = useAllCartItems();

  const {
    data,
    mutate: updateCartItem,
    status,
  } = useMutation({
    mutationKey: [`update-cart-item-${productVariantId}`],
    mutationFn: async () => {
      const res = await axios.post("/api/cart/update", {
        productVariantId,
        quantity,
      });

      return res.data;
    },
    onSuccess: (data) => {
      refetch();
    },
    onError: AxiosOnError,
  });

  return {
    data,
    updateCartItem,
    status,
  };
};
