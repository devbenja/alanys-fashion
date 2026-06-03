"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categoriesApi } from '@/lib/api';

const MOCK_CATEGORIES = [
  { id: '1', name: 'Essentials', imageUrl: 'https://picsum.photos/seed/kova-essentials/600/800' },
  { id: '2', name: 'Outerwear', imageUrl: 'https://picsum.photos/seed/kova-outerwear/600/800' },
  { id: '3', name: 'Footwear', imageUrl: 'https://picsum.photos/seed/kova-footwear/600/800' },
  { id: '4', name: 'Accessories', imageUrl: 'https://picsum.photos/seed/kova-accessories/600/800' },
];

function getCategoryImage(name: string): string {
  const seed = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `https://picsum.photos/seed/kova-${seed}/600/800`;
}

interface DisplayCategory {
  id: string;
  name: string;
  imageUrl: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<DisplayCategory[]>(MOCK_CATEGORIES);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        if (response.success && response.data && response.data.length > 0) {
          const mapped = response.data.map((cat) => ({
            id: cat.id,
            name: cat.name,
            imageUrl: getCategoryImage(cat.name),
          }));
          setCategories(mapped);
        }
      } catch (error) {
        console.error('Failed to load categories, using mocks', error);
      }
    };
    
    loadCategories();
  }, []);

  return (
    <section className="bg-zinc-950 py-24 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-zinc-700" />
              <span className="text-xs font-bold text-zinc-400 tracking-[0.2em] uppercase">
                Explore
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">
              Shop by Category
            </h2>
          </div>
          <Link 
            href="/catalogo" 
            className="group flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-amber-500 transition-colors"
          >
            View all collections 
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Accordion Image Slider (Hover expands) */}
        <div className="flex flex-col md:flex-row h-[600px] gap-2 md:gap-1 w-full">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/catalogo?categoria=${category.name.toLowerCase()}`}
              className="group relative flex-1 min-h-[100px] overflow-hidden rounded-xl md:rounded-none md:first:rounded-l-2xl md:last:rounded-r-2xl hover:flex-[2] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Active indicator line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-end justify-between">
                <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {category.name}
                </h3>
                
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <ArrowRight size={18} className="text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
