import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";

export const fetCache = "force-no-store";

type CartLayoutProps = {
  children: React.ReactNode;
};

const CartLayout = async ({ children }: CartLayoutProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default CartLayout;
