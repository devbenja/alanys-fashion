"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

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

export default function ProductGrid({ title, products, bgColorClass = "bg-surface-container-highest" }: ProductGridProps) {
  const { addToCart } = useCart();

  return (
    <section className={`${bgColorClass} py-24 mb-32 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black tracking-tight text-on-surface mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-surface-container-lowest p-4 rounded-lg candy-shadow hover:scale-105 transition-all group block">
              <Link href={`/producto/${product.id}`} className="block relative overflow-hidden rounded-lg mb-4 aspect-[3/4]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors z-10"
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation();
                    /* Add to favorites logic here */ 
                  }}
                >
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </Link>
              <Link href={`/producto/${product.id}`} className="flex justify-between items-start mb-2 hover:opacity-80 transition-opacity">
                <div>
                  <p className="text-sm text-on-surface-variant font-bold uppercase tracking-widest text-left">Nuevo</p>
                  <h3 className="text-lg font-bold text-left text-on-surface">{product.name}</h3>
                </div>
                <p className="text-primary font-black text-xl">{product.price}</p>
              </Link>
              <button 
                className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-bold flex items-center justify-center gap-2 candy-shadow-primary active:scale-95 transition-transform"
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
                <span className="material-symbols-outlined">shopping_bag</span>
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
