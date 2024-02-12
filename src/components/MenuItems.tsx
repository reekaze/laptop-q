import React from "react";
import ActionTooltip from "./ActionToolTip";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

type Props = {};

const MenuItems = ({}: Props) => {
  return (
    <div className="sm:flex-row flex-col flex gap-4 sm:items-center">
      <ActionTooltip label="Cart">
        <ShoppingCart className="cursor-pointer " />
      </ActionTooltip>
      <Button variant={"outline"}>Register</Button>
      <Button>Login</Button>
    </div>
  );
};

export default MenuItems;
