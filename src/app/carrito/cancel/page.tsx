"use client";

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ordersApi } from '@/lib/api';
import { XCircle, ShoppingBag, Store } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function CancelContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      ordersApi.cancel(sessionId);
    }
  }, [searchParams]);

  return (
    <div className="relative z-10 max-w-lg w-full text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-12 shadow-2xl mx-auto">
      <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,0.15)]">
        <XCircle className="text-red-500 w-12 h-12" strokeWidth={1.5} />
      </div>

      <h1 className="text-4xl font-black text-white tracking-tight mb-3">
        Payment Cancelled
      </h1>
      <p className="text-zinc-300 font-medium text-lg mb-2">
        Don't worry, your cart is safe and no charges were made.
      </p>
      <p className="text-sm text-zinc-500 font-medium mb-10">
        You can try again whenever you're ready. Your items are still waiting for you.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/carrito"
          className="flex-1 py-4 px-6 bg-amber-600 hover:bg-amber-700 text-zinc-950 rounded-lg font-bold transition-all flex items-center justify-center gap-2 btn-press"
        >
          <ShoppingBag size={18} strokeWidth={2.5} />
          Return to Cart
        </Link>
        <Link
          href="/catalogo"
          className="flex-1 py-4 px-6 border-2 border-zinc-700 text-zinc-300 rounded-lg font-bold hover:border-zinc-500 hover:text-white transition-all flex items-center justify-center gap-2 btn-press"
        >
          <Store size={18} strokeWidth={2.5} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-600/30 selection:text-white">
      <Navbar />
      <main className="flex items-center justify-center px-6 min-h-[100dvh] pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
        <Suspense fallback={
          <div className="w-full flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-600 rounded-full animate-spin" />
          </div>
        }>
          <CancelContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
