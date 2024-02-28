"use client";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrentUser = () => {
  //get current user in client components

  const {
    data: user,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await axios.post("/api/currentUser");

      if (res.status === 200 && res.data !== null) {
        return res.data as User;
      }

      return null;
    },
  });
  return { user, isLoading, refetch };
};
