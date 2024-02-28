import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";

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
