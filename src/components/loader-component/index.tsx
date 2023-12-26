import { Loader } from "@mantine/core";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePokemonStore, usePokemonList } from "~/store";
import { type PokemonList } from "~/types";

function LoaderComponent() {
  const { pokemons, addPokemon } = usePokemonStore()
  const { next, setNext } = usePokemonList()

  const ref = useRef(null)
  const isInView = useInView(ref)

  const fetchPokemons = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch Pokemon list. Status: ${res.status}`)
    }

    const data: PokemonList = await res.json() as PokemonList;

    if (data.next === null) {
      throw new Error(`No more Pokemons left!`)
    }

    setNext(data.next);
    if (pokemons.length !== 0) {
      addPokemon([...pokemons, ...data.results]);
      return;
    }
    addPokemon(data.results);
  };

  useEffect(() => {
    void fetchPokemons(next)
  }, [isInView])

  return <div ref={ref}>
    <Loader color="cyan" type="bars" />
  </div>

}

export default LoaderComponent;
