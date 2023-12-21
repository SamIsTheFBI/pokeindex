import { AppShell, Badge, Button, Container, Flex, Group, Paper, Skeleton, Stack, Text, Title } from "@mantine/core"
import Image from "next/image"
import Link from "next/link"
import { TbPokeball } from "react-icons/tb"
import { VscGithubAlt } from "react-icons/vsc"

export const getServerSideProps = async ({ params }: any) => {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
  const PokemonData = await res.json();

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
    props: { PokemonData, flavorText },
  };
}

export const typeColor = {
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

const PokemonPage = ({ PokemonData: pokemon, flavorText: pokemonFact }: any) => {
  const removeEscapeCharacters = (str: string) => {
    const noEscapeChars = str.replace(/[\n\f\t]/g, " ");
    return noEscapeChars.replace(/POKéMON/g, "Pokémon")
  }

  // const baseStats = pokemon.stats.map(
  //   (stat: { base_stat: number }) => stat.base_stat
  // );

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
        <Container size="sm">
          <Title ta="center" order={1} tt="capitalize">{pokemon.name}</Title>
          <Text ta="center" size="sm" c="dimmed">{`#${pokemon.id?.toString().padStart(4, '0')}`}</Text>
          <Paper shadow="xs" p="lg" mt="md" radius="md" withBorder>
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify="center"
              align="center"
            >
              {
                pokemon?.sprites?.other["official-artwork"].front_default &&
                <Paper bg="gray.1" radius="md" p="lg">
                  <Image
                    src={pokemon?.sprites?.other["official-artwork"].front_default}
                    height={160}
                    width={160}
                    quality={80}
                    object-fit="contain"
                    alt="Pokemon Image"
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
                <Stack justify="" gap="xs">
                  <Text>
                    {removeEscapeCharacters(pokemonFact)}
                  </Text>
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
                        variant="default"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.ability.name}
                      </Badge>) : "???"}
                  </Group>
                </Stack>
              </Container>
            </Flex>
          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default PokemonPage
