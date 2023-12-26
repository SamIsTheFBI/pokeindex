
interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: false;
  slot: number;
}

interface PokemonListResults {
  name: string;
  url: string;
}

interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResults[] | [];
}

interface PokemonData {
  id: number;
  name: string;
  abilities: Array<PokemonAbility>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      }
    }
  };
  stats: Array<PokemonStat>;
  types: Array<PokemonType>;
  height: number;
  weight: number;
}

interface PokemonSpeciesData {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: Color[];
  evolution_chain: EvolutionChain;
  evolves_from_species: null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: [];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: Color;
  growth_rate: Color;
  habitat: Color;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Color;
  varieties: Variety[];
}

interface Color {
  name: string;
  url: string;
}

interface EvolutionChain {
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Color;
  version: Color;
}

interface Genus {
  genus: string;
  language: Color;
}

interface Name {
  language: Color;
  name: string;
}

interface PalParkEncounter {
  area: Color;
  base_score: number;
  rate: number;
}

interface PokedexNumber {
  entry_number: number;
  pokedex: Color;
}

interface Variety {
  is_default: boolean;
  pokemon: Color;
}


export type {
  PokemonStat,
  PokemonType,
  PokemonAbility,
  PokemonList,
  PokemonListResults,
  PokemonData,
  PokemonSpeciesData,
}
