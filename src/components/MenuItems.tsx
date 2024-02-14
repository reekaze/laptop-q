"use client";
import React from "react";
import ActionTooltip from "./ActionToolTip";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const MenuItems = ({}: Props) => {
  const router = useRouter();
  return (
    <div className="sm:flex-row flex-col flex gap-4 sm:items-center">
      <ActionTooltip label="Cart">
        <ShoppingCart className="cursor-pointer " />
      </ActionTooltip>
      <Button
        onClick={() => router.push("/auth?type=register")}
        variant={"outline"}
      >
        Register
      </Button>
      <Button onClick={() => router.push("/auth?type=login")}>Login</Button>
    </div>
  );
};

export default MenuItems;
