"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ordersApi, Order, getOrderStatusInfo } from '@/lib/api';
import { ArrowRight, Package, CheckCircle2, Clock, XCircle, Truck, PackageOpen } from 'lucide-react';

export default function MisPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await ordersApi.getAll();
      if (res.success && res.data) {
        setOrders(res.data);
      }
      setLoading(false);
    };
    load();
  }, []);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'paid': return <CheckCircle2 size={16} />;
      case 'delivered': return <PackageOpen size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      case 'processing': return <Truck size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-600/30">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 min-h-[100dvh]">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-zinc-700" />
            <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">
              Account
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">Order History</h1>
          <p className="text-zinc-400 font-light text-lg">Track, manage, and review your past purchases.</p>
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-600 rounded-full animate-spin" />
            <p className="text-zinc-500 text-sm font-medium">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-32 text-center bg-zinc-900/30 rounded-2xl border border-zinc-800 border-dashed">
            <Package size={48} className="mx-auto text-zinc-700 mb-6" strokeWidth={1} />
            <h2 className="text-2xl font-black text-white mb-3">No orders yet</h2>
            <p className="text-zinc-500 mb-8 font-light max-w-sm mx-auto">You haven't placed any orders. Discover our latest collection to get started.</p>
            <Link href="/catalogo" className="inline-flex items-center justify-center bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-4 rounded-lg font-bold text-sm transition-colors btn-press">
              Shop Collection
            </Link>
          </div>
        ) : (
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
            {/* Header row for larger screens */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-zinc-900 border-b border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <div className="col-span-5">Order Details</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>

            <div className="divide-y divide-zinc-800">
              {orders.map((order) => {
                const statusInfo = getOrderStatusInfo(order.orderStatus);
                const itemCount = order.items.length;
                const itemNames = order.items.map(i => i.product.name).join(', ');
                const mainImage = order.items[0]?.product.images[0]?.imageUrl;

                // Adjust color classes from the old system to new
                const isSuccess = order.orderStatus === 'paid' || order.orderStatus === 'delivered';
                const isError = order.orderStatus === 'cancelled';
                const statusColor = isSuccess ? 'text-amber-500 bg-amber-500/10' : 
                                    isError ? 'text-red-400 bg-red-400/10' : 
                                    'text-blue-400 bg-blue-400/10';

                return (
                  <div key={order.id} className="group p-6 md:px-8 hover:bg-zinc-900/50 transition-colors">
                    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center">
                      
                      {/* Product Preview & ID */}
                      <div className="md:col-span-5 flex items-center gap-4">
                        <div className="relative w-16 h-20 rounded bg-zinc-900 overflow-hidden flex-shrink-0 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                          {mainImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                              alt={order.items[0]?.product.name}
                              src={mainImage}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                              <Package size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white mb-1">#{order.orderNumber}</p>
                          <p className="text-zinc-500 text-xs line-clamp-1">
                            {itemCount} {itemCount === 1 ? 'item' : 'items'}: {itemNames}
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="md:col-span-2">
                        <span className="md:hidden text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Date</span>
                        <p className="text-zinc-400 text-sm">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="md:col-span-2">
                        <span className="md:hidden text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Status</span>
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold ${statusColor}`}>
                          {getStatusIcon(order.orderStatus)}
                          {statusInfo.label}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 md:text-right">
                        <span className="md:hidden text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Total</span>
                        <p className="text-base font-mono font-bold text-white">${parseFloat(order.total).toFixed(2)}</p>
                      </div>

                      {/* Action */}
                      <div className="md:col-span-1 flex justify-end mt-4 md:mt-0">
                        <Link
                          href={`/seguimiento?order=${order.id}`}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors btn-press"
                        >
                          View
                          <ArrowRight size={14} className="md:hidden" />
                        </Link>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
