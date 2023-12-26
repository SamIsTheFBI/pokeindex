import { create } from "zustand"

interface PokemonList {
  next: string;
  setNext: (next: string) => void
}

export const usePokemonList = create<PokemonList>((set) => ({
  next: "",
  setNext: (next) => set({ next: next })
}))
