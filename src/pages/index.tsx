import { Anchor, AppShell, Center, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useEffect } from "react";
import useStore from '~/store'
import { motion } from "framer-motion"

import { PokemonCard, LoaderComponent, HeaderComponent } from "~/components"
import { NextSeo } from 'next-seo';
import Image from 'next/image';

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
      <NextSeo
        title={`PokeIndex`}
        description="A few facts & stats of your favorite Pokemon using PokeAPI"
        openGraph={{
          url: 'https://pokeindex-one.vercel.app/',
          title: 'PokeIndex',
          description: 'A few facts & stats of your favorite Pokemon using PokeAPI',
          images: [
            {
              url: 'https://i.ibb.co/X2MpFL5/image.png',
              width: 551,
              height: 204,
              alt: 'PokeIndex - A few facts & stats of your favorite Pokemon using PokeAPI',
              type: 'image/png',
            },
          ],
          siteName: 'PokeIndex',
        }}
        twitter={{
          handle: '@samisthefbi',
          site: '@samisthefbi',
          cardType: 'summary_large_image',
        }}
      />

      <AppShell.Header>
        <HeaderComponent />
      </AppShell.Header>
      <AppShell.Main>
        <Stack mx="auto" px="md" justify="center" align="left">
          <Container size="sm">
            <Group justify="center">
              <motion.div
                style={{ display: "flex", justifyContent: "center" }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.8, rotate: -360 }}
              >
                <Image src="/240px-Poké_Ball_icon.svg.png" height={42} width={42} alt="Pokeball" priority />
              </motion.div>
              <Text
                fw={900}
                variant="gradient"
                gradient={{ from: 'teal.4', to: 'cyan', deg: 45 }}
                component="div"
              >
                <Title>
                  PokeIndex
                </Title>
              </Text>
            </Group>
            <Text my="md" c="dark.5" ta="center">
              A simple Pokedex-like web app that uses the <Anchor href="https://pokeapi.co/">PokeAPI</Anchor> to display information on different Pokemon. Made with <Anchor href="https://nextjs.org/">NextJS</Anchor> & <Anchor href="https://mantine.dev/">Mantine</Anchor>.
            </Text>
          </Container>
        </Stack>
        <Container size="xl" style={{ padding: 0 }}>
          <SimpleGrid cols={{ base: 2, xs: 3, md: 6 }}>
            {pokemons.length !== 0 && pokemons.map((pokemon: any, key: number) => {
              return <PokemonCard name={pokemon.name} key={key} />
            })}
          </SimpleGrid>
        </Container>
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
