# Supabase Integration Roadmap for Deetech

## 1. Goal

This document combines the recommended Supabase integration plan, backend structure, auth model, database design, UI additions, and the target wireframe for how Deetech should look once Supabase is integrated.

The goal is to evolve the current frontend-first Next.js storefront into a full-stack ecommerce-ready app with:

- Supabase Auth for user accounts
- Postgres for catalog, cart, profiles, and orders
- SSR-friendly auth/session handling in Next.js App Router
- Database-backed carts for signed-in users
- Product pages sourced from the database instead of local mock data
- Order history and account pages

---

## 2. Current State

The project already has a good frontend foundation:

- Product list and product detail route under `/shop/[slug]`
- Shared cart state in a client provider
- Cart UI and product details UI already exist
- Mock product data exists in `src/lib/products.ts`
- Basic Supabase browser client exists in `src/lib/supabase.ts`

That means the app is ready for backend integration, but not yet production-ready.

What is still missing:

- SSR-safe Supabase client structure
- Auth flow and protected account pages
- Real database schema and migrations
- RLS policies
- Server-side product fetching
- Database-backed cart
- Orders and order history
- Checkout flow

---

## 3. Recommended End State Wireframe

### 3.1 High-level user flow

```text
Visitor lands on homepage
  -> browses featured products / shop page
  -> clicks a product
  -> product detail page loads from database
  -> adds to cart

Guest flow:
  -> cart stored locally
  -> prompted to sign in at checkout

Authenticated flow:
  -> cart syncs to database
  -> proceeds to checkout
  -> order is created
  -> order appears in account order history
```

### 3.2 Recommended app flow with Supabase

```text
Home
  -> Featured / Deals / Shop grid
  -> click product
  -> /shop/[slug]
  -> ProductDetails page from Supabase
  -> Add to Cart
  -> CartProvider updates local or remote cart
  -> Navbar badge updates
  -> /cart
  -> /checkout
  -> create order
  -> /account/orders
```

### 3.3 Route wireframe

```text
src/app/
  layout.tsx
  template.tsx
  page.tsx

  shop/
    page.tsx
    [slug]/
      page.tsx

  cart/
    page.tsx

  checkout/
    page.tsx

  login/
    page.tsx

  sign-up/
    page.tsx

  forgot-password/
    page.tsx

  update-password/
    page.tsx

  account/
    page.tsx
    profile/
      page.tsx
    orders/
      page.tsx

  auth/
    callback/
      route.ts
```

### 3.4 Product detail page wireframe

```text
/shop/[slug]

---------------------------------------------------------
| Navbar                                                 |
---------------------------------------------------------
| Back to shop                                           |
|                                                        |
|  LEFT                              RIGHT               |
|  ----------------------            ------------------  |
|  Large product image               Product category    |
|  Badge on image                    Product name        |
|                                    Rating + reviews    |
|                                    Price + old price   |
|                                    Savings badge       |
|                                    Description         |
|                                    Stock + shipping    |
|                                    [Add to Cart] [♥]   |
|                                                        |
|                                    Specifications      |
|                                    [spec] [spec]       |
|                                    [spec] [spec]       |
|                                    [spec] [spec]       |
---------------------------------------------------------
| Footer                                                 |
---------------------------------------------------------
```

### 3.5 Cart page wireframe

```text
/cart

IF EMPTY:
---------------------------------------------------------
|                    [ShoppingBag icon]                 |
|                 Your cart is empty                    |
|          Add some products to get started             |
|               [Continue Shopping]                     |
---------------------------------------------------------

IF HAS ITEMS:
---------------------------------------------------------
| Continue Shopping                                     |
| Shopping Cart                                         |
---------------------------------------------------------
| LEFT: Cart Items                 | RIGHT: Summary     |
|                                  |                    |
| [item row]                       | Order Summary      |
| [item row]                       | Subtotal           |
| [item row]                       | Shipping           |
|                                  | Total              |
|                                  | [Proceed Checkout] |
---------------------------------------------------------
| Footer                                                  |
---------------------------------------------------------
```

### 3.6 Account area wireframe

