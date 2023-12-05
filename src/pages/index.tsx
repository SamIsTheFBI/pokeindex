import { TbPokeball } from "react-icons/tb";
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Autocomplete, Burger, Grid, Group, SimpleGrid, Skeleton, Stack, Text, Title } from '@mantine/core';
import { Card, Image, Badge, Button } from '@mantine/core';
import { useState, useRef } from "react";
import { useInView } from "framer-motion"
import { IoShareOutline } from "react-icons/io5";
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
  const [opened, { toggle }] = useDisclosure();

  const [res, setRes] = useState<any>(data?.next);
  const [pokemons, setPokemons] = useState<any>(data.results);

  const fetchPokemons = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setRes(data.next);
    if (pokemons.length !== 0) {
      setPokemons([...pokemons, ...data.results]);
      return;
    }
    setPokemons(data.results);
  };

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
        <Title>PokeIndex</Title>
        <Group justify="center">
          <Text my="md" c="dark.5">
            A simple Pokedex-like web app that uses the PokeAPI to display information on different Pokemon. Made with NextJS & Mantine.
          </Text>
        </Group>
        <SimpleGrid cols={{ base: 2, xs: 4, md: 6 }}>
          {pokemons.map((pokemon: any, idx: number) => {
            return <PokemonCard name={pokemon.name} key={idx} />
          })}
        </SimpleGrid>
      </AppShell.Main>
    </AppShell>
  );
}
