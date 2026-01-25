# Joke Factory – React + TypeScript + Redux Toolkit

This is a small web application built with **Vite**, **React**, **TypeScript**, and **Redux Toolkit**.

The app uses the public [Chuck Norris Jokes API](https://api.chucknorris.io/) to:
- Fetch joke categories and random jokes (with `createAsyncThunk`)
- Let users save jokes as **favorites** (stored in Redux)
- Persist favorites in **Local Storage**
- View and filter all saved jokes on the **/favorites** page
- Show **toast notifications** when adding/removing favorites

---

## ✨ Features

### 1. App Structure & Routing
- `/` – **Home (Joke Generator)**
  - On load:
    - Fetches categories from API
    - Fetches one random joke
  - Dropdown to choose a category
  - **Get Joke** button:
    - If a category is selected → gets a joke from that category  
    - Otherwise → gets a completely random joke
  - **Add / Remove Favorite** button:
    - Toggles the current joke in the favorites list
    - Shows a toast notification on add/remove

- `/favorites` – **Favorites Page**
  - Lists all jokes saved in Redux favorites
  - Each joke card has a **Remove** button (removes from favorites)
  - If no favorites → shows “You haven’t saved any jokes yet!”
  - Search input to **filter** saved jokes (debounced so it doesn’t re-render on every keystroke)

---

### 2. Global State & Persistence

- Global state is handled with **Redux Toolkit**:
  - `favoritesSlice` – manages the array of favorite jokes
  - `jokesSlice` – manages categories, current joke, loading & error states
- Favorites are persisted using Local Storage:
  - Initial favorites are loaded from Local Storage into `preloadedState`
  - On each store update, favorites are saved back to Local Storage

---

### 3. Async Thunks (API calls)

All API calls use **`createAsyncThunk`** inside `jokesSlice`:

- `fetchCategories` – fetches all joke categories from `https://api.chucknorris.io/jokes/categories`
- `fetchJoke` – fetches a random joke
  - If a category is passed → `random?category=<name>`
  - Otherwise → fully random

The slice tracks:
- `categoriesStatus`, `categoriesError`
- `jokeStatus`, `jokeError`
- These are used in the UI to show loading states and error messages.

---

### 4. Toast Notifications

The app uses **react-toastify** to show non-blocking notifications when:
- A joke is added to favorites
- A joke is removed from favorites

`ToastContainer` is rendered once at the root, and `toast.success` / `toast.info` are called from components.

---

## 🛠️ Tech Stack

- **Vite** (React + TypeScript template)
- **React 18**
- **TypeScript**
- **Redux Toolkit**
- **React-Redux**
- **React Router**
- **React Testing Library** + **Jest** (if tests are included)
- **React-Toastify** (for toast notifications)

---

## 📦 Installation

### Prerequisites

- Node.js (LTS recommended, e.g. 18.x or 20.x)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
