import { SimplePokemon } from "../interfaces/simple-pokemon";
import { PokemonCard } from "./PokemonCard";
import { IoSadOutline } from "react-icons/io5";

interface Props {
  pokemons: SimplePokemon[];
}

export const PokemonGrid = ({ pokemons }: Props) => {
  if (pokemons.length < 1) {
    return (
      <div className="mt-5 text-center flex flex-col items-center justify-center">
        <IoSadOutline size={50} />
        <span className="text-5xl my-2">No hay pokemons favoritos</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
