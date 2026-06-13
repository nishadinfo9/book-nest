import { create } from "zustand";

type openCloseState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenClose = create<openCloseState>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});