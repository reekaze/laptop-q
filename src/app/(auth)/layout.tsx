import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const user = await getCurrentUser();
  // if user logged in, redirect to home
  if (user) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default AuthLayout;
