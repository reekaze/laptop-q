"use client";
import React from "react";
import ActionTooltip from "./ActionToolTip";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import axios from "axios";
import { UserType } from "@prisma/client";
import Link from "next/link";
import { toast } from "./ui/use-toast";

type Props = {};

const MenuItems = ({}: Props) => {
  const { user, isLoading, refetchCurrentUser } = useCurrentUser();
  const router = useRouter();

  const logout = async () => {
    await axios.get("/api/logout");
    refetchCurrentUser();
  };

  if (isLoading) {
    return <div className="w-20 h-8 animate-pulse bg-neutral-500 rounded-xl" />;
  }

  return (
    <div className="sm:flex-row flex-col flex gap-4 sm:items-center">
      <ActionTooltip label="Cart">
        <Link
          href={"/cart"}
          onClick={() =>
            !user &&
            toast({
              description: "user not found",
            })
          }
        >
          <ShoppingCart className="cursor-pointer" />
        </Link>
      </ActionTooltip>
      {!user && (
        <>
          <Link href={"/auth?type=register"}>
            <Button variant={"outline"}>Register</Button>
          </Link>
          <Link href={"/auth?type=login"}>
            <Button>Login</Button>
          </Link>
        </>
      )}

      {user && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="w-8 h-8 text-background bg-foreground rounded-full flex items-center justify-center">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </NavigationMenuTrigger>

              <NavigationMenuContent className="right-0">
                <div className="w-40 bg-black text-[16px] text-white p-4 flex flex-col gap-2">
                  {user.type === UserType.ADMIN && (
                    <p
                      className="cursor-pointer hover:font-semibold"
                      onClick={() => {
                        router.push("/product/add");
                      }}
                    >
                      Add Product
                    </p>
                  )}

                  {user.type === UserType.ADMIN && (
                    <p
                      className="cursor-pointer hover:font-semibold"
                      onClick={() => {}}
                    >
                      Manage Product
                    </p>
                  )}

                  <p
                    className="cursor-pointer hover:font-semibold"
                    onClick={logout}
                  >
                    Logout
                  </p>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  );
};

export default MenuItems;
