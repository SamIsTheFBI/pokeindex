import { Loader } from "@mantine/core";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import useStore from "~/store";

function LoaderComponent() {
  const pokemons = useStore((state: any) => state.pokemons)
  const addPokemon = useStore((state: any) => state.addPokemon)
  const next = useStore((state: any) => state.next)
  const setNext = useStore((state: any) => state.setNext)

  const ref = useRef(null)
  const isInView = useInView(ref)

  const fetchPokemons = async (url: string) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setNext(data.next);
    if (pokemons.length !== 0) {
      addPokemon([...pokemons, ...data.results]);
      return;
    }
    addPokemon(data.results);
  };


  useEffect(() => {
    fetchPokemons(next)
  }, [isInView])

  return <div ref={ref}>
    <Loader color="cyan" type="bars" />
  </div>

}

export default LoaderComponent;
