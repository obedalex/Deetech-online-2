# lumex

A modern e-commerce frontend built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. Browse and filter a curated catalog of tech products, manage a cart and wishlist with localStorage persistence, and complete a full checkout flow.

This project doubles as a hands-on learning record — every concept exercised here (React hooks, Context, debouncing, pagination, controlled forms, route loading/error boundaries) is documented in the [Concepts I Learned Building This](#concepts-i-learned-building-this) section below.

---

## Live Features

- **Product catalog** with images, categories, ratings, and specs
- **Search** with 400ms debounce
- **Sidebar filters** — category, price range, customer rating
- **Sort dropdown** — popularity, price (asc/desc), top rated
- **Pagination** — 8 products per page, resets to page 1 on any filter change
- **Cart** — quantity controls, totals, persisted in localStorage
- **Wishlist** — heart-icon toggle, persisted in localStorage
- **Checkout flow** — shipping form, payment form (UI only), order confirmation with a generated order number
- **Toast notifications** for all user actions (sonner)
- **Dark / light mode** via `next-themes`
- **Loading skeletons** and **error boundary** for the shop route
- **Fully responsive** — mobile-first Tailwind breakpoints

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Tech Stack

| Layer      | Choice                  |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| UI library | React 19                |
| Language   | TypeScript              |
| Styling    | Tailwind CSS v4         |
| Components | shadcn/ui + Radix UI    |
| Icons      | lucide-react            |
| Theming    | next-themes             |
| Animation  | framer-motion           |
| Toasts     | sonner                  |
| Debouncing | use-debounce            |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — wraps providers, navbar, toaster
│   ├── page.tsx                # Home page
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky navbar — logo, links, cart/wishlist icons
│   │   └── Footer.tsx
│   ├── shop/
│   │   ├── page.tsx            # Product listing — search, filters, sort, pagination
│   │   ├── [slug]/page.tsx     # Product detail page
│   │   ├── loading.tsx         # Skeleton shown while route loads
│   │   └── error.tsx           # Error boundary for the route
│   ├── cart/page.tsx           # Cart — items, totals, checkout CTA
│   ├── wishlist/page.tsx       # Wishlist — 3 states (loading/empty/grid)
│   └── checkout/
│       ├── page.tsx            # Shipping + payment form
│       └── success/page.tsx    # Order confirmation
├── components/
│   ├── ui/                     # Shared design primitives (Button, etc.)
│   ├── product/                # ProductCard, ProductGrid, ProductDetails
│   ├── cart/                   # CartItemRow, CartSummary
│   ├── sections/               # Hero, Featured, Categories, etc.
│   ├── providers/
│   │   ├── CartProvider.tsx        # Cart context + localStorage persistence
│   │   └── WishlistProvider.tsx    # Wishlist context + localStorage persistence
│   ├── Searchbar.tsx
│   └── Pagination.tsx
└── lib/
    ├── types.ts
    └── products.ts             # Static product data (replaced by DB later)
```

---

## Concepts I Learned Building This

This is the meat of the README — a personal index of every front-end concept this project taught me, with where to find each one in the codebase.

### 1. Controlled Inputs

In React, an input is **controlled** when its value comes from state and its `onChange` writes back to that state. The component owns the value; the DOM is just a mirror.

```tsx
const [searchQuery, setSearchQuery] = useState("");

<input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />;
```

**Used in:** `Searchbar`, every form field in `/checkout`, price range inputs in the shop sidebar.

**Gotcha:** `e.target.value` is always a string — even from `<input type="number">`. Wrap with `Number(...)` before using it for math or comparisons.

---

### 2. Lifting State Up

When two components need to share or react to the same state, that state lives in their **common parent**, not in either child.

For example, `Searchbar` doesn't own the search query. The shop page owns `searchQuery` and passes:

- `value={searchQuery}` down to the searchbar
- `onChange={setSearchQuery}` down so the searchbar can write to it

This makes `Searchbar` a **dumb component** — it just renders and reports events. The smart parent decides what to do with them.

**Used in:** `Searchbar` → `ShopPage`, all filter buttons → `ShopPage`.

---

### 3. Debouncing

Running a filter (or API call) on every keystroke is wasteful. **Debouncing** waits for the user to pause typing before reacting.

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery);
    setCurrentPage(1);
  }, 400);

  return () => clearTimeout(timer);
}, [searchQuery]);
```

How it works: every time `searchQuery` changes, a new timer is set for 400ms. If another keystroke arrives before then, the cleanup function (`clearTimeout`) cancels the pending one. Only when the user _stops_ typing for 400ms does `setDebouncedQuery` actually fire.

**Used in:** `ShopPage` for filtering by search term.

---

### 4. The Universal Filter Pattern

Every filter follows the same three-part shape:

1. **State** — `useState` to track the current value
2. **UI** — a control that calls the state setter
3. **Logic** — a `.filter()` call that uses the state

```tsx
const filtered = products
  .filter((p) => p.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
  .filter((p) =>
    selectedCategory === "All" ? true : p.category === selectedCategory,
  )
  .filter((p) => p.price >= minPrice && p.price <= maxPrice)
  .filter((p) => p.rating >= minRating);
```

Once you internalize this, **any filter is easy** — brand, color, in-stock-only, anything.

**Used in:** `ShopPage` — four chained filters.

---

### 5. Sorting Without Mutation

`Array.prototype.sort()` mutates the array in place — calling it on `filteredProducts` would secretly modify the source array and cause weird re-render bugs.

**Always sort a copy:**

```tsx
const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortBy === "price-asc") return a.price - b.price;
  if (sortBy === "price-desc") return b.price - a.price;
  if (sortBy === "rating") return b.rating - a.rating;
  return 0;
});
```

The comparator must return negative (a first), positive (b first), or 0 (equal).

**Used in:** `ShopPage` sort dropdown.

---

### 6. Pagination

Slice the visible array based on the current page:

```tsx
const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedProducts = sortedProducts.slice(
  startIndex,
  startIndex + itemsPerPage,
);
```

**Rule of thumb:** any state change that shrinks or reorders the list must reset `currentPage` to 1, otherwise the user may be stranded on an empty page.

```tsx
useEffect(() => {
  setCurrentPage(1);
}, [selectedCategory, minPrice, maxPrice, minRating, sortBy]);
```

**Used in:** `ShopPage`.

---

### 7. React Context for Global State

When state needs to be accessible from many components at different depths (e.g., cart accessible from product cards, navbar, cart page, checkout), **Context** is the answer.

Pattern:

1. `createContext()` with the shape of what you'll provide
2. A **Provider component** owns the state and provides it via the context
3. A custom hook (`useCart`, `useWishlist`) wraps `useContext` and throws if used outside the provider

```tsx
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }) {
  const [entries, setEntries] = useState<CartEntry[]>([]);
  // ... actions like addToCart, removeFromCart ...
  return (
    <CartContext.Provider value={{ items, addToCart, ... }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider.");
  return context;
}
```

**Used in:** `CartProvider`, `WishlistProvider`.

---

### 8. LocalStorage Persistence in a Provider

To make cart/wishlist survive page refreshes, persist via `window.localStorage` inside the provider:

- **Load on mount** — `useEffect` with empty deps reads from localStorage and seeds the state.
- **Save on change** — second `useEffect` watches the state and writes to localStorage whenever it changes.
- **`isLoaded` flag** prevents writing to localStorage before the initial read (which would erase saved data on first render).

```tsx
useEffect(() => {
  const stored = window.localStorage.getItem(KEY);
  if (stored) setEntries(JSON.parse(stored));
  setIsLoaded(true);
}, []);

useEffect(() => {
  if (!isLoaded) return;
  window.localStorage.setItem(KEY, JSON.stringify(entries));
}, [entries, isLoaded]);
```

**Used in:** `CartProvider`, `WishlistProvider`.

---

### 9. Side Effects Belong in Event Handlers

A side effect (toast, navigation, analytics) should fire **inside the function that runs because the user did something** — not at the top level of a component (where it fires on every render) and not inside a `setState` updater (where it can fire twice in StrictMode).

```tsx
// ✗ Wrong — fires on every render
toast.success("Hello");

// ✗ Wrong — runs inside React's setState updater
setEntries((current) => {
  toast.success("...");
  return current;
});

// ✓ Right — fires when user clicks
const addToCart = (product) => {
  setEntries((current) => [...current, product]);
  toast.success(`${product.name} added to cart`);
};
```

**Rule:** if `toast.x(...)` isn't inside curly braces of an event handler / action function, you're doing it wrong.

---

### 10. Conditional Rendering with Early Returns

Pages with multiple states (loading / empty / has-data) are clearer with **sequential early returns** than with nested ternaries:

```tsx
if (!isLoaded) return <LoadingUI />;
if (items.length === 0) return <EmptyUI />;
return <GridUI />;
```

**Used in:** `cart/page.tsx`, `wishlist/page.tsx`, `checkout/page.tsx` (empty-cart guard).

---

### 11. Destructuring Rename

When two contexts expose the same property name, rename one inline:

```tsx
const { itemCount: cartCount } = useCart();
const { itemCount: wishlistCount } = useWishlist();
```

The `: newName` syntax pulls a value out under a different name in the same statement.

**Used in:** `Navbar.tsx`.

---

### 12. Programmatic Navigation (Next.js App Router)

When you need to navigate from inside a function (e.g. after form submission), use the `useRouter` hook from `next/navigation`:

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/checkout/success"); // adds to history
router.replace("/shop"); // doesn't add to history (good for guards)
```

For declarative navigation in JSX, prefer `<Link href="...">`.

**Used in:** `checkout/page.tsx` (submit + empty-cart guard).

---

### 13. Form Submission

A `<form>` with an `onSubmit` handler — **always call `e.preventDefault()`** to stop the browser's default behavior (full-page POST/reload).

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  clearCart();
  router.push("/checkout/success");
};

<form onSubmit={handleSubmit}>...</form>;
```

**Used in:** `checkout/page.tsx`.

---

### 14. Next.js Loading & Error Boundaries

In the App Router, special files named `loading.tsx` and `error.tsx` automatically wrap their route segment:

- `loading.tsx` — rendered while the route is suspending
- `error.tsx` — rendered if the route throws an error. **Must be a client component**, receives `error` and `reset` props (calling `reset()` re-attempts the route)

```tsx
"use client";

const ShopError = ({ error, reset }: { error: Error; reset: () => void }) => (
  <button onClick={reset}>Try Again</button>
);
```

**Used in:** `shop/loading.tsx`, `shop/error.tsx`.

---

### 15. Skeleton Loading Screens

A skeleton mimics the **shape** of the loaded UI with pulsing placeholders, instead of a generic spinner. This reduces layout shift when content arrives and feels faster.

Tailwind's `animate-pulse` + gray blocks does the job:

```tsx
<div className="h-48 w-full animate-pulse bg-muted" />
```

**Used in:** `shop/loading.tsx`.

---

### 16. CSS Grid for Layout (Tailwind)

For a fixed sidebar + flexible main column:

```tsx
<div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
  <aside>...</aside>
  <div>...</div>
</div>
```

- `grid-cols-1` on mobile = stacked
- `lg:grid-cols-[260px_1fr]` on desktop = 260px sidebar + remaining space

For a "X on the left, Y on the right" row, use flexbox `justify-between`:

```tsx
<div className="flex justify-between">
  <p>Showing 1-8 of 24</p>
  <select>...</select>
</div>
```

**Used in:** `shop/page.tsx` layout, sort/results-count row.

---

### 17. Sticky Sidebars

Make a sidebar stay visible as the user scrolls product results:

```tsx
<aside className="lg:sticky lg:top-20 lg:self-start">
```

- `sticky` + `top-20` — stick 80px below the top of the viewport
- `self-start` — prevent the sidebar from stretching to match the grid's height (grid items stretch by default)

**Used in:** `shop/page.tsx` filter sidebar.

---

### 18. Constants Outside Components

Constants that never change should live **outside the component**, not inside. Inside the component, they're recreated on every render:

```tsx
// ✓ Good — defined once at module load
const CATEGORIES = ["All", "Laptops", "Audio", ...];

export default function ShopPage() {
  // state goes here
}

// ✗ Wasteful — recreated every render
export default function ShopPage() {
  const CATEGORIES = ["All", ...];
}
```

---

## Scripts

```bash
pnpm dev      # start dev server
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # lint with ESLint
```

---

## Roadmap

- [ ] Real database (Supabase already in deps — not wired yet)
- [ ] Authentication / user accounts
- [ ] Real payment processing (Stripe)
- [ ] Search history / autocomplete
- [ ] URL-synced filters (`?category=audio&sort=price-asc`)
- [ ] Breadcrumbs on product detail pages
- [ ] Branded 404 page

---

## License

MIT
