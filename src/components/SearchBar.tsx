import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import ActionTooltip from "./ActionToolTip";

type Props = {};

const SearchBar = ({}: Props) => {
  return (
    <div className="focus-within:border-green-200 flex flex-1 border-[2px] border-slate-200 rounded-md w-auto">
      <input
        placeholder="Search"
        className="border-0 rounded-md outline-none focus:ring-0 focus:ring-offset-0 w-full px-2"
      />
      <ActionTooltip label="Search" side="bottom">
        <Button className="bg-slate-100 p-2 rounded-l-none rounded-r-sm hover:bg-slate-100">
          <Search className="text-primary" size={"20"} />
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default SearchBar;
