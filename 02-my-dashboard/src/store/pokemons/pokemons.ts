import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimplePokemon } from "@/pokemons";

export interface PokemonsState {
  favorites: {
    [key: string]: SimplePokemon;
  };
}

/* const getInitialState = (): PokemonsState => {
  const favorites = JSON.parse(
    localStorage.getItem("favorite-pokemons") ?? "{}"
  );
  return favorites;
}; */

const initialState: PokemonsState = {
  favorites: {},
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<SimplePokemon>) => {
      // Validar si el pokemon que llegue como payload existe en el state
      const pokemon = action.payload;
      const { id } = pokemon;

      if (!!state.favorites[id]) {
        delete state.favorites[id];
        return;
      }

      // Si no existe, agregamos el pokemon con el id que nos proporciona el action.payload
      state.favorites[id] = pokemon;
    },
  },
});

export const { toggleFavorite } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
