import { create } from 'zustand';

const useStore = create((set) => ({
  pokemons: [],
  addPokemon:
    (pokemon: any) =>
      set(() => ({ pokemons: pokemon })),
  next: "",
  setNext:
    (next: any) =>
      set(() => ({ next: next }))
}))

export default useStore;
