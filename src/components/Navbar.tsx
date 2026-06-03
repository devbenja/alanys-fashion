"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Package,
  LogOut,
  Settings,
  ChevronDown,
  X,
  Menu,
  MapPin,
  Truck,
  ShieldCheck,
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    setIsMobileOpen(false);
    await logout();
    router.push('/');
  };

  const navLinks = [
    { label: 'New In', href: '/novedades' },
    { label: 'Clothing', href: '/catalogo' },
    { label: 'Shoes', href: '/zapatos' },
    { label: 'Accessories', href: '/accesorios' },
    { label: 'Sale', href: '/sale', accent: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 shadow-[0_1px_0_rgba(63,63,70,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="text-xl font-black text-white tracking-tighter hover:text-amber-500 transition-colors duration-200"
            >
              KOVA
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    link.accent
                      ? 'text-amber-500 hover:text-amber-400'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 relative">
            <button
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200 active:scale-95"
              aria-label="Buscar"
            >
              <Search size={18} strokeWidth={2} />
            </button>

            <button
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200 active:scale-95"
              aria-label="Favoritos"
            >
              <Heart size={18} strokeWidth={2} />
            </button>

            <Link
              href="/carrito"
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200 active:scale-95 relative"
              aria-label="Carrito"
            >
              <ShoppingBag size={18} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-zinc-950 text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/mis-pedidos"
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200 active:scale-95"
              title="Mis Pedidos"
            >
              <Package size={18} strokeWidth={2} />
            </Link>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative ml-1">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 rounded-lg text-zinc-300 hover:text-white transition-all duration-200 text-sm font-medium"
                >
                  <User size={15} strokeWidth={2} />
                  <span className="hidden sm:inline">{user.firstName}</span>
                  <ChevronDown
                    size={13}
                    strokeWidth={2}
                    className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isMenuOpen && (
                  <>
                    <div
                      onClick={() => setIsMenuOpen(false)}
                      className="fixed inset-0 z-30"
                    />
                    <div className="absolute right-0 mt-2 w-60 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 py-2 z-40 animate-scale-in">
                      <div className="px-4 py-3 border-b border-zinc-800">
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Cuenta</p>
                        <p className="text-sm font-semibold text-white truncate">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        {user.role === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-amber-500 hover:bg-zinc-800 transition-colors"
                          >
                            <ShieldCheck size={15} strokeWidth={2} />
                            Panel Admin
                          </Link>
                        )}
                        <Link
                          href="/mi-perfil"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          <User size={15} strokeWidth={2} />
                          Mi Perfil
                        </Link>
                        <Link
                          href="/mis-pedidos"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          <Package size={15} strokeWidth={2} />
                          Mis Pedidos
                        </Link>
                        <Link
                          href="/seguimiento"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          <Truck size={15} strokeWidth={2} />
                          Seguimiento
                        </Link>
                        <Link
                          href="#"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          <MapPin size={15} strokeWidth={2} />
                          Direcciones
                        </Link>
                        <Link
                          href="#"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          <Settings size={15} strokeWidth={2} />
                          Ajustes
                        </Link>
                      </div>

                      <div className="border-t border-zinc-800 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-zinc-800 text-left transition-colors"
                        >
                          <LogOut size={15} strokeWidth={2} />
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
                className="ml-1 flex items-center gap-2 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-zinc-950 rounded-lg text-sm font-bold transition-all duration-200 active:scale-95"
              >
                <User size={15} strokeWidth={2} />
                <span className="hidden sm:inline">Entrar</span>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden ml-1 p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Menu"
            >
              {isMobileOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-4 space-y-1 animate-fade-in-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`block px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  link.accent
                    ? 'text-amber-500 hover:bg-zinc-800'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
