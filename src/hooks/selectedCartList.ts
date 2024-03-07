import { create } from "zustand";

type SelectedCartList = {
  selectedList: boolean[];
  updateSelectedList: (list: boolean[]) => void;
};

export const useSelectedCartList = create<SelectedCartList>((set) => ({
  selectedList: [],
  updateSelectedList: (list: boolean[]) => set({ selectedList: list }),
}));
