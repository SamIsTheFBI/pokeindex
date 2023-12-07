import { TbPokeball } from "react-icons/tb";
import { AppShell, Button, Center, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useEffect } from "react";
import { VscGithubAlt } from "react-icons/vsc";
import useStore from '~/store'

import { PokemonCard, LoaderComponent } from "~/components"
import Link from "next/link";

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
        <Group h="100%" justify="space-between" px="lg" gap={"sm"}>
          { /* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
          <Group gap="xs">
            <TbPokeball size={28} />
            <Text size={"xl"} fw={900} variant="gradient" gradient={{ from: 'teal.4', to: 'cyan', deg: 45 }}>PokeIndex</Text>
          </Group>
          <Button size="sm" color="cyan" leftSection={<VscGithubAlt />} component={Link} href="https://github.com/samisthefbi/pokeindex">
            Source Code
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Stack mx="auto" px="md" justify="center" align="left">
          <Title>PokeIndex</Title>
          <Text mb="md" c="dark.5">
            A simple Pokedex-like web app that uses the PokeAPI to display information on different Pokemon. Made with NextJS & Mantine.
          </Text>
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
