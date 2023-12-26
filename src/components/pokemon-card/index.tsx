import { Badge, Button, Card, Center, Group, Skeleton, Stack, Text } from "@mantine/core";
import { IoStatsChartSharp } from "react-icons/io5";
import Image from "next/image"
import { useEffect, useState } from "react";
import Link from "next/link";
import { type PokemonType, type PokemonData } from "~/types";
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


export default function PokemonCard({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<PokemonData>();

  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch Pokemon data. Status: ${res.status}`)
      }
      const data = await res.json() as PokemonData;
      setPokemon(data);
    };
    void getPokemon();
  }, [name]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder key={pokemon?.id}>
      <Card.Section p="xs">
        <Center>
          {
            pokemon?.sprites?.other["official-artwork"].front_default !== undefined ?
              <Image
                src={pokemon?.sprites?.other["official-artwork"].front_default}
                height={160}
                width={160}
                quality={80}
                object-fit="contain"
                alt="Pokemon Image"
                key={pokemon.id}
              />
              : <Skeleton height={160} width={160} />
          }
        </Center>
      </Card.Section>

      <Card.Section>
        <Stack justify="space-between" align="stretch" p="xs">
          <Stack justify="center" align="center" my="xs" gap="xs">
            <Stack justify="center" align="center" gap={0}>
              <Text fw={500} tt="capitalize">{name}</Text>
              {
                pokemon?.id !== undefined ?
                  <Text size="sm" c="dimmed">{`#${pokemon.id?.toString().padStart(4, '0')}`}</Text>
                  : <Skeleton height={20} width={40} />
              }
            </Stack>
            <Group justify="center" gap={6} align="center">
              {pokemon?.types !== undefined ? pokemon.types?.map((PokemonType: PokemonType) => {
                const typeName: keyof typeof typeColor = PokemonType.type.name as keyof typeof typeColor
                return (
                  <Badge color={`${typeColor[typeName]}`} size="sm" radius="sm" key={typeName}>{typeName}</Badge>
                )
              }) : <Skeleton height={18} width={112} />}
            </Group>
          </Stack>

          <Button size="md" color="teal.4" fullWidth mt="xs" radius="md" rightSection={<IoStatsChartSharp />} component={Link} href={`/pokemon/${name}`}>
            Stats
          </Button>
        </Stack>

      </Card.Section>
    </Card>
  )
}
