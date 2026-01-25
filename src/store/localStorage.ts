import type { Joke } from "./favoritesSlice";

const KEY = "favorites_jokes_v1";

export function loadFavorites(): Joke[] | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

export function saveFavorites(favorites: Joke[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  } catch {
    // ignore write errors
  }
}
