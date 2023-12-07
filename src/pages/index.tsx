import { TbPokeball } from "react-icons/tb";
import { AppShell, Button, Center, Group, Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useState } from "react";
import { VscGithubAlt } from "react-icons/vsc";

import { PokemonCard } from "~/components"
import Link from "next/link";

export const getServerSideProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
  const data = await res.json();
  return {
    props: { data },
  };
};

export default function Home({ data }: { data: any }) {

  const [pokemons] = useState<any>(data.results);

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
          {pokemons.length !== 0 && pokemons.map((pokemon: any, idx: number) => {
            return <PokemonCard name={pokemon.name} key={idx} />
          })}
        </SimpleGrid>
        <Center p="xl">
          <Loader color="cyan" type="bars" />
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}
