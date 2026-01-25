import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Joke } from "./favoritesSlice";

type ApiJoke = {
  id: string;
  value: string;
  categories: string[];
};

type Status = "idle" | "loading" | "succeeded" | "failed";

type JokesState = {
  categories: string[];
  categoriesStatus: Status;
  categoriesError: string | null;

  currentJoke: Joke | null;
  jokeStatus: Status;
  jokeError: string | null;
};

const initialState: JokesState = {
  categories: [],
  categoriesStatus: "idle",
  categoriesError: null,

  currentJoke: null,
  jokeStatus: "idle",
  jokeError: null,
};

// ✅ Thunk: categories
export const fetchCategories = createAsyncThunk<string[]>(
  "jokes/fetchCategories",
  async () => {
    const res = await fetch("https://api.chucknorris.io/jokes/categories");
    if (!res.ok) throw new Error(`Categories request failed: ${res.status}`);
    return (await res.json()) as string[];
  }
);

// ✅ Thunk: joke (optional category)
export const fetchJoke = createAsyncThunk<Joke, string | undefined>(
  "jokes/fetchJoke",
  async (category) => {
    const url =
      category && category.trim().length > 0
        ? `https://api.chucknorris.io/jokes/random?category=${encodeURIComponent(
            category
          )}`
        : "https://api.chucknorris.io/jokes/random";

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Joke request failed: ${res.status}`);

    const data = (await res.json()) as ApiJoke;
    return { id: data.id, value: data.value, categories: data.categories };
  }
);

const jokesSlice = createSlice({
  name: "jokes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
        state.categoriesError = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.categoriesStatus = "succeeded";
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = "failed";
        state.categoriesError =
          action.error.message ?? "Failed to load categories";
      });

    // joke
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.jokeStatus = "loading";
        state.jokeError = null;
      })
      .addCase(fetchJoke.fulfilled, (state, action: PayloadAction<Joke>) => {
        state.jokeStatus = "succeeded";
        state.currentJoke = action.payload;
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.jokeStatus = "failed";
        state.jokeError = action.error.message ?? "Failed to load joke";
        state.currentJoke = null;
      });
  },
});

export default jokesSlice.reducer;

// ✅ selectors
export const selectCategories = (s: RootState) => s.jokes.categories;
export const selectCategoriesStatus = (s: RootState) => s.jokes.categoriesStatus;
export const selectCategoriesError = (s: RootState) => s.jokes.categoriesError;

export const selectCurrentJoke = (s: RootState) => s.jokes.currentJoke;
export const selectJokeStatus = (s: RootState) => s.jokes.jokeStatus;
export const selectJokeError = (s: RootState) => s.jokes.jokeError;
