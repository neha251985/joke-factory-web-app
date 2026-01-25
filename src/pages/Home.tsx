import { useEffect, useMemo, useState } from "react";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  fetchCategories,
  fetchJoke,
  selectCategories,
  selectCategoriesStatus,
  selectCategoriesError,
  selectCurrentJoke,
  selectJokeStatus,
  selectJokeError,
} from "../store/jokesSlice.ts";

export default function Home() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.favorites.items);

  // 🔹 From jokesSlice
  const categories = useAppSelector(selectCategories);
  const categoriesStatus = useAppSelector(selectCategoriesStatus);
  const categoriesError = useAppSelector(selectCategoriesError);

  const joke = useAppSelector(selectCurrentJoke);
  const jokeStatus = useAppSelector(selectJokeStatus);
  const jokeError = useAppSelector(selectJokeError);

  const [selectedCategory, setSelectedCategory] = useState<string>(""); // "" = Random/All

  const loadingCategories = categoriesStatus === "loading";
  const loadingJoke = jokeStatus === "loading";
  const error = categoriesError ?? jokeError ?? null;

  const isFav = useMemo(() => {
    if (!joke) return false;
    return favorites.some((j) => j.id === joke.id);
  }, [favorites, joke]);

  // ✅ On-load: use async thunks
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchJoke(undefined)); // random joke
  }, [dispatch]);

  function handleGetJoke() {
    dispatch(fetchJoke(selectedCategory || undefined)); // "" => random
  }

  function handleToggleFavorite() {
    if (!joke) return;

    if (isFav) {
      dispatch(removeFavorite(joke.id));
      toast.info("Removed from favorites");
    } else {
      dispatch(addFavorite(joke));
      toast.success("Added to favorites ❤️");
    }
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h2>Joke Generator</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <label>
          Category:{" "}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={loadingCategories}
          >
            <option value="">Random (All)</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <button onClick={handleGetJoke} disabled={loadingJoke}>
          {loadingJoke ? "Loading..." : "Get Joke"}
        </button>
      </div>

      {loadingCategories && (
        <div style={{ marginTop: 8 }}>
          {/* You can use text OR Spinner */}
          {/* <p>Loading categories...</p> */}
          <Spinner />
        </div>
      )}

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div style={{ marginTop: 16 }}>
        {joke && (
          <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <p style={{ marginTop: 0 }}>{joke.value}</p>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button onClick={handleToggleFavorite} disabled={loadingJoke}>
                {isFav ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <small>
                Category:{" "}
                {joke.categories && joke.categories.length > 0
                  ? joke.categories.join(", ")
                  : "Random"}
              </small>
            </div>
          </div>
        )}

        {jokeStatus === "loading" && !joke && (
          <div style={{ marginTop: 8 }}>
            {/* Again, Spinner or text */}
            {/* <p>Loading joke...</p> */}
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
