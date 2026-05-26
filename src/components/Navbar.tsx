"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { setIsCartOpen, cartCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-md font-['DM_Sans'] font-medium tracking-tight shadow-sm">
      <div className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
            AlanysFashion
          </Link>
          <div className="hidden md:flex items-center gap-6 font-medium tracking-tight">
            <Link href="/novedades" className="text-on-surface-variant hover:scale-105 hover:text-primary transition-all duration-300 ease-out">New In</Link>
            <Link href="/catalogo" className="text-primary font-bold border-b-2 border-primary pb-1 hover:scale-105 hover:text-primary-fixed-dim transition-all duration-300 ease-out">Clothing</Link>
            <Link href="/zapatos" className="text-on-surface-variant hover:scale-105 hover:text-primary transition-all duration-300 ease-out">Shoes</Link>
            <Link href="/accesorios" className="text-on-surface-variant hover:scale-105 hover:text-primary transition-all duration-300 ease-out">Accessories</Link>
            <Link href="/sale" className="text-on-surface-variant hover:scale-105 hover:text-primary transition-all duration-300 ease-out">Sale</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-primary active:scale-95 transition-transform duration-200">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="p-2 text-primary active:scale-95 transition-transform duration-200">
            <span className="material-symbols-outlined">favorite</span>
          </button>
          <Link 
            href="/carrito"
            className="p-2 text-primary active:scale-95 transition-transform duration-200 relative"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
          <Link 
            href="/mis-pedidos"
            className="p-2 text-primary active:scale-95 transition-transform duration-200"
            title="Mis Pedidos"
          >
            <span className="material-symbols-outlined">receipt_long</span>
          </Link>
          <Link href="/login" className="p-2 text-primary active:scale-95 transition-transform duration-200" title="Perfil">
            <span className="material-symbols-outlined">person</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
