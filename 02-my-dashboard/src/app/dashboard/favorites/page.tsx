import { PokemonGrid, PokemonsReponse, SimplePokemon } from "@/pokemons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Lorem ipsum dolor sit amet consectetur.",
};

export default async function PokemonsPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Listado de Pokémons Favoritos{" "}
        <small className="text-blue-500">Global State</small>
      </span>

      <PokemonGrid pokemons={[]} />
    </div>
  );
}
