"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ordersApi, Order, getOrderStatusInfo } from '@/lib/api';
import { ArrowLeft, SearchX, Package, CheckCircle2, ShoppingBag, Truck, Receipt } from 'lucide-react';

function SeguimientoContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const load = async () => {
      const res = await ordersApi.getById(orderId);
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };
    load();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-8 h-8 border-2 border-zinc-800 border-t-amber-600 rounded-full animate-spin" />
        <p className="font-bold text-zinc-500">Loading order details...</p>
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="py-32 text-center bg-zinc-900/30 rounded-2xl border border-zinc-800 border-dashed max-w-2xl mx-auto">
        <SearchX size={48} className="mx-auto text-zinc-700 mb-6" strokeWidth={1} />
        <h2 className="text-2xl font-black text-white mb-2">Order Not Found</h2>
        <p className="text-zinc-500 mb-8 max-w-sm mx-auto">The order you're looking for doesn't exist or you don't have access to it.</p>
        <Link href="/mis-pedidos" className="inline-flex items-center justify-center bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-4 rounded-lg font-bold text-sm transition-colors btn-press">
          Back to Orders
        </Link>
      </div>
    );
  }

  const statusInfo = getOrderStatusInfo(order.orderStatus);
  const paymentInfo = getOrderStatusInfo(order.paymentStatus);

  return (
    <>
      <div className="mb-8">
        <Link href="/mis-pedidos" className="text-zinc-400 font-bold flex items-center gap-2 hover:text-white transition-colors w-fit mb-6">
          <ArrowLeft size={16} />
          Back to Orders
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
              Order <span className="text-amber-500">#{order.orderNumber}</span>
            </h1>
            <p className="text-zinc-400 font-medium">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg font-bold text-xs uppercase tracking-widest text-white`}>
            <span className="text-amber-500"><Truck size={16} /></span>
            {statusInfo.label}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Tracking Timeline */}
          {order.tracking.length > 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-lg font-black text-white mb-8">Tracking Status</h3>
              <div className="space-y-6">
                {order.tracking.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        i === 0 ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-zinc-700 bg-zinc-950 text-zinc-600'
                      }`}>
                        <CheckCircle2 size={16} />
                      </div>
                      {i < order.tracking.length - 1 && (
                        <div className="w-0.5 flex-1 bg-zinc-800 mt-2 mb-2" />
                      )}
                    </div>
                    <div className="pb-6 pt-1">
                      <p className="font-bold text-white">{getOrderStatusInfo(step.status).label}</p>
                      <p className="text-sm text-zinc-400 mt-1">{step.description}</p>
                      <p className="text-xs text-zinc-600 mt-2 font-mono">
                        {new Date(step.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-lg font-black text-white mb-6">Items Purchased</h3>
            <div className="divide-y divide-zinc-800">
              {order.items.map((item) => {
                const mainImage = item.product.images[0]?.imageUrl;
                return (
                  <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex items-center gap-6 group">
                    <div className="relative w-20 h-24 sm:w-24 sm:h-32 rounded-lg overflow-hidden bg-zinc-950 flex-shrink-0 border border-zinc-800">
                      {mainImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          alt={item.product.name}
                          src={mainImage}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700">
                          <Package size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow flex justify-between gap-4">
                      <div>
                        <p className="font-bold text-lg text-white mb-1 group-hover:text-amber-500 transition-colors">{item.product.name}</p>
                        <p className="text-sm text-zinc-500 font-medium">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-lg text-white">${parseFloat(item.subtotal).toFixed(2)}</p>
                        <p className="text-xs text-zinc-600 font-mono mt-1">${parseFloat(item.unitPrice).toFixed(2)} ea</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Subtotal</span>
                <span className="font-mono text-white">${parseFloat(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Shipping</span>
                <span className="font-mono text-white">${parseFloat(order.shippingCost).toFixed(2)}</span>
              </div>
              <div className="pt-4 flex justify-between items-end border-t border-zinc-800">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Total</span>
                <span className="text-2xl font-mono font-black text-amber-500">${parseFloat(order.total).toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
              <div className="mb-3">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Payment Status</p>
                <p className="text-white text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-500" />
                  {paymentInfo.label}
                </p>
              </div>
              {order.payments && order.payments.length > 0 && (
                <div className="pt-3 border-t border-zinc-800">
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Transaction ID</p>
                  <p className="text-xs font-mono text-zinc-400 truncate">{order.payments[0].providerPaymentId}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Need help?</h4>
            <div className="space-y-3">
              <Link href="/mis-pedidos" className="w-full py-3 px-4 bg-zinc-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-700 transition-all btn-press">
                <Receipt size={14} />
                All Orders
              </Link>
              <Link href="/catalogo" className="w-full py-3 px-4 border border-zinc-700 text-zinc-300 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 hover:text-white transition-all btn-press">
                <ShoppingBag size={14} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SeguimientoPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-600/30 selection:text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 min-h-[100dvh]">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-8 h-8 border-2 border-zinc-800 border-t-amber-600 rounded-full animate-spin" />
            <p className="font-bold text-zinc-500">Loading...</p>
          </div>
        }>
          <SeguimientoContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
