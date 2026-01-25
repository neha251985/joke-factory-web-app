import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import favoritesReducer from "../store/favoritesSlice"
export function renderWithProviders(
  ui: React.ReactElement,
  {
    route = "/",
    preloadedState,
  }: {
    route?: string;
    preloadedState?: any; // keep it simple for tests
  } = {}
) {
  const store = configureStore({
    // 👇 IMPORTANT: reducer is an OBJECT MAP
    reducer: {
      favorites: favoritesReducer,
    },
    // 👇 This is allowed to be { favorites: { items: [...] } }
    preloadedState,
  }as any // 👈 this silences the picky TS error
  );


  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>
    ),
  };
}
