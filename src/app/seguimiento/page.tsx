"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ordersApi, Order, getOrderStatusInfo } from '@/lib/api';

export default function SeguimientoPage() {
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
      <div className="min-h-screen bg-background text-on-surface">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="font-bold text-on-surface-variant">Cargando detalle del pedido...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="min-h-screen bg-background text-on-surface">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-5xl text-outline mb-4">search_off</span>
            <h2 className="text-2xl font-black text-on-surface mb-2">Pedido no encontrado</h2>
            <p className="text-on-surface-variant mb-6">El pedido que buscas no existe o no te pertenece.</p>
            <Link href="/mis-pedidos" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold inline-block">
              Volver a Mis Pedidos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusInfo = getOrderStatusInfo(order.orderStatus);
  const paymentInfo = getOrderStatusInfo(order.paymentStatus);

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20 min-h-screen">
        <div className="mb-8">
          <Link href="/mis-pedidos" className="text-primary font-bold flex items-center gap-1 hover:underline mb-4">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Volver a Mis Pedidos
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight mb-2">
                Pedido #{order.orderNumber}
              </h1>
              <p className="text-on-surface-variant font-medium">
                Realizado el {new Date(order.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm ${statusInfo.color}`}>
              <span className="material-symbols-outlined text-sm">{statusInfo.icon}</span>
              {statusInfo.label}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            {order.tracking.length > 0 && (
              <div className="bg-surface rounded-lg p-8 shadow-sm border border-primary-container">
                <h3 className="text-lg font-black text-on-surface mb-6">Estado del Pedido</h3>
                <div className="space-y-6">
                  {order.tracking.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
                          i === 0 ? 'bg-primary text-white' : 'bg-primary-container text-primary'
                        }`}>
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                            {i === 0 ? 'check' : 'radio_button_checked'}
                          </span>
                        </div>
                        {i < order.tracking.length - 1 && (
                          <div className="w-0.5 flex-1 bg-primary-container mt-1" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-bold text-on-surface">{getOrderStatusInfo(step.status).label}</p>
                        <p className="text-sm text-on-surface-variant">{step.description}</p>
                        <p className="text-xs text-outline mt-1">
                          {new Date(step.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-surface p-8 rounded-lg shadow-sm border border-primary-container">
              <h3 className="text-lg font-black text-on-surface mb-6">Productos</h3>
              <div className="space-y-6">
                {order.items.map((item) => {
                  const mainImage = item.product.images[0]?.imageUrl;
                  return (
                    <div key={item.id} className="flex items-center gap-4 group">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-primary-fixed flex-shrink-0 shadow-inner">
                        {mainImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            alt={item.product.name}
                            src={mainImage}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">shopping_bag</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-black text-lg text-on-surface">{item.product.name}</p>
                        <p className="text-sm text-on-surface-variant">Cantidad: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-xl text-primary">${parseFloat(item.subtotal).toFixed(2)}</p>
                        <p className="text-xs text-on-surface-variant">${parseFloat(item.unitPrice).toFixed(2)} c/u</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-primary text-white p-8 rounded-xl shadow-xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12">
                <span className="material-symbols-outlined text-[180px]">shopping_bag</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-black mb-6 border-b border-white/20 pb-4">Resumen</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-primary-container">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-black">${parseFloat(order.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary-container">
                    <span className="font-medium">Envío</span>
                    <span className="font-black">${parseFloat(order.shippingCost).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 flex justify-between items-center text-2xl font-black border-t border-white/30">
                    <span>Total</span>
                    <span>${parseFloat(order.total).toFixed(2)}</span>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 border border-white/20 space-y-3">
                  <div>
                    <p className="text-[10px] text-primary-container uppercase tracking-[0.2em] font-black">Pago</p>
                    <p className={`font-bold text-sm flex items-center gap-1.5 mt-1`}>
                      <span className="material-symbols-outlined text-sm">{paymentInfo.icon}</span>
                      {paymentInfo.label}
                    </p>
                  </div>
                  {order.payments && order.payments.length > 0 && (
                    <div className="pt-2 border-t border-white/20">
                      <p className="text-[10px] text-primary-container uppercase tracking-[0.2em] font-black">Transacción</p>
                      <p className="text-xs font-mono mt-1 truncate">{order.payments[0].providerPaymentId}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-surface p-6 rounded-xl shadow-sm border border-primary-container">
              <h4 className="text-xs font-black uppercase tracking-wider text-secondary mb-4">¿Necesitas ayuda?</h4>
              <div className="space-y-3">
                <Link href="/mis-pedidos" className="w-full py-3 px-4 bg-primary-container text-primary rounded-lg font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all text-sm">
                  <span className="material-symbols-outlined text-sm">receipt_long</span>
                  Todos mis pedidos
                </Link>
                <Link href="/catalogo" className="w-full py-3 px-4 border-2 border-outline-variant text-on-surface rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-container transition-all text-sm">
                  <span className="material-symbols-outlined text-sm">storefront</span>
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
