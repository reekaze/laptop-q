"use client";
import React, { useState } from "react";
import ActionTooltip from "./ActionToolTip";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import axios from "axios";
import { UserType } from "@prisma/client";
import Link from "next/link";
import { toast } from "./ui/use-toast";

import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";

type MenutItemsProps = {
  isMobileOpen?: boolean;
  setIsMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuItems = ({ isMobileOpen, setIsMobileOpen }: MenutItemsProps) => {
  const { user, isLoading, refetchCurrentUser } = useCurrentUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await axios.get("/api/logout");
    refetchCurrentUser();
    location.reload();
  };

  if (isLoading) {
    return <div className="w-20 h-8 animate-pulse bg-neutral-500 rounded-xl" />;
  }

  return (
    <div className="sm:flex-row flex-col flex gap-4 sm:items-center">
      <ActionTooltip label="Cart">
        <Link
          href={"/cart"}
          onClick={() => {
            !user &&
              toast({
                description: "user not found",
              });
            setIsMobileOpen && setIsMobileOpen(false);
          }}
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
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <div className="flex justify-center items-center gap-1">
                <div className="w-8 h-8 text-background bg-foreground rounded-full flex items-center justify-center">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <ChevronDown
                  className={cn(
                    "transition size-3",
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  )}
                />
              </div>
            </MenubarTrigger>
            <MenubarContent
              onFocus={() => setIsDropdownOpen(!isDropdownOpen)}
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="absolute -right-[75px]"
            >
              {user.type === UserType.ADMIN && (
                <>
                  <MenubarItem
                    className="cursor-pointer"
                    onClick={() => {
                      console.log("asd");
                      setIsMobileOpen && setIsMobileOpen(false);
                      router.push("/product/add");
                    }}
                  >
                    Add Product
                  </MenubarItem>
                  <MenubarSeparator />
                </>
              )}

              {user.type === UserType.ADMIN && (
                <>
                  <MenubarItem
                    className="cursor-pointer"
                    onClick={() => {
                      setIsMobileOpen && setIsMobileOpen(false);
                    }}
                  >
                    Manage Product
                  </MenubarItem>
                  <MenubarSeparator />
                </>
              )}

              <MenubarItem
                className="cursor-pointer"
                onClick={() => {
                  setIsMobileOpen && setIsMobileOpen(false);
                  logout();
                }}
              >
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
    </div>
  );
};

export default MenuItems;
