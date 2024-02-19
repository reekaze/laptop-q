import { toast } from "@/components/ui/use-toast";
import * as z from "zod";

export const AxiosOnError = (err: any) => {
  if (err instanceof z.ZodError) {
    return toast({
      description: err.issues[0].message,
    });
  }

  return toast({
    description: (err.response?.data as string) || "",
  });
};
