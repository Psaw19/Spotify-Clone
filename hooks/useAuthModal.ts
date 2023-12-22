import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  view: string;
  onOpen: (passedView?: string) => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: (passedView) => set({ isOpen: true, view: passedView || "sign_in" }),
  onClose: () => set({ isOpen: false }),
  view: "sign_in",
}));

export default useAuthModal;
