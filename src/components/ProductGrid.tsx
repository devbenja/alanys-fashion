"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  bgColorClass?: string;
}

export default function ProductGrid({ title, products, bgColorClass = "bg-zinc-950" }: ProductGridProps) {
  const { addToCart } = useCart();

  return (
    <section className={`${bgColorClass} py-24`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
            {title}
          </h2>
        </div>

        {/* 2-col Zig-Zag Grid for Desktop (DESIGN_VARIANCE=8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`group flex flex-col ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              {/* Product Image Card */}
              <Link 
                href={`/producto/${product.id}`} 
                className="relative block w-full aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 spotlight-card mb-6"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating actions */}
                <button 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur flex items-center justify-center text-zinc-400 border border-zinc-700/50 hover:bg-zinc-800 hover:text-amber-500 hover:border-amber-500/50 transition-all z-10 btn-press opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation();
                  }}
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} strokeWidth={2} />
                </button>
              </Link>

              {/* Product Info */}
              <div className="flex flex-col gap-3 px-2">
                <div className="flex items-start justify-between gap-4">
                  <Link href={`/producto/${product.id}`} className="group-hover:opacity-80 transition-opacity">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1.5">
                      New Arrival
                    </p>
                    <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-amber-500 font-mono font-bold text-lg shrink-0">
                    {product.price}
                  </p>
                </div>

                {/* Add to cart trigger */}
                <button 
                  className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-800 hover:bg-amber-600 text-zinc-300 hover:text-zinc-950 rounded-lg font-bold text-sm transition-colors duration-200 btn-press"
                  onClick={(e) => { 
                    e.preventDefault(); 
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    });
                  }}
                >
                  <ShoppingBag size={16} strokeWidth={2} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
