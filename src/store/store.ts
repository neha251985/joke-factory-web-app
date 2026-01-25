import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer, { type Joke } from "../store/favoritesSlice";
import jokesReducer from "./jokesSlice";
import { loadFavorites, saveFavorites } from "./localStorage.ts";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    jokes: jokesReducer,                                     
  },
  preloadedState: {
    favorites: {
      items: (loadFavorites() as Joke[]) ?? [],
    },
    // ✅ jokes will use its own initialState from jokesSlice
  },
});

// Persist whenever favorites change
store.subscribe(() => {
  const state = store.getState();
  saveFavorites(state.favorites.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
