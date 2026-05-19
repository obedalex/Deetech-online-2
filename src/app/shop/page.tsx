"use client";

import { products } from "@/lib/products";
import ProductGrid from "@/components/product/ProductGrid";
import Searchbar from "@/components/Searchbar";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";


 const CATEGORIES = [
   "All",
   "Laptops",
   "Audio",
   "Wearables",
   "Peripherals",
   "Tablets",
];

const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

  
const itemsPerPage = 8;
  
export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  // ── FIX: rating filter state — 0 means "show all"
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");


  const [selectedCategory, setSelectedCategory] = useState("All");



  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1); // reset page on new search
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ── FIX: only ONE reset useEffect — old duplicate (without sortBy) deleted
  // Reset to page 1 when any filter or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, minPrice, maxPrice, minRating, sortBy]);





  // Filter products
 const filteredProducts = products
   .filter((product) =>
     product.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
   )
   .filter((product) =>
     selectedCategory === "All" ? true : product.category === selectedCategory,
   )
   .filter((product) => product.price >= minPrice && product.price <= maxPrice)
   // ── FIX: rating filter — keep products whose rating >= minRating (0 lets everything through)
    .filter((product) => product.rating >= minRating);
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // "popularity" — keep original order
  });

  

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // ── PHASE E: results count math
  // totalResults — how many products survived all the filters
  // startResult — 1-based index of the first product on this page (0 when no results)
  // endResult — index of the last product on this page, capped at totalResults
  //   (so the last page never says "1-8 of 5")
  const totalResults = sortedProducts.length;
  const startResult = totalResults === 0 ? 0 : startIndex + 1;
  const endResult = Math.min(startIndex + itemsPerPage, totalResults);


  return (
    // ── Outer container (full-width, padded) — this is the page wrapper
    <div className="container mx-auto px-4 py-8">
      {/* Heading + Searchbar stay above the two-column layout, full width */}
      <h1 className="text-3xl font-bold mb-8">Shop Products</h1>

      <Searchbar value={searchQuery} onChange={setSearchQuery} />

      {/* ── PHASE A: two-column shell ──
          - grid-cols-1 (mobile): sidebar stacks above the grid
          - lg:grid-cols-[260px_1fr] (desktop): 260px sidebar + remaining space for products
          - gap-8 puts space between the columns
          NOTE: only sidebar + product area live inside this grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* LEFT COLUMN — sidebar placeholder
            - lg:sticky + top-20 keeps the filter visible as user scrolls products
            - self-start prevents the sidebar from stretching to match grid height */}
        {/* ── FIX: all filter cards now live INSIDE <aside> so the grid only has 2 children
            (sidebar + product column), keeping the two-column layout intact */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          {/* CATEGORY CARD */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="font-semibold text-foreground">Category</h2>
            <ul className="mt-3 flex flex-col gap-1">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left text-sm rounded px-2 py-1.5 transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── FIX: PRICE CARD moved INSIDE the aside (was a sibling of aside before) */}
          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <h2 className="font-semibold text-foreground">Price Range</h2>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                placeholder="Min"
                className="w-full rounded border border-border bg-background px-2 py-1 text-sm outline-none"
              />
              <span className="text-muted-foreground">—</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                placeholder="Max"
                className="w-full rounded border border-border bg-background px-2 py-1 text-sm outline-none"
              />
            </div>
          </div>

          {/* ── FIX: RATING CARD — same button-list pattern as category, just different data */}
          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <h2 className="font-semibold text-foreground">Customer Rating</h2>
            <ul className="mt-3 flex flex-col gap-1">
              {[0, 3, 4].map((rating) => {
                const isActive = minRating === rating;
                const label = rating === 0 ? "All ratings" : `${rating}★ & up`;
                return (
                  <li key={rating}>
                    <button
                      onClick={() => setMinRating(rating)}
                      className={`w-full text-left text-sm rounded px-2 py-1.5 transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* RIGHT COLUMN — product grid + pagination */}
        {/* ── FIX: removed extra nested <div>, deleted duplicate ProductGrid/Pagination,
            replaced broken <Pagination ... /> placeholder with real props */}
        <div>
          {/* ── PHASE E: sort bar now has results count on the LEFT and sort on the RIGHT
              - justify-between pushes the two children to opposite ends
              - the label + select are wrapped in an inner flex div to stay grouped */}
          <div className="mb-4 flex items-center justify-between gap-2">
            {/* Results count (left) */}
            <p className="text-sm text-muted-foreground">
              Showing {startResult}-{endResult} of {totalResults} items
            </p>

            {/* Sort dropdown (right) */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-muted-foreground">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded border border-border bg-background px-2 py-1 text-sm outline-none"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ProductGrid products={paginatedProducts} />

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
