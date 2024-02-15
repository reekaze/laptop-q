import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

type MyInput = {
  id: string;
  value: string;
  onChange: (e: any) => void;
  label: string;
  type: string;
};

const MyInput = ({ id, value, onChange, label, type }: MyInput) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={type !== "password" ? type : isVisible ? "text" : type}
        onChange={onChange}
        className={`peer pl-4 pr-4 pt-6 pb-2 focus:ring-0 focus:ring-offset-0 focus:outline-none rounded-md bg-gray-500 text-white`}
        placeholder=""
        value={value}
      />
      <label
        htmlFor={id}
        className="peer absolute left-4 top-1 -translate-y-[1px] scale-75 origin-[0] peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1px] peer-focus:scale-75 transition text-neutral-200"
      >
        {label}
      </label>
      {type === "password" &&
        value != "" &&
        (isVisible ? (
          <EyeIcon
            onClick={() => setIsVisible(!isVisible)}
            className="text-neutral-200 absolute top-1 right-3"
          />
        ) : (
          <EyeOffIcon
            onClick={() => setIsVisible(!isVisible)}
            className="text-neutral-200 absolute top-1 right-3"
          />
        ))}
    </div>
  );
};

export default MyInput;
