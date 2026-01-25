//import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export type Joke = {
  id: string
  value: string
  categories?: string[]
}

type FavoritesState = {
  items: Joke[]
}

const initialState: FavoritesState = {
  items: [],
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Joke>) => {
      const exists = state.items.some((j) => j.id === action.payload.id)
      if (!exists) state.items.push(action.payload)
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((j) => j.id !== action.payload)
    },
    setFavorites: (state, action: PayloadAction<Joke[]>) => {
      state.items = action.payload
    },
    clearFavorites: (state) => {
      state.items = []
    },
  },
})

export const { addFavorite, removeFavorite, setFavorites, clearFavorites } =
  favoritesSlice.actions

export default favoritesSlice.reducer
export const selectFavorites = (state: { favorites: FavoritesState }) =>
  state.favorites.items;