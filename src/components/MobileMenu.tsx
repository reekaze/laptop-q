"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";

import MenuItems from "./MenuItems";

type MobileMenuProps = {
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu = ({ isMobileOpen, setIsMobileOpen }: MobileMenuProps) => {
  return (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger className="flex sm:hidden">
        <MenuIcon onClick={() => setIsMobileOpen(true)} />
      </SheetTrigger>
      <SheetContent className="w-auto flex flex-col items-start justify-start sm:hidden">
        <MenuItems
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
