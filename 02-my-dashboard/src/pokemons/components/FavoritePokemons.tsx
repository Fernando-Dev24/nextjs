"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { PokemonGrid } from "./PokemonGrid";
import { PokemonsState } from "@/store/pokemons/pokemons";
import { SimplePokemon } from "../interfaces/simple-pokemon";
import { useEffect, useState } from "react";

/* const mappedPokemons = (pokemons: PokemonsState): SimplePokemon[] => {
  let pokemonsArray: SimplePokemon[] = [];

  for (const key in pokemons) {
    pokemonsArray.push(pokemons[key]);
  }

  return [...pokemonsArray];
}; */

export const FavoritePokemons = () => {
  /* const favoritesPokemons = useAppSelector((state) => state.pokemons.favorites);
  const pokemonsArray = Object.values(favoritesPokemons); */

  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);

  // Mi solucion consiste en no cargar el estado del store, sino que directamente obtener los pokemons favorito desde el localstorage, sin necesidad de usar la nueva action del reducer
  useEffect(() => {
    const parsedPokemons = JSON.parse(
      localStorage.getItem("favorite-pokemons") ?? "[]"
    );
    setPokemons(Object.values(parsedPokemons));
  }, []);

  return (
    <div>
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
};
