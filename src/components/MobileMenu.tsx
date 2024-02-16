import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";

import MenuItems from "./MenuItems";

type Props = {};

const MobileMenu = ({}: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="flex sm:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="w-auto flex flex-col items-start justify-start sm:hidden">
        <MenuItems />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
