import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import MenuItems from "./MenuItems";

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <div className="bg-white fixed z-40 px-4 py-3 w-full shadow-sm">
      <div className="flex items-center gap-4 ">
        <Logo />
        <SearchBar />
        <div className="hidden sm:flex">
          <MenuItems />
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
