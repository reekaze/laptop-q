import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

export const AxiosOnError = (err: AxiosError) => {
  toast({
    description: (err.response?.data as string) || "",
  });
};
