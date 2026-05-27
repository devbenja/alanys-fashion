"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-md font-['DM_Sans'] font-medium tracking-tight shadow-sm">
      <div className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between">
        
        {/* Brand and Primary Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-primary tracking-tighter hover:scale-[1.01] transition-transform">
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

        {/* Secondary Icons and User Menu */}
        <div className="flex items-center gap-4 relative">
          <button className="p-2 text-primary active:scale-95 transition-transform duration-200 cursor-pointer">
            <span className="material-symbols-outlined">search</span>
          </button>
          
          <button className="p-2 text-primary active:scale-95 transition-transform duration-200 cursor-pointer">
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

          {/* Dynamic User Profile / Login Link */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-primary active:scale-95 transition-transform duration-200 flex items-center justify-center gap-1 cursor-pointer bg-primary-container text-on-primary-container rounded-lg font-bold text-xs"
                title={`Hola, ${user.firstName}`}
              >
                <span className="material-symbols-outlined text-lg">person</span>
                <span className="hidden sm:inline">{user.firstName}</span>
              </button>

              {/* Floating Profile Dropdown */}
              {isMenuOpen && (
                <>
                  {/* Backdrop overlay to close when clicking outside */}
                  <div 
                    onClick={() => setIsMenuOpen(false)} 
                    className="fixed inset-0 z-30 cursor-default"
                  />
                  <div className="absolute right-0 mt-3 w-56 bg-surface border border-outline-variant rounded-lg shadow-xl py-2 z-40 animate-fade-in font-['DM_Sans']">
                    <div className="px-4 py-2 border-b border-outline-variant">
                      <p className="text-xs font-bold text-outline uppercase tracking-wider">Mi Cuenta</p>
                      <p className="text-sm font-bold text-on-surface truncate">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      {user.role === 'admin' && (
                        <Link 
                          href="/admin" 
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-primary hover:bg-surface-container transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                          Panel Admin
                        </Link>
                      )}
                      
                      <Link 
                        href="/mi-perfil" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">account_circle</span>
                        Mi Perfil
                      </Link>

                      <Link 
                        href="/mis-pedidos" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">receipt_long</span>
                        Mis Pedidos
                      </Link>

                      <Link 
                        href="/seguimiento" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">local_shipping</span>
                        Seguimiento
                      </Link>
                    </div>

                    <div className="border-t border-outline-variant pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error-container hover:text-on-error-container font-bold text-left transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="p-2 text-primary active:scale-95 transition-transform duration-200" 
              title="Iniciar Sesión"
            >
              <span className="material-symbols-outlined">person</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
