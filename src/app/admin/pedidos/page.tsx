"use client";

import { useState, useEffect } from 'react';
import { adminOrdersApi, AdminOrder, OrderStats, getOrderStatusInfo } from '@/lib/api';

const STATUS_OPTIONS = [
  { value: '', label: 'Todos los Estados' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'processing', label: 'Procesando' },
  { value: 'paid', label: 'Pagado' },
  { value: 'cancelled', label: 'Cancelado' },
  { value: 'delivered', label: 'Entregado' },
];

const UPDATE_STATUS_OPTIONS = [
  { value: 'processing', label: 'Procesando' },
  { value: 'paid', label: 'Pagado' },
  { value: 'cancelled', label: 'Cancelado' },
  { value: 'delivered', label: 'Entregado' },
];

export default function GestionPedidosPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [stats, setStats] = useState<OrderStats>({ total: 0, processing: 0, paid: 0, delivered: 0, cancelled: 0, pending: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });

  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    adminOrdersApi.getStats().then(res => {
      if (res.success && res.data) setStats(res.data);
    });
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const res = await adminOrdersApi.getAll({ status: statusFilter || undefined, page, limit: 20 });

    console.log(res);
    
    if (res.success && res.data) {
      setOrders(res.data);
      if (res.meta) setMeta({ total: res.meta.total, pages: res.meta.pages });
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  useEffect(() => {
    loadOrders();
  }, [statusFilter, page]);

  const openDetail = async (order: AdminOrder) => {
    setDetailLoading(true);
    setDetailOpen(true);
    const res = await adminOrdersApi.getById(order.id);
    if (res.success && res.data) {
      setSelectedOrder(res.data as AdminOrder);
    } else {
      setSelectedOrder(order);
    }
    setDetailLoading(false);
  };

  const updateStatus = async (status: string) => {
    if (!selectedOrder) return;
    const res = await adminOrdersApi.updateStatus(selectedOrder.id, { status });
    if (res.success) {
      loadOrders();
      const refreshed = await adminOrdersApi.getById(selectedOrder.id);
      if (refreshed.success && refreshed.data) {
        setSelectedOrder(refreshed.data as AdminOrder);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 relative pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-3">Gestión de Pedidos</h2>
          <p className="text-lg text-on-surface-variant font-medium">Rastrea y administra tus entregas y transacciones de clientes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <span className="material-symbols-outlined text-primary text-3xl mb-6">pending_actions</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">Procesando</p>
            <h3 className="text-4xl font-black text-on-surface">{stats.processing}</h3>
          </div>
        </div>
        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <span className="material-symbols-outlined text-secondary text-3xl mb-6">local_shipping</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">Entregados</p>
            <h3 className="text-4xl font-black text-on-surface">{stats.delivered}</h3>
          </div>
        </div>
        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <span className="material-symbols-outlined text-tertiary text-3xl mb-6">verified</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">Total Órdenes</p>
            <h3 className="text-4xl font-black text-on-surface">{stats.total}</h3>
          </div>
        </div>
        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <span className="material-symbols-outlined text-primary-fixed-dim text-3xl mb-6">payments</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">Ingresos Totales</p>
            <h3 className="text-4xl font-black text-on-surface">${Number(stats.revenue).toFixed(2)}</h3>
          </div>
        </div>
      </div>

      <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm space-y-6">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-3 px-5 py-3 bg-surface-container-high rounded-xl min-w-[200px] border border-outline-variant focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">filter_list</span>
            <select
              className="bg-transparent border-none text-base font-medium focus:ring-0 w-full text-on-surface outline-none cursor-pointer"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <span className="text-base font-medium text-on-surface-variant ml-auto">
            {meta.total} {meta.total === 1 ? 'orden' : 'órdenes'} encontradas
          </span>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant">
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Orden</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Fecha</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Cliente</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Total</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Pago</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Estado</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                      <p className="font-bold text-on-surface-variant">Cargando pedidos...</p>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                    <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
                    <p className="font-bold text-on-surface-variant">No se encontraron pedidos</p>
                  </td>
                </tr>
              ) : orders.map(order => {
                const statusInfo = getOrderStatusInfo(order.orderStatus);
                const initials = `${order.user.firstName[0]}${order.user.lastName[0]}`;
                return (
                  <tr key={order.id} className="hover:bg-surface-container-high transition-colors group cursor-pointer" onClick={() => openDetail(order)}>
                    <td className="px-8 py-6 font-bold text-base text-primary">#{order.orderNumber}</td>
                    <td className="px-8 py-6 text-on-surface-variant text-base font-medium">
                      {new Date(order.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-sm font-bold text-on-primary-container">
                          {initials}
                        </div>
                        <span className="text-base font-medium text-on-surface">
                          {order.user.firstName} {order.user.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-lg text-on-surface">${parseFloat(order.total).toFixed(2)}</td>
                    <td className="px-8 py-6 text-base font-medium text-on-surface-variant">
                      {getOrderStatusInfo(order.paymentStatus).label}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-base font-bold text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {meta.pages > 1 && (
          <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between bg-surface-container-lowest border-t border-outline-variant gap-4">
            <span className="text-base font-medium text-on-surface-variant">
              Página {page} de {meta.pages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-4 py-2 bg-surface border-2 border-outline-variant rounded-xl text-on-surface-variant hover:text-primary hover:border-primary transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-xl align-middle">chevron_left</span>
              </button>
              <button
                onClick={() => setPage(p => Math.min(meta.pages, p + 1))}
                disabled={page >= meta.pages}
                className="px-4 py-2 bg-surface border-2 border-outline-variant rounded-xl text-on-surface-variant hover:text-primary hover:border-primary transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-xl align-middle">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {detailOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setDetailOpen(false)}>
          <div className="bg-surface rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-surface z-10 flex items-center justify-between p-6 border-b border-outline-variant">
              <div>
                <h3 className="text-2xl font-black text-primary">#{selectedOrder.orderNumber}</h3>
                <p className="text-sm text-on-surface-variant">
                  {new Date(selectedOrder.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <button onClick={() => setDetailOpen(false)} className="p-2 hover:bg-surface-container-high rounded-xl transition-all">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {detailLoading ? (
              <div className="p-20 flex justify-center">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            ) : (
              <div className="p-6 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-surface-container-low p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Cliente</p>
                    <p className="font-bold text-on-surface">{selectedOrder.user.firstName} {selectedOrder.user.lastName}</p>
                    <p className="text-sm text-on-surface-variant">{selectedOrder.user.email}</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Pago</p>
                    <p className="font-bold text-on-surface">{getOrderStatusInfo(selectedOrder.paymentStatus).label}</p>
                    <p className="text-sm text-on-surface-variant">${parseFloat(selectedOrder.total).toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-black text-on-surface mb-4">Productos</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl">
                        <div>
                          <p className="font-bold text-on-surface">{item.product.name}</p>
                          <p className="text-sm text-on-surface-variant">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-black text-primary">${parseFloat(item.subtotal).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.tracking && selectedOrder.tracking.length > 0 && (
                  <div>
                    <h4 className="text-lg font-black text-on-surface mb-4">Historial</h4>
                    <div className="space-y-4">
                      {selectedOrder.tracking.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-primary mt-1.5" />
                            {i < selectedOrder.tracking.length - 1 && <div className="w-0.5 flex-1 bg-primary-container" />}
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">{getOrderStatusInfo(step.status).label}</p>
                            <p className="text-sm text-on-surface-variant">{step.description}</p>
                            <p className="text-xs text-outline">
                              {new Date(step.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-outline-variant pt-6">
                  <h4 className="text-lg font-black text-on-surface mb-4">Actualizar Estado</h4>
                  <div className="flex flex-wrap gap-3">
                    {UPDATE_STATUS_OPTIONS.map(opt => {
                      const isCurrent = selectedOrder.orderStatus === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => updateStatus(opt.value)}
                          disabled={isCurrent}
                          className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                            isCurrent
                              ? 'bg-primary-container text-on-primary-container cursor-not-allowed'
                              : 'bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary active:scale-95'
                          }`}
                        >
                          {isCurrent ? `✓ ${opt.label}` : opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
