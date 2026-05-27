"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart once the customer is redirected back from Stripe
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 font-['DM_Sans']">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center bg-surface border border-outline-variant rounded-2xl p-12 shadow-2xl">

        {/* Animated success circle */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
          <div className="relative w-28 h-28 rounded-full bg-primary-container flex items-center justify-center shadow-lg">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontSize: '3.5rem', fontVariationSettings: '"FILL" 1' }}
            >
              check_circle
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-black text-on-surface tracking-tight mb-3">
          ¡Pago Exitoso!
        </h1>
        <p className="text-on-surface-variant font-medium text-lg mb-2">
          Tu pedido ha sido confirmado y está siendo preparado con mucho cariño.
        </p>
        <p className="text-sm text-outline font-medium mb-10">
          Recibirás un correo de confirmación de Stripe con los detalles de tu transacción.
        </p>

        {/* Stripe badge */}
        <div className="flex items-center justify-center gap-2 mb-10 p-3 bg-surface-container rounded-lg">
          <span className="material-symbols-outlined text-primary text-base">lock</span>
          <p className="text-xs font-bold text-on-surface-variant">
            Pago procesado de forma segura por{' '}
            <span className="text-primary">Stripe</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/mis-pedidos"
            className="flex-1 py-3 px-6 bg-primary text-on-primary rounded-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">receipt_long</span>
            Ver Mis Pedidos
          </Link>
          <Link
            href="/catalogo"
            className="flex-1 py-3 px-6 border-2 border-outline-variant text-on-surface rounded-lg font-bold hover:bg-surface-container hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