```text
/account

---------------------------------------------------------
| Navbar                                                 |
---------------------------------------------------------
| Account Overview                                       |
|                                                        |
| [Profile summary]                                      |
| [Recent orders]                                        |
| [Saved addresses - later]                              |
| [Sign out]                                             |
---------------------------------------------------------

/account/orders

---------------------------------------------------------
| Order History                                          |
| [Order #1001] [status] [date] [total]                  |
| [Order #1002] [status] [date] [total]                  |
---------------------------------------------------------
```

---

## 4. Recommended Supabase Structure

### 4.1 Replace the current single client file

The current `src/lib/supabase.ts` is okay for quick client-only tests, but it is not the right final structure for App Router auth.

Recommended structure:

```text
src/lib/supabase/
  client.ts
  server.ts
  admin.ts

src/lib/
  database.types.ts

proxy.ts
supabase/
  migrations/
```

### 4.2 File responsibilities

#### `src/lib/supabase/client.ts`
Browser client used in client components.

Use for:
- client-side auth helpers
- cart sync triggers after login
- profile updates in client forms if needed

#### `src/lib/supabase/server.ts`
Server client used in:
- Server Components
- Route Handlers
- Server Actions

Use for:
- protected page loading
- product queries
- account/order queries
- auth session access on the server

#### `src/lib/supabase/admin.ts`
Server-only client using the service role key.

Use for:
- admin workflows
- protected backend-only mutations
- background syncing

Never expose this to the client.

#### `proxy.ts`
Session refresh middleware/proxy for App Router auth cookies.

Use for:
- session refresh
- keeping auth cookies in sync

---

## 5. Recommended Authentication Model

### 5.1 Start with email/password auth

Recommended first auth method:

- Email + password sign up
- Email + password sign in
- Password reset

Add Google or other OAuth providers later if needed.

### 5.2 Auth routes/pages to create

Visible pages:

- `/login`
- `/sign-up`
- `/forgot-password`
- `/update-password`
- `/account`
- `/account/profile`
- `/account/orders`
- `/checkout`

Non-visual auth route:

- `/auth/callback`

### 5.3 Auth page wireframe

```text
/login

---------------------------------------------------------
| Navbar                                                 |
---------------------------------------------------------
| Sign In                                                |
| [Email input]                                          |
| [Password input]                                       |
| [Sign In button]                                       |
| Forgot password?                                       |
| No account? Sign up                                    |
---------------------------------------------------------

/sign-up

---------------------------------------------------------
| Create Account                                         |
| [Email input]                                          |
| [Password input]                                       |
| [Confirm password]                                     |
| [Create Account button]                                |
---------------------------------------------------------
```

### 5.4 Auth responsibilities

Auth should control:

- Whether a user can have a persistent remote cart
- Whether a user can access `/account`
- Whether a user can view `/account/orders`
- Whether checkout can finalize an order

### 5.5 Best implementation approach

Use:

- Server Actions for sign in, sign up, sign out
- Server-side session reads for protected pages
- Callback route for email verification or OAuth completion

---

## 6. Recommended Database Schema

### 6.1 Tables

#### `profiles`

```text
id uuid primary key references auth.users(id)
display_name text
avatar_url text
created_at timestamptz
updated_at timestamptz
```

#### `products`

```text
id uuid primary key
slug text unique not null
name text not null
description text not null
category text not null
price_cents integer not null
compare_at_price_cents integer null
badge text null
rating numeric null
review_count integer not null default 0
image_path text not null
in_stock boolean not null default true
is_active boolean not null default true
created_at timestamptz
updated_at timestamptz
```

#### `product_specs`

```text
id uuid primary key
product_id uuid references products(id) on delete cascade
label text not null
value text not null
sort_order integer not null default 0
```

#### `carts`

```text
id uuid primary key
user_id uuid references auth.users(id) on delete cascade
status text not null default 'active'
created_at timestamptz
updated_at timestamptz
```

#### `cart_items`

```text
id uuid primary key
cart_id uuid references carts(id) on delete cascade
product_id uuid references products(id)
quantity integer not null check (quantity > 0)
unique(cart_id, product_id)
```

#### `orders`

```text
id uuid primary key
user_id uuid references auth.users(id)
status text not null
subtotal_cents integer not null
shipping_cents integer not null default 0
total_cents integer not null
shipping_address jsonb null
created_at timestamptz
```

