import Link from 'next/link';
import { Search, User, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-pink-500 tracking-tight">
              Alanys Fashion
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-900 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-gray-500 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
              Catálogo
            </Link>
            <Link href="/colecciones" className="text-gray-500 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
              Colecciones
            </Link>
            <Link href="/nosotros" className="text-gray-500 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
              Nosotros
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-gray-500 hover:text-pink-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/perfil" className="text-gray-500 hover:text-pink-500 transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/carrito" className="text-gray-500 hover:text-pink-500 transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
