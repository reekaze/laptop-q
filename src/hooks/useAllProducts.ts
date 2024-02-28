import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import queryString from "query-string";

export const useAllProducts = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["allProducts"],
    queryFn: async ({ pageParam = undefined }) => {
      const url = queryString.stringifyUrl(
        {
          url: "/api/product/all",
          query: {
            cursor: pageParam,
          },
        },
        {
          skipNull: true,
        }
      );

      const res = await axios.get(url);
      return res.data;
    },
    getNextPageParam: (lastPage: any) => lastPage?.nextCursor,
    initialPageParam: undefined,
  });

  return {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
  };
};
