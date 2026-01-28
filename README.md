# 🎭 Joke Factory Web App

A modern, fully-featured joke generator built with **React**, **TypeScript**, and **Redux Toolkit**. Fetch Chuck Norris jokes, save favorites, and enjoy a smooth, responsive user experience.

![React](https://img.shields.io/badge/react-v19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/typescript-v5.9-blue?logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/redux%20toolkit-v2.11-purple?logo=redux)
![Vite](https://img.shields.io/badge/vite-v7.2-brightgreen?logo=vite)

---

## ✨ Features

### 🏠 Home Page (`/`)
- **Joke Generator** – Fetch random jokes or filter by category
- **Category Dropdown** – 25+ joke categories available
- **Favorite Toggle** – Save jokes with a single click
- **Loading States** – Visual feedback with spinner + status messages
- **Error Handling** – User-friendly error messages on API failures

### ❤️ Favorites Page (`/favorites`)
- **Persistent Storage** – Favorites saved in browser's Local Storage
- **Search Filter** – Real-time search with 300ms debounce
- **Quick Remove** – Delete jokes from favorites instantly
- **Empty State** – Friendly message when no favorites exist
- **Toast Notifications** – Confirmations when adding/removing jokes

### 🔄 State Management
- **Redux Toolkit** for centralized, predictable state
- **Async Thunks** for API calls with built-in loading/error states
- **Selectors** for efficient component subscriptions
- **localStorage Integration** for automatic persistence

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Build** | Vite | ^7.2 |
| **Frontend** | React | ^19.2 |
| **Language** | TypeScript | ~5.9 |
| **State** | Redux Toolkit | ^2.11 |
| **Routing** | React Router | ^7.12 |
| **Notifications** | React Toastify | ^11.0 |
| **Testing** | Jest + React Testing Library | ^30 / ^16 |
| **Linting** | ESLint | ^9.39 |

---

## 📦 Quick Start

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/neha251985/joke-factory-web-app.git
cd joke-factory-web-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start Vite dev server (HMR enabled)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Watch mode for tests
```

---

## 📁 Project Structure

```
joke-factory-web-app/
├── src/
│   ├── pages/
│   │   ├── Home.tsx          # Joke generator page
│   │   ├── Favorites.tsx      # Saved jokes page
│   │   └── __tests__/         # Page component tests
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation bar
│   │   └── Spinner.tsx        # Loading spinner
│   ├── store/
│   │   ├── store.ts           # Redux store configuration
│   │   ├── jokesSlice.ts      # Jokes & categories state
│   │   ├── favoritesSlice.ts  # Favorites state
│   │   ├── hooks.ts           # Typed Redux hooks
│   │   └── localStorage.ts    # Persistence utilities
│   ├── App.tsx                # Root component with routing
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔌 Redux Architecture

### State Shape
```typescript
{
  jokes: {
    categories: string[],
    categoriesStatus: "idle" | "loading" | "succeeded" | "failed",
    categoriesError: string | null,
    currentJoke: Joke | null,
    jokeStatus: "idle" | "loading" | "succeeded" | "failed",
    jokeError: string | null
  },
  favorites: {
    items: Joke[]
  }
}
```

### Slices

**`jokesSlice`** – API integration & async operations
- `fetchCategories()` – Async thunk to load all categories
- `fetchJoke(category?)` – Async thunk to get a random or category-specific joke
- Tracks loading states and errors separately for categories and jokes

**`favoritesSlice`** – Local favorites management
- `addFavorite(joke)` – Add a joke to favorites (prevents duplicates)
- `removeFavorite(jokeId)` – Remove joke by ID
- `setFavorites(jokes)` – Bulk set (used when loading from localStorage)
- `clearFavorites()` – Clear all favorites

### Selectors
```typescript
// hooks.ts provides typed hooks
export const useAppDispatch = () => Dispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState>

// favoritesSlice exports
export const selectFavorites = (state) => state.favorites.items
```

---

## 🔄 Data Flow

```
User Action
    ↓
Component dispatches Redux Action/Thunk
    ↓
Redux Middleware processes (Thunk fetches API data)
    ↓
Reducer updates state
    ↓
store.subscribe() fires (localStorage saved)
    ↓
Component re-renders with new state
    ↓
User sees updates + optional Toast notification
```

### Example: "Get Joke" Flow
```
1. User clicks "Get Joke" button
2. Component calls dispatch(fetchJoke(selectedCategory))
3. Thunk sets jokeStatus = "loading"
4. API request to https://api.chucknorris.io/jokes/random?category=...
5. On success: currentJoke updated, jokeStatus = "succeeded"
6. Component re-renders with new joke
7. User can now favorite it or get another
```

---

## 🎨 UI Components

### Pages
- **Home** – Main page with joke generator and controls
- **Favorites** – Searchable list of saved jokes

### Shared Components
- **Navbar** – Navigation links between pages
- **Spinner** – Loading indicator displayed during API calls

### Styling
- CSS Modules (imported in components)
- Responsive design with flexbox/grid
- Toast notifications via react-toastify

---

## 🧪 Testing

The app includes unit and integration tests using Jest and React Testing Library:

```bash
npm test              # Run all tests
npm test:watch       # Watch mode for TDD
```

Test files:
- `src/pages/__tests__/Home.test.tsx`
- `src/pages/__tests__/Favorites.test.tsx`
- Additional test utilities in `src/test/`

---

## 🚀 Performance Optimizations

- **Debounced Search** – Filters on Favorites page only re-run after 300ms of inactivity
- **Memoized Selectors** – Redux selectors prevent unnecessary re-renders
- **Async Thunks** – Network requests don't block UI
- **React Compiler** – Babel plugin enabled for automatic memoization

---

## 📡 API Integration

**External API**: [Chuck Norris Jokes API](https://api.chucknorris.io/)

- `GET /jokes/categories` – Fetch all available categories
- `GET /jokes/random` – Get a random joke
- `GET /jokes/random?category={name}` – Get a joke from a specific category

**Error Handling**: Network errors display user-friendly messages and are stored in Redux state.

---

## 🔐 Local Storage

Favorites are automatically persisted:
- **Load**: On app startup, `preloadedState` loads from `localStorage`
- **Save**: After every state update, `store.subscribe()` saves to localStorage
- **Clear**: Manual `clearFavorites()` action clears both Redux and localStorage

---

## 🐛 Debugging

### Redux DevTools
Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension) to inspect:
- Action history
- State snapshots
- Time-travel debugging

### Browser Console
```javascript
// Access Redux store in console (if exported)
store.getState()           // View entire state
store.dispatch(...)        // Dispatch actions manually
```

---

## 📝 Code Style

- **TypeScript Strict Mode** – All files use strict type checking
- **ESLint** – Enforces best practices and React hooks rules
- **Prettier** (optional) – Code formatting consistency

Run linter:
```bash
npm run lint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** – see the LICENSE file for details.

---

## 👨‍💻 Author

**Neha Tiwari**  
[GitHub](https://github.com/neha251985) | [Portfolio](https://your-portfolio-url.com)

---

## 🙋 FAQ

**Q: Why use Redux instead of Context API?**  
A: Redux provides better performance at scale, better devtools, and cleaner separation of concerns.

**Q: How are favorites persisted?**  
A: Browser's `localStorage` API stores JSON-serialized favorites. They're loaded on app startup and saved on every change.

**Q: Can I use a different joke API?**  
A: Yes! Update the URLs in `jokesSlice.ts` and adjust the response types accordingly.

**Q: Are there API rate limits?**  
A: Chuck Norris API is free with no rate limits. Fair use encouraged.

---

**Happy joking!** 🤣
