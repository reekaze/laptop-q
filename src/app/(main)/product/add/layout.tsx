import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

type ProductAddLayour = {
  children: React.ReactNode;
};

const ProductAddLayour = async ({ children }: ProductAddLayour) => {
  const user = await getCurrentUser();
  if (user?.type === UserType.BASIC || !user) {
    return redirect("/");
  }
  return <>{children}</>;
};

export default ProductAddLayour;