#### `order_items`

```text
id uuid primary key
order_id uuid references orders(id) on delete cascade
product_id uuid null
product_name text not null
product_slug text null
unit_price_cents integer not null
quantity integer not null
line_total_cents integer not null
```

### 6.2 Optional later tables

- `wishlist_items`
- `addresses`
- `reviews`
- `inventory_movements`

---

## 7. Row Level Security Strategy

Enable RLS on all public-facing tables.

### Public read tables

- `products`
- `product_specs`

Policy approach:
- public can `select`
- only privileged backend/admin code can write

### User-owned tables

- `profiles`
- `carts`
- `cart_items`
- `orders`
- `order_items`

Policy approach:
- authenticated users can access only their own rows
- ownership should be tied to `auth.uid()`

### RLS rules to enforce

- a user can read/update only their own profile
- a user can read/write only their own active cart
- a user can read only their own orders
- anonymous users should not be able to mutate user-owned tables directly

---

## 8. Product Data Migration Strategy

### 8.1 Current state

Products currently live in `src/lib/products.ts`.

### 8.2 Target state

Move products into Supabase and keep the frontend reading from the database.

### 8.3 Recommended migration path

1. Create `products` and `product_specs` tables
2. Seed them using the current mock catalog
3. Generate TypeScript DB types
4. Replace `getProductBySlug` mock lookups with Supabase queries
5. Keep the UI components unchanged wherever possible

### 8.4 Product flow after migration

```text
ProductCard click
  -> /shop/[slug]
  -> Server page reads slug
  -> Supabase query for product by slug
  -> Supabase query for specs
  -> pass product into ProductDetails
```

---

## 9. Cart Strategy

### 9.1 Recommended approach

Use a hybrid cart model:

- guest cart in localStorage
- authenticated cart in Supabase

### 9.2 Why this is best

It gives:

- low-friction shopping before login
- persistent cart after login
- no forced sign-in just to browse or add items

### 9.3 Cart synchronization model

#### Guest user

- uses current `CartProvider` localStorage cart

#### On login

- fetch active cart from Supabase
- merge guest cart into DB cart
- clear local guest cart or mark it as synced

#### Signed-in user

- all cart changes read/write through Supabase-backed state

### 9.4 Cart provider future responsibility

The existing `CartProvider` should evolve into:

```text
CartProvider
  if guest:
    localStorage source

  if authenticated:
    Supabase-backed source

  API remains the same:
    addToCart
    removeFromCart
    updateQuantity
    clearCart
    itemCount
    subtotal
```

This keeps the UI components stable while swapping the data source under the hood.

---

## 10. Orders and Checkout

### 10.1 Checkout phase recommendation

Do not start with payments first.

Do this first:

1. Auth
2. Products in DB
3. DB-backed cart
4. Account pages
5. Order creation
6. Payments later

### 10.2 Minimal checkout page

Create `/checkout` as a real page even before payment integration.

Wireframe:

```text
/checkout

---------------------------------------------------------
| Checkout                                               |
---------------------------------------------------------
| Left: shipping form            | Right: order summary  |
| [name]                         | products subtotal     |
| [email]                        | shipping              |
| [address]                      | total                 |
| [city/state/zip]               | [Place Order]         |
---------------------------------------------------------
```

### 10.3 Order creation model

When checkout is submitted:

- create an `orders` row
- snapshot all cart items into `order_items`
- compute subtotal and total server-side
- clear active cart

Payments can come later with Stripe or another provider.

---

## 11. UI Pages To Add

### Required pages

- `/login`
- `/sign-up`
- `/forgot-password`
- `/update-password`
- `/account`
- `/account/profile`
- `/account/orders`
- `/checkout`
- `/auth/callback` route handler

### Optional later pages

- `/account/addresses`
- `/wishlist` backed by DB
- `/admin/products`
- `/admin/orders`

---

## 12. Recommended Repository Shape After Integration

