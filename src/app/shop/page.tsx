"use client"

import { products } from '@/lib/products';
import ProductGrid from '@/components/product/ProductGrid';
import Searchbar from '@/components/Searchbar';
import { useEffect, useState } from 'react';

export default function ShopPage() {
  //tracks the state of the search query in the browsert
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("")
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 400)
    return () => clearTimeout(timer);
  }  
    , [searchQuery]);
 const filteredProducts = products.filter((product) =>
   product.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
 );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop Products</h1>
      <Searchbar value={searchQuery} onChange={setSearchQuery} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

// Shop page handles debouncing, API calls, Filtering, Product state 