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

type Props = {};

const MenuItems = ({}: Props) => {
  const { user, isLoading, refetch } = useCurrentUser();
  const router = useRouter();

  const logout = async () => {
    await axios.get("/api/logout");
    refetch();
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="w-20 h-8 animate-pulse bg-neutral-500 rounded-xl"></div>
    );
  }

  return (
    <div className="sm:flex-row flex-col flex gap-4 sm:items-center">
      <ActionTooltip label="Cart">
        <ShoppingCart className="cursor-pointer" />
      </ActionTooltip>

      {!user && (
        <>
          <Button
            onClick={() => router.push("/auth?type=register")}
            variant={"outline"}
          >
            Register
          </Button>
          <Button onClick={() => router.push("/auth?type=login")}>Login</Button>
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
              <NavigationMenuContent>
                <div className="w-20 bg-black text-[16px] text-white p-4 flex flex-col gap-2">
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
