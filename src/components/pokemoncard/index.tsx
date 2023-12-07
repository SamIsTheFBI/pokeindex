import { Badge, Button, Card, Center, Group, Stack, Text } from "@mantine/core";
import { IoStatsChartSharp } from "react-icons/io5";
import Image from "next/image"
import { useEffect, useState } from "react";
export const typeColor = {
  fire: "orange",
  grass: "green",
  electric: "#FFF3BF",
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


export default function PokemonCard({ name, key }: { name: string, key: number }) {
  const [pokemon, setPokemon] = useState<any>({});

  useEffect(() => {
    const getPokemon = async () => {
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await resp.json();
      setPokemon(data);
      console.log(pokemon)
    };
    getPokemon();
  }, [name]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder key={key}>
      <Card.Section p="xs">
        <Center>
          <Image
            src={pokemon?.sprites?.other["official-artwork"].front_default}
            height={160}
            width={160}
            quality={80}
            objectFit="contain"
            alt="Pokemon Image"
          />
        </Center>
      </Card.Section>

      <Card.Section>
        <Stack justify="space-between" align="stretch" p="xs">
          <Stack justify="center" align="center" my="xs" gap="xs">
            <Stack justify="center" align="center" gap={0}>
              <Text fw={500} tt="capitalize">{name}</Text>
              <Text size="sm" c="dimmed">{`#${pokemon.id?.toString().padStart(4, '0')}`}</Text>
            </Stack>
            <Group justify="center" gap={6} align="center">
              {pokemon.types && pokemon.types.map(({ type }: any) => {
                const typeName: keyof typeof typeColor = type.name.toString()
                return (
                  <Badge color={`${typeColor[typeName]}`} size="sm" radius="sm" >{type.name}</Badge>
                )
              })}
            </Group>
          </Stack>

          <Button size="md" color="teal.4" fullWidth mt="xs" radius="md" rightSection={<IoStatsChartSharp />}>
            Stats
          </Button>
        </Stack>

      </Card.Section>
    </Card>
  )
}
