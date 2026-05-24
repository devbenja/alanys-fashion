"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CarritoPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-2">Tu Carrito de Compras</h1>
          <p className="text-on-surface-variant font-medium">¡Estás a un paso de hacer brillar tu estilo!</p>
        </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Items Section */}
        <div className="lg:col-span-8 space-y-6">
          {cartItems.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-lg p-12 text-center shadow-[0_8px_30px_rgb(224,64,160,0.08)] border border-outline-variant">
              <span className="material-symbols-outlined text-6xl text-primary mb-4">shopping_bag</span>
              <h2 className="text-2xl font-bold text-on-surface mb-2">Tu carrito está vacío</h2>
              <p className="text-on-surface-variant mb-6">Parece que aún no has agregado nada. ¡Descubre nuestras colecciones!</p>
              <Link href="/" className="inline-block bg-primary text-on-primary px-8 py-3 rounded-lg font-bold candy-shadow-primary hover:scale-105 transition-all">
                Ir a Comprar
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="bg-surface-container-lowest rounded-lg p-6 shadow-[0_8px_30px_rgb(224,64,160,0.08)] flex items-center gap-6 bouncy-hover border border-outline-variant">
                <div className="relative h-24 w-24 flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="h-full w-full object-cover rounded-lg"
                    sizes="96px"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-on-surface">{item.name}</h3>
                      <p className="text-secondary font-medium">Edición Limitada</p>
                    </div>
                    <span className="text-xl font-black text-primary">{item.price}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center bg-surface-container-high rounded-lg px-4 py-1 gap-4">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-primary hover:scale-125 transition-transform"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="font-bold text-on-surface">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-primary hover:scale-125 transition-transform"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-error flex items-center gap-1 text-sm font-bold opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Section */}
        {cartItems.length > 0 && (
          <div className="lg:col-span-4">
            <div className="bg-surface-container-low rounded-lg p-8 sticky top-32 shadow-[0_20px_50px_rgba(124,82,170,0.1)] border border-white">
              <h2 className="text-2xl font-black text-on-surface mb-6">Resumen</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-on-surface-variant font-medium">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant font-medium">
                  <span>Envío</span>
                  <span className="text-tertiary">¡Gratis!</span>
                </div>
                <div className="flex justify-between text-on-surface-variant font-medium">
                  <span>Descuento Candy</span>
                  <span className="text-primary bg-primary-container px-2 rounded-lg">-$0.00</span>
                </div>
                
                <div className="pt-4 border-t border-outline-variant flex justify-between items-end">
                  <span className="text-xl font-bold text-on-surface">Total</span>
                  <span className="text-3xl font-black text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-primary-container text-on-primary-container py-4 rounded-lg font-black text-lg shadow-[0_8px_20px_rgba(224,64,160,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2">
                  Finalizar Pedido
                  <span className="material-symbols-outlined">rocket_launch</span>
                </button>
                
                <button className="w-full bg-[#25D366] text-white py-4 rounded-lg font-black text-lg shadow-[0_8px_20px_rgba(37,211,102,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.513-2.961-2.628-.086-.115-.718-.954-.718-1.817 0-.863.454-1.287.614-1.46.16-.173.348-.217.465-.217h.354c.113 0 .262-.045.41.32.148.365.511 1.242.556 1.334.045.092.075.198.015.32s-.09.198-.18.305c-.09.106-.188.235-.269.317-.09.09-.185.188-.08.371.106.183.47 1.055 1.001 1.527.684.608 1.26.797 1.442.887.183.09.293.075.402-.045.109-.12.463-.538.586-.721.123-.183.246-.152.413-.09.167.062 1.065.502 1.25.594.185.092.308.138.354.217.045.078.045.454-.099.859zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.658 1.438 5.17L2 22l4.957-1.301C8.415 21.528 10.134 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.714 0-3.313-.483-4.668-1.314l-.335-.205-2.77.727.74-2.703-.226-.359C4.048 14.864 3.5 13.5 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z"></path>
                  </svg>
                  Pedir por WhatsApp
                </button>
              </div>
              
              <p className="mt-6 text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Pago 100% Seguro
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
    <Footer />
    </div>
  );
}
