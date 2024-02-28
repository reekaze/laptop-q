"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type SelectedVariantContextProps = {
  selectedVariant: number;
  setSelectedVariant: Dispatch<SetStateAction<number>>;
};

export const SelectedVariantContext =
  createContext<SelectedVariantContextProps>({} as SelectedVariantContextProps);

export const SelectedVariantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedVariant, setSelectedVariant] = useState(0);

  return (
    <SelectedVariantContext.Provider
      value={{ selectedVariant, setSelectedVariant }}
    >
      {children}
    </SelectedVariantContext.Provider>
  );
};
