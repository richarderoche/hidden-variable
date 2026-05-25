import { create } from 'zustand'

type Store = {
  enablePageTransition: boolean
  setEnablePageTransition: (value: boolean) => void
  isMobileNavOpen: boolean
  setIsMobileNavOpen: (value: boolean) => void
  pauseLenis: boolean
  setPauseLenis: (value: boolean) => void
}

export const useStore = create<Store>((set) => ({
  enablePageTransition: false,
  setEnablePageTransition: (value: boolean) =>
    set({ enablePageTransition: value }),
  isMobileNavOpen: false,
  setIsMobileNavOpen: (value: boolean) => set({ isMobileNavOpen: value }),
  pauseLenis: false,
  setPauseLenis: (value: boolean) => set({ pauseLenis: value }),
}))
