import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeFavorite, selectFavorites } from "../store/favoritesSlice";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  if (favorites.length === 0) {
    return (
      <div className="stack">
        <h1 className="title">Favorites</h1>
        <div className="empty">You haven&apos;t saved any jokes yet!</div>
      </div>
    );
  }

  const filteredFavorites = favorites.filter((joke) =>
    joke.value.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="stack">
      <h1 className="title">Favorites</h1>

      <input
        type="text"
        placeholder="Search saved jokes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <div className="grid">
        {filteredFavorites.map((joke) => (
          <div className="card" key={joke.id}>
            <p className="joke-text">{joke.value}</p>

            <button
              className="btn"
              onClick={() => {
                dispatch(removeFavorite(joke.id));
                toast.info("Removed from favorites");
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
