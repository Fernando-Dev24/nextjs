import { Pokemon } from "@/pokemons";

interface Props {
  params: { id: string };
}

const getPokemon = async (id: string): Promise<Pokemon> => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: "force-cache",
  }).then((res) => res.json());

  return pokemon;
};

export default async function PokemonCardPage({ params }: Props) {
  const { id } = await params;
  const pokemon = await getPokemon(id);

  return (
    <div>
      <h1>Pokemon: {id}</h1>
      <div>{JSON.stringify(pokemon)}</div>
    </div>
  );
}
