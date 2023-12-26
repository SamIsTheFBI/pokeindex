import { AppShell, Badge, Blockquote, Button, Container, Flex, Group, Paper, Skeleton, Stack, Text, Title } from "@mantine/core"
import Image from "next/image"
import { NextSeo } from "next-seo"
import { Chart, HeaderComponent } from "~/components"
import { TbPokeball } from "react-icons/tb";
import Error from 'next/error'
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export const getServerSideProps = async ({ params }: any) => {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
  const errorCode = res.ok ? false : res.status

  if (errorCode) {
    return {
      props: { errorCode }
    }
  }

  const PokemonData = await res.json();
  const pokemonId = PokemonData.id

  res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonId}&limit=1`)
  const nextError = res.ok ? false : res.status
  let nextPokemon = null

  if (!nextError) {
    const nextData = await res.json()
    nextPokemon = nextData.results[0] !== undefined ? nextData.results[0].name : null
  }

  res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonId - 2}&limit=1`)
  const prevError = res.ok ? false : res.status
  let prevPokemon = null

  if (!prevError) {
    const prevData = await res.json()
    prevPokemon = prevData.results[0] !== undefined ? prevData.results[0].name : null
  }

  res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.name}`)
  const PokemonSpeciesData = await res.json()

  const filterFlavorText = (array: { flavor_text: string; language: { name: string } }[]) => {
    for (const arrayElement of array) {
      if (arrayElement?.language.name === "en") {
        const textToPush: string | undefined = arrayElement.flavor_text
        if (textToPush !== undefined) {
          return textToPush
        }
      }
    }
  }


  const flavorText = filterFlavorText(PokemonSpeciesData.flavor_text_entries)

  return {
    props: { PokemonData, flavorText, errorCode, nextPokemon, prevPokemon },
  };
}

export const typeColor = {
  dark: "#775544",
  fire: "orange",
  grass: "green",
  electric: "#ffce6b",
  water: "blue",
  ground: "yellow",
  rock: "#ca8a04",
  fairy: "#FAA2C1",
  poison: "#BE4BDB",
  bug: "#65a30d",
  dragon: "#7e22ce",
  psychic: "#e879f9",
  flying: "cyan",
  fighting: "#dc2626",
  normal: "#a3a3a3",
  steel: "#94a3b8",
  ice: "#22d3ee",
  ghost: "#581c87",
};

const PokemonPage = ({ PokemonData: pokemon, flavorText: pokemonFact, errorCode, nextPokemon, prevPokemon }: any) => {
  if (errorCode) {
    return <div style={{ color: "black" }}><Error statusCode={errorCode} /></div>
  }

  const removeEscapeCharacters = (str: string) => {
    const noEscapeChars = str.replace(/[\n\f\t]/g, " ");
    return noEscapeChars.replace(/POKéMON/g, "Pokémon")
  }

  const baseStats: { base_stat: number, name: string }[] = pokemon.stats.map((stat: { base_stat: number, stat: { name: string } }) => {
    const pokemonStat = {
      "base_stat": stat.base_stat,
      "name": stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1),
    }

    return pokemonStat
  })

  return (
    <AppShell
      header={{ height: 60 }}
      padding="lg"
    >
      <NextSeo
        title={`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - PokeIndex`}
        description="A few facts & stats of your favorite Pokemon"
        openGraph={{
          url: 'https://pokeindex-one.vercel.app/',
          title: 'PokeIndex',
          description: 'A few facts & stats of your favorite Pokemon',
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
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
        <Container size="sm">
          <Group justify="space-between" wrap="nowrap" align="center">
            {
              prevPokemon !== null ?
                <Button variant="transparent" size="compact-xl" color="cyan" component={Link} href={`/pokemon/${prevPokemon}`}><FaArrowLeft /></Button>
                : <div>&nbsp;</div>
            }
            <div>
              <Title ta="center" order={1} tt="capitalize">{pokemon.name}</Title>
              <Text ta="center" size="sm" c="dimmed">{`#${pokemon.id?.toString().padStart(4, '0')}`}</Text>
            </div>
            {
              nextPokemon !== null ?
                <Button variant="transparent" size="compact-xl" color="cyan" component={Link} href={`/pokemon/${nextPokemon}`}><FaArrowRight /></Button>
                : <div>&nbsp;</div>
            }
          </Group>
          <Paper shadow="xs" p="lg" mt="md" radius="md" withBorder>
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify="center"
              align="center"
            >
              {
                pokemon?.sprites?.other["official-artwork"].front_default &&
                <Paper bg="gray.1" radius="md" p="lg" withBorder>
                  <Image
                    src={pokemon?.sprites?.other["official-artwork"].front_default}
                    height={160}
                    width={160}
                    quality={80}
                    object-fit="contain"
                    alt="Pokemon Image"
                    priority
                  />
                  <Group justify="center" gap={6} align="center">
                    {pokemon.types && pokemon.types.map(({ type }: any) => {
                      const typeName: keyof typeof typeColor = type.name.toString()
                      return (
                        <Badge color={`${typeColor[typeName]}`} size="sm" radius="sm" key={type.name}>{type.name}</Badge>
                      )
                    })}
                  </Group>
                </Paper>
                ||
                <Skeleton height={160} width={160} />
              }
              <Container >
                <Stack justify="center" gap="xs">
                  <Blockquote p="md" mt="md" icon={<TbPokeball size={32} />} iconSize={34} color="cyan">
                    {removeEscapeCharacters(pokemonFact)}
                  </Blockquote>

                  <Text>
                    <strong>Height:</strong> {pokemon.height / 10} m
                  </Text>
                  <Text>
                    <strong>Weight:</strong> {pokemon.weight / 10} kg
                  </Text>
                  <Group gap={6}>
                    <strong>Abilities:</strong>
                    {pokemon.abilities ? pokemon.abilities.map((item: { ability: { name: string } }) =>
                      <Badge
                        size="lg"
                        variant="outline"
                        style={{ textTransform: "capitalize" }}
                        key={item.ability.name}
                      >
                        {item.ability.name}
                      </Badge>) : "???"}
                  </Group>
                </Stack>
              </Container>
            </Flex>
            <Chart
              name={pokemon.name !== undefined ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : ""}
              pokemonStats={baseStats}
            />
          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default PokemonPage
