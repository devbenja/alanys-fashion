"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { categoriesApi, productsApi, Category, Product } from '@/lib/api';

// Helper to provide premium images on the frontend dynamically as fallback
function getProductFallbackImage(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('vestido')) {
    return 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  if (n.includes('sueter') || n.includes('cachemira') || n.includes('knitwear')) {
    return 'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  if (n.includes('lino') || n.includes('trench') || n.includes('abrigo')) {
    return 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  return 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
}

const DEFAULT_FILTERS = [
  { id: '1', name: 'Vestidos' },
  { id: '2', name: 'Blusas' },
  { id: '3', name: 'Zapatos' },
  { id: '4', name: 'Accesorios' }
];

export default function Catalogo() {
  const searchParams = useSearchParams();
  const initialCategoryQuery = searchParams.get('categoria'); // Read from homepage click

  const { addToCart } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(250);

  // Load Categories & Products
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
          // Mock fallback
          loadedCategories = DEFAULT_FILTERS as any;
          setCategories(DEFAULT_FILTERS as any);
        }

        if (productsRes.success && productsRes.data) {
          setProducts(productsRes.data);
          
          // Pre-select category if redirected from homepage category card
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

  // Handle Dynamic Filtering
  useEffect(() => {
    let result = products;

    // Filter by Categories
    if (selectedCategoryIds.length > 0) {
      result = result.filter(prod => selectedCategoryIds.includes(prod.categoryId));
    }

    // Filter by Max Price Range
    result = result.filter(prod => parseFloat(prod.price as string) <= priceRange);

    setFilteredProducts(result);
  }, [selectedCategoryIds, priceRange, products]);

  // Toggle Category Checkbox Selection
  const handleCategoryToggle = (catId: string) => {
    if (selectedCategoryIds.includes(catId)) {
      setSelectedCategoryIds(prev => prev.filter(id => id !== catId));
    } else {
      setSelectedCategoryIds(prev => [...prev, catId]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tight leading-none mb-4">
            EXPLORA <br/><span className="text-secondary">LA COLECCIÓN</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg font-medium">Encuentra tus prendas favoritas en nuestro catálogo dinámico con imágenes optimizadas en Cloudinary.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 space-y-8 shrink-0">
            <div className="bg-surface p-8 rounded-lg shadow-sm border border-outline-variant">
              <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">tune</span> Filtros
              </h3>
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-on-surface-variant block mb-4">Categoría</span>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer group select-none">
                        <input 
                          type="checkbox"
                          checked={selectedCategoryIds.includes(cat.id)}
                          onChange={() => handleCategoryToggle(cat.id)}
                          className="w-5 h-5 rounded-lg border-2 border-outline checked:bg-primary checked:border-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer accent-primary" 
                        />
                        <span className="text-on-surface font-medium group-hover:text-primary transition-colors">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-on-surface-variant block mb-4">Precio Máximo</span>
                  <input 
                    type="range"
                    min="10"
                    max="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full accent-primary h-2 bg-surface-container rounded-lg appearance-none cursor-pointer" 
                  />
                  <div className="flex justify-between mt-2 text-sm font-bold text-secondary">
                    <span>$10</span>
                    <span>${priceRange} USD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-container p-6 rounded-lg shadow-inner flex items-center justify-center text-center relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-on-primary-container font-black text-xl leading-tight">ÚNETE AL CLUB<br/>OBTÉN 20% OFF</p>
                <button className="mt-4 px-6 py-2 bg-surface text-primary font-bold rounded-lg hover:shadow-lg transition-all active:scale-95 cursor-pointer">Suscribirme</button>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-on-primary-container/20 text-8xl group-hover:rotate-12 transition-transform">celebration</span>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-on-surface-variant font-medium">Mostrando <span className="text-on-surface font-bold">{filteredProducts.length} artículos</span></p>
            </div>

            {loading ? (
              <div className="py-32 flex flex-col items-center justify-center text-on-surface-variant gap-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="font-bold">Cargando colección de moda...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-32 text-center text-on-surface-variant bg-surface rounded-xl border border-outline-variant/60">
                <span className="material-symbols-outlined text-5xl text-outline mb-4">search_off</span>
                <h4 className="font-bold text-lg text-on-surface">No se encontraron productos</h4>
                <p className="text-sm mt-1">Prueba seleccionando otras categorías o aumentando el filtro de precio.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                  // Find main image or use fallback
                  const displayImage = product.images && product.images.length > 0
                    ? product.images.find(img => img.isMain)?.imageUrl || product.images[0].imageUrl
                    : getProductFallbackImage(product.name);

                  return (
                    <div key={product.id} className="group bg-surface rounded-lg p-4 shadow-sm border border-outline-variant flex flex-col bouncy-hover cursor-pointer relative">
                      <Link href={`/producto/${product.id}`} className="absolute inset-0 z-10">
                        <span className="sr-only">Ver {product.name}</span>
                      </Link>
                      
                      <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-surface-container">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          alt={product.name} 
                          src={displayImage} 
                        />
                        <button className="absolute top-4 right-4 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-on-primary transition-colors z-20">
                          <span className="material-symbols-outlined">favorite</span>
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-on-surface mb-1">{product.name}</h3>
                        <p className="text-on-surface-variant text-sm mb-4 font-medium line-clamp-2">{product.description}</p>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-2xl font-black text-secondary">
                            ${product.price}
                          </span>
                          <button 
                            className="px-6 py-2 bg-primary text-on-primary font-bold rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 z-20 relative cursor-pointer"
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
                            <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>add_shopping_cart</span>
                            Agregar
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
