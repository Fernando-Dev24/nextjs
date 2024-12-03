import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  count: number;
}

const initialState = {
  count: 5,
} as CounterState;

const counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addOne: (state) => {
      state.count++;
    },

    substractOne: (state) => {
      if (state.count === 0) return; // No permitir que el counter sea menor a cero
      state.count--;
    },

    resetCount: (state, action: PayloadAction<number>) => {
      if (action.payload < 0) action.payload = 0; // No permitir que el counter sea menor a cero
      state.count = action.payload;
    },
  },
});

export const { addOne, substractOne, resetCount } = counter.actions;

export default counter.reducer;
