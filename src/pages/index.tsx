import { AppShell, Center, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useEffect } from "react";
import useStore from '~/store'

import { PokemonCard, LoaderComponent, HeaderComponent } from "~/components"

export const getServerSideProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=12");
  const data = await res.json();
  return {
    props: { data },
  };
};

export default function Home({ data }: { data: any }) {
  const pokemons = useStore((state: any) => state.pokemons)
  const addPokemon = useStore((state: any) => state.addPokemon)
  const next = useStore((state: any) => state.next)
  const setNext = useStore((state: any) => state.setNext)

  useEffect(() => {
    setNext(data.next)
    addPokemon(data.results)
  }, [])

  return (
    <AppShell
      header={{ height: 60 }}
      padding="lg"
    >
      <AppShell.Header>
        <HeaderComponent />
      </AppShell.Header>
      <AppShell.Main>
        <Stack mx="auto" px="md" justify="center" align="left">
          <Container size="sm">
            <Title>PokeIndex</Title>
            <Text mb="md" c="dark.5">
              A simple Pokedex-like web app that uses the PokeAPI to display information on different Pokemon. Made with NextJS & Mantine.
            </Text>
          </Container>
        </Stack>
        <SimpleGrid cols={{ base: 2, xs: 3, md: 6 }}>
          {pokemons.length !== 0 && pokemons.map((pokemon: any) => {
            return <PokemonCard name={pokemon.name} key={pokemon.id} />
          })}
        </SimpleGrid>
        {
          next != null &&
          <Center p="xl">
            <LoaderComponent />
          </Center>
        }
      </AppShell.Main>
    </AppShell>
  );
}
