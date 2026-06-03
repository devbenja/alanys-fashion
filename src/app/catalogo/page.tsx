"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { categoriesApi, productsApi, Category, Product } from '@/lib/api';
import { ShoppingBag, Heart, SlidersHorizontal, SearchX } from 'lucide-react';

function getProductFallbackImage(name: string): string {
  const seed = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `https://picsum.photos/seed/kova-prod-${seed}/600/800`;
}

const DEFAULT_FILTERS = [
  { id: '1', name: 'Essentials' },
  { id: '2', name: 'Outerwear' },
  { id: '3', name: 'Footwear' },
  { id: '4', name: 'Accessories' }
];

import { Suspense } from 'react';

function Catalogo() {
  const searchParams = useSearchParams();
  const initialCategoryQuery = searchParams.get('categoria');

  const { addToCart } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(500);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          categoriesApi.getAll(),
          productsApi.getAll()
        ]);

        let loadedCategories: Category[] = [];
        if (categoriesRes.success && categoriesRes.data) {
          loadedCategories = categoriesRes.data;
          setCategories(categoriesRes.data);
        } else {
          loadedCategories = DEFAULT_FILTERS as any;
          setCategories(DEFAULT_FILTERS as any);
        }

        if (productsRes.success && productsRes.data) {
          setProducts(productsRes.data);
          
          if (initialCategoryQuery) {
            const matchedCat = loadedCategories.find(
              c => c.name.toLowerCase() === initialCategoryQuery.toLowerCase()
            );
            if (matchedCat) {
              setSelectedCategoryIds([matchedCat.id]);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load catalog data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [initialCategoryQuery]);

  useEffect(() => {
    let result = products;

    if (selectedCategoryIds.length > 0) {
      result = result.filter(prod => selectedCategoryIds.includes(prod.categoryId));
    }

    result = result.filter(prod => parseFloat(prod.price as string) <= priceRange);

    setFilteredProducts(result);
  }, [selectedCategoryIds, priceRange, products]);

  const handleCategoryToggle = (catId: string) => {
    if (selectedCategoryIds.includes(catId)) {
      setSelectedCategoryIds(prev => prev.filter(id => id !== catId));
    } else {
      setSelectedCategoryIds(prev => [...prev, catId]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-600/30 selection:text-white">
      <Navbar />
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-[100dvh]">
        
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-zinc-700" />
            <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">
              Catalogue
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter leading-none">
            Shop <span className="text-zinc-600">Collection</span>
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-32 space-y-10">
              
              <div className="flex items-center gap-2 text-white pb-4 border-b border-zinc-900">
                <SlidersHorizontal size={18} strokeWidth={2} />
                <h3 className="font-bold text-sm tracking-wide">Filters</h3>
              </div>

              {/* Categories */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-4">Categories</span>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox"
                          checked={selectedCategoryIds.includes(cat.id)}
                          onChange={() => handleCategoryToggle(cat.id)}
                          className="peer appearance-none w-5 h-5 rounded border border-zinc-700 checked:bg-amber-600 checked:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all cursor-pointer" 
                        />
                        <svg className="absolute w-3 h-3 text-zinc-950 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-4">Max Price</span>
                <input 
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-amber-600 h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer outline-none" 
                />
                <div className="flex justify-between mt-3 text-xs font-bold text-zinc-400 font-mono">
                  <span>$10</span>
                  <span className="text-amber-500">${priceRange}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-1">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-900">
              <p className="text-sm text-zinc-500 font-medium">
                Showing <span className="text-white font-bold">{filteredProducts.length} results</span>
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="aspect-[3/4] rounded-xl animate-shimmer" />
                    <div className="h-5 w-2/3 rounded bg-zinc-900" />
                    <div className="h-4 w-1/3 rounded bg-zinc-900" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-32 flex flex-col items-center justify-center text-center border border-zinc-900 border-dashed rounded-2xl bg-zinc-950/50">
                <SearchX size={48} className="text-zinc-700 mb-4" strokeWidth={1} />
                <h4 className="font-bold text-xl text-white mb-2">No products found</h4>
                <p className="text-sm text-zinc-500 max-w-sm">Try adjusting your filters or search criteria to find what you're looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-16">
                {filteredProducts.map((product) => {
                  const displayImage = product.images && product.images.length > 0
                    ? product.images.find(img => img.isMain)?.imageUrl || product.images[0].imageUrl
                    : getProductFallbackImage(product.name);

                  return (
                    <div key={product.id} className="group flex flex-col">
                      <Link href={`/producto/${product.id}`} className="relative block aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 spotlight-card mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          alt={product.name} 
                          src={displayImage} 
                        />
                        <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <button 
                          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900/80 backdrop-blur flex items-center justify-center text-zinc-400 hover:text-amber-500 transition-colors z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                          aria-label="Add to wishlist"
                        >
                          <Heart size={16} strokeWidth={2} />
                        </button>
                      </Link>

                      <div className="flex flex-col flex-1 px-1">
                        <div className="flex justify-between items-start gap-3 mb-1">
                          <Link href={`/producto/${product.id}`}>
                            <h3 className="text-base font-bold text-white leading-snug group-hover:opacity-80 transition-opacity">{product.name}</h3>
                          </Link>
                          <span className="text-amber-500 font-mono font-bold text-sm shrink-0">
                            ${product.price}
                          </span>
                        </div>
                        <p className="text-zinc-500 text-xs font-medium line-clamp-1 mb-4">{product.description}</p>
                        
                        <div className="mt-auto">
                          <button 
                            className="w-full py-3 bg-zinc-900 hover:bg-amber-600 text-zinc-300 hover:text-zinc-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 btn-press"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: typeof product.price === 'string' ? product.price : product.price.toString(),
                                image: displayImage,
                              });
                            }}
                          >
                            <ShoppingBag size={14} strokeWidth={2.5} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-600 rounded-full animate-spin" />
      </div>
    }>
      <Catalogo />
    </Suspense>
  );
}
