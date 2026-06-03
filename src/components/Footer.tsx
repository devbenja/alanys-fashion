import Link from 'next/link';
import { Globe, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-black text-white tracking-tighter hover:text-amber-500 transition-colors">
              KOVA
            </Link>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              Curated drops. Honest prices. No noise. Wear what moves you.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors" aria-label="Website">
                <Globe size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors" aria-label="Email">
                <Mail size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors" aria-label="Phone">
                <Phone size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop Col */}
          <div>
            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-6">
              Shop
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/catalogo?categoria=essentials" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Essentials
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=outerwear" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Outerwear
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=footwear" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Footwear
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-sm text-amber-500 hover:text-amber-400 transition-colors">
                  Archive Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Col */}
          <div>
            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-6">
              Support
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/faq" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/envios" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-6">
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/privacidad" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} KOVA Collective. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 bg-zinc-900 rounded border border-zinc-800" />
            <div className="w-8 h-5 bg-zinc-900 rounded border border-zinc-800" />
            <div className="w-8 h-5 bg-zinc-900 rounded border border-zinc-800" />
          </div>
        </div>
      </div>
    </footer>
  );
}
