import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import ActionTooltip from "./ActionToolTip";

type Props = {};

const SearchBar = ({}: Props) => {
  return (
    <div className="flex w-auto flex-1 rounded-md border-[2px] border-slate-200 focus-within:border-green-200">
      <input
        placeholder="Search"
        className="w-full rounded-md border-0 px-2 outline-none focus:ring-0 focus:ring-offset-0"
      />
      <ActionTooltip label="Search" side="bottom">
        <Button className="rounded-l-none rounded-r-sm bg-slate-100 p-2 hover:bg-slate-100">
          <Search className="text-primary" size={"20"} />
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default SearchBar;
