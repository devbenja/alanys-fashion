"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ordersApi, Order, getOrderStatusInfo } from '@/lib/api';

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

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 min-h-screen">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-primary tracking-tight mb-2">Mis Pedidos</h1>
          <p className="text-on-surface-variant font-medium">Lleva el control de todos tus caprichos y sorpresas.</p>
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center text-on-surface-variant gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="font-bold">Cargando tus pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-32 text-center bg-surface-container-lowest rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-5xl text-outline mb-4" style={{ fontVariationSettings: '"FILL" 0' }}>
              receipt_long
            </span>
            <h2 className="text-2xl font-black text-on-surface mb-2">No tienes pedidos aún</h2>
            <p className="text-on-surface-variant mb-6 font-medium">Cuando realices tu primera compra, aparecerá aquí.</p>
            <Link href="/catalogo" className="inline-block bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all">
              Ir a Comprar
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => {
              const statusInfo = getOrderStatusInfo(order.orderStatus);
              const itemCount = order.items.length;
              const itemNames = order.items.map(i => i.product.name).join(', ');
              const mainImage = order.items[0]?.product.images[0]?.imageUrl;

              return (
                <div key={order.id} className="bg-surface-container-lowest p-6 rounded-lg shadow-md border-2 border-transparent hover:border-primary-container transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-primary-fixed">
                        {mainImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="w-full h-full object-cover"
                            alt={order.items[0]?.product.name}
                            src={mainImage}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">shopping_bag</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-secondary uppercase tracking-wider">Pedido #{order.orderNumber}</p>
                        <p className="text-on-surface-variant text-sm">
                          Realizado el {new Date(order.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-sm ${statusInfo.color}`}>
                        <span className="material-symbols-outlined text-sm">
                          {order.orderStatus === 'paid' || order.orderStatus === 'delivered' ? 'check_circle' :
                           order.orderStatus === 'cancelled' ? 'cancel' :
                           order.orderStatus === 'processing' ? 'local_shipping' : 'schedule'}
                        </span>
                        {statusInfo.label}
                      </div>
                      <p className="text-xl font-black text-primary">${parseFloat(order.total).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-surface-variant">
                    <div className="text-sm font-medium text-on-surface-variant">
                      {itemCount} {itemCount === 1 ? 'Artículo' : 'Artículos'}: {itemNames}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/seguimiento?order=${order.id}`}
                        className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-sm"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        Ver Detalle
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
