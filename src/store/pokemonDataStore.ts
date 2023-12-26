import { create } from "zustand"
import { type PokemonListResults } from "~/types";

interface PokemonStore {
  pokemons: PokemonListResults[];
  addPokemon: (pokemon: PokemonListResults[]) => void
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],
  addPokemon: (pokemon) => set({ pokemons: pokemon })
}))
