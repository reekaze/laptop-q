import { AxiosOnError } from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAllCartItems } from "./useAllCartItems";
import { useSelectedCartList } from "./useSelectedCartList";

type useDeleteCartItemProps = {
  cartItemId: string;
  index: number;
};

export const useDeleteCartItem = ({
  cartItemId,
  index,
}: useDeleteCartItemProps) => {
  const { refetch: refectAllCartItems } = useAllCartItems();
  const selectedList = useSelectedCartList((state) => state.selectedList);
  const updateSelectedList = useSelectedCartList(
    (state) => state.updateSelectedList
  );
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
      updateSelectedList(selectedList.filter((val, i) => i !== index));
    },
    onError: AxiosOnError,
  });

  return {
    data,
    deleteCartItem,
    status,
  };
};
