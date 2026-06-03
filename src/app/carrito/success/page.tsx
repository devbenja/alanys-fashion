"use client";

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ordersApi } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, Package, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();

  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const confirmOrder = async () => {
      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const res = await ordersApi.confirm(sessionId);
        if (res.success && res.data) {
          setOrderNumber(res.data.orderNumber);
          clearCart();
        } else {
          setError(res.message || 'Error confirming the order.');
        }
      } catch (err) {
        setError('Connection error with the server.');
      } finally {
        setLoading(false);
      }
    };

    confirmOrder();
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-32">
        <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative z-10 max-w-lg w-full text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-12 shadow-2xl mx-auto">
        <p className="text-red-400 font-bold mb-6">{error}</p>
        <button
          onClick={() => router.push('/carrito')}
          className="py-4 px-8 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold transition-all btn-press"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="relative z-10 max-w-lg w-full text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-12 shadow-2xl mx-auto mt-16 mb-16">
      <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-[0_0_60px_rgba(217,119,6,0.15)]">
        <CheckCircle2 className="text-amber-500 w-12 h-12" strokeWidth={1.5} />
      </div>

      <h1 className="text-4xl font-black text-white tracking-tight mb-3">
        Order Confirmed
      </h1>
      <p className="text-zinc-300 font-medium text-lg mb-2">
        Thank you for your purchase.
      </p>
      
      {orderNumber && (
        <p className="text-sm text-zinc-500 font-medium mb-10">
          Your order number is <span className="text-amber-500 font-mono font-bold ml-1">#{orderNumber}</span>
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <Link
          href="/mis-pedidos"
          className="flex-1 py-4 px-6 bg-amber-600 hover:bg-amber-700 text-zinc-950 rounded-lg font-bold transition-all flex items-center justify-center gap-2 btn-press"
        >
          <Package size={18} strokeWidth={2.5} />
          Track Order
        </Link>
        <Link
          href="/"
          className="flex-1 py-4 px-6 border-2 border-zinc-700 text-zinc-300 rounded-lg font-bold hover:border-zinc-500 hover:text-white transition-all flex items-center justify-center gap-2 btn-press"
        >
          Back to Store
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-600/30 selection:text-white">
      <Navbar />
      <main className="flex items-center justify-center px-6 min-h-[100dvh] pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />
        <Suspense fallback={
          <div className="w-full flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-600 rounded-full animate-spin" />
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
