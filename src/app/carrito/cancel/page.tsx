"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ordersApi } from '@/lib/api';

export default function CheckoutCancelPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      ordersApi.cancel(sessionId);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 font-['DM_Sans']">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-error/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center bg-surface border border-outline-variant rounded-2xl p-12 shadow-2xl">

        {/* Cancel icon */}
        <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-error-container flex items-center justify-center shadow-lg">
          <span
            className="material-symbols-outlined text-error"
            style={{ fontSize: '3.5rem', fontVariationSettings: '"FILL" 1' }}
          >
            cancel
          </span>
        </div>

        <h1 className="text-4xl font-black text-on-surface tracking-tight mb-3">
          Pago Cancelado
        </h1>
        <p className="text-on-surface-variant font-medium text-lg mb-2">
          No te preocupes, tu carrito está a salvo y no se realizó ningún cobro.
        </p>
        <p className="text-sm text-outline font-medium mb-10">
          Puedes intentarlo de nuevo cuando estés lista. Tus artículos siguen esperándote.
        </p>

        {/* Info badge */}
        <div className="flex items-center justify-center gap-2 mb-10 p-3 bg-surface-container rounded-lg">
          <span className="material-symbols-outlined text-outline text-base">info</span>
          <p className="text-xs font-bold text-on-surface-variant">
            No se realizó ningún cargo a tu tarjeta.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/carrito"
            className="flex-1 py-3 px-6 bg-primary text-on-primary rounded-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">shopping_cart</span>
            Volver al Carrito
          </Link>
          <Link
            href="/catalogo"
            className="flex-1 py-3 px-6 border-2 border-outline-variant text-on-surface rounded-lg font-bold hover:bg-surface-container hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