```text
src/
  app/
    page.tsx
    layout.tsx
    template.tsx

    login/
      page.tsx
    sign-up/
      page.tsx
    forgot-password/
      page.tsx
    update-password/
      page.tsx

    auth/
      callback/
        route.ts

    shop/
      page.tsx
      [slug]/
        page.tsx

    cart/
      page.tsx

    checkout/
      page.tsx

    account/
      page.tsx
      profile/
        page.tsx
      orders/
        page.tsx

  components/
    auth/
      LoginForm.tsx
      SignUpForm.tsx
      ForgotPasswordForm.tsx
      UpdatePasswordForm.tsx

    account/
      AccountSummary.tsx
      OrdersTable.tsx
      ProfileForm.tsx

    cart/
      CartItemRow.tsx
      CartSummary.tsx

    providers/
      CartProvider.tsx

  lib/
    database.types.ts
    supabase/
      client.ts
      server.ts
      admin.ts

supabase/
  migrations/
  config.toml

proxy.ts
```

---

## 13. Implementation Phases

### Phase 1: Supabase foundation

- install `@supabase/ssr`
- replace current `src/lib/supabase.ts` with browser/server/admin clients
- add `proxy.ts`
- add env vars
- initialize Supabase CLI

### Phase 2: Database and migrations

- create migrations for products, specs, profiles, carts, cart_items, orders, order_items
- seed product data
- generate database TypeScript types

### Phase 3: Auth

- build login/sign-up/forgot-password/update-password
- add callback route
- add protected account page
- wire navbar account state

### Phase 4: Product backend integration

- replace mock product list and product detail fetches with Supabase queries
- preserve the current UI structure

### Phase 5: Cart backend integration

- keep guest localStorage cart
- add cart sync after login
- load cart from Supabase for authenticated users

### Phase 6: Orders and checkout

- add checkout page
- create orders from active cart
- add order history page

---

## 14. Environment Variables

Recommended env setup:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Notes:

- use public/publishable key in browser client
- use service role only in server-only code
- never expose service role to client components

---

## 15. Important Considerations

### Auth/session

- App Router needs SSR-aware auth handling
- use the Supabase SSR package, not only the raw browser client
- protected pages should verify auth server-side

### Security

- enable RLS everywhere appropriate
- do not trust client-calculated totals
- compute order totals server-side

### Data modeling

- use relational tables because this app is commerce-shaped
- keep order item snapshots so past orders remain historically accurate

### Caching

- product catalog pages can be cached selectively
- account/cart/order pages should not be statically cached

### Images

- keep current `/public` image assets initially
- move to Supabase Storage only when you need admin uploads or user uploads

### Guest cart

- keep it during migration
- merge into DB cart on login

### Email

- password reset and email verification need working email configuration
- custom SMTP should be configured for production

---

## 16. Best Practical Recommendation

For this project, the best path is:

- Supabase Auth
- Supabase Postgres
- App Router SSR auth with `@supabase/ssr`
- guest cart first, authenticated cart in DB
- products and specs in DB
- orders after cart is stable

This is the best fit because:

- your data is relational
- your UI already maps cleanly to product, cart, and order entities
- Supabase gives auth + DB + migrations in one platform
- it fits your existing Next.js stack naturally

---

## 17. Immediate Next Actions

If implementing from here, do this exact sequence:

1. Install `@supabase/ssr`
2. Replace `src/lib/supabase.ts` with `src/lib/supabase/client.ts`, `server.ts`, and `admin.ts`
3. Add `proxy.ts`
4. Initialize Supabase CLI and migrations
5. Create DB schema for products, product_specs, profiles, carts, cart_items, orders, order_items
6. Seed the current product catalog into the database
7. Generate `database.types.ts`
8. Build `/login`, `/sign-up`, `/forgot-password`, `/update-password`
9. Build `/auth/callback`
10. Build `/account`, `/account/profile`, `/account/orders`
11. Move product pages from mock data to Supabase queries
12. Migrate cart provider to hybrid guest/database behavior
13. Add `/checkout`
14. Add order creation and order history

---

## 18. Final Summary

You are ready to integrate Supabase now.

The best way to do it is not as a single giant rewrite, but as a layered migration:

- fix the Supabase client architecture first
- add auth and DB schema second
- move products next
- migrate cart after that
- add orders and checkout last

If you follow this roadmap, the current frontend work you already completed will carry over cleanly instead of being thrown away.
