import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 relative pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-3">Resumen del Panel</h2>
          <p className="text-lg text-on-surface-variant font-medium">Buenos días, Admin. Aquí tienes un resumen de hoy.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface border-2 border-outline-variant text-on-surface px-6 py-3 rounded-xl text-sm font-bold hover:border-primary hover:text-primary transition-all">Exportar Datos</button>
          <button className="bg-[#F4C2D7] text-on-primary-container px-6 py-3 rounded-xl text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all">Agregar Nuevo Producto</button>
        </div>
      </div>

      {/* Metric Cards - Bento Grid Style */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col bouncy-hover">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-primary-container text-on-primary-container p-3 rounded-xl">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </div>
            <span className="text-sm font-bold text-secondary flex items-center bg-secondary-container px-3 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">VENTAS TOTALES</p>
          <h3 className="text-4xl font-black text-on-surface">$24,592.00</h3>
        </div>

        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col bouncy-hover">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-secondary-container text-on-secondary-container p-3 rounded-xl">
              <span className="material-symbols-outlined text-2xl">shopping_basket</span>
            </div>
            <span className="text-sm font-bold text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">Estable</span>
          </div>
          <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">ÓRDENES ACTIVAS</p>
          <h3 className="text-4xl font-black text-on-surface">156</h3>
        </div>

        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col bouncy-hover">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-tertiary-container text-on-tertiary-container p-3 rounded-xl">
              <span className="material-symbols-outlined text-2xl">person_add</span>
            </div>
            <span className="text-sm font-bold text-secondary flex items-center bg-secondary-container px-3 py-1 rounded-full">+8.2%</span>
          </div>
          <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">NUEVOS CLIENTES</p>
          <h3 className="text-4xl font-black text-on-surface">42</h3>
        </div>

        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col bouncy-hover">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-primary-container text-on-primary-container p-3 rounded-xl">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
          </div>
          <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">CATEGORÍA TOP</p>
          <h3 className="text-4xl font-black text-on-surface">Vestidos</h3>
        </div>
      </section>

      {/* Main Data Views */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-outline-variant shadow-sm p-8 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-black text-primary mb-1">Rendimiento de Ventas</h3>
              <p className="text-base text-on-surface-variant font-medium">Crecimiento de ingresos en los últimos 30 días</p>
            </div>
            <select className="bg-surface border-2 border-outline-variant rounded-xl py-3 px-5 shadow-sm font-bold text-on-surface focus:border-primary focus:ring-0 text-sm cursor-pointer outline-none transition-all">
              <option>Últimos 30 Días</option>
              <option>Últimos 7 Días</option>
            </select>
          </div>
          {/* Chart Placeholder */}
          <div className="flex-1 min-h-[300px] w-full relative border-l-2 border-b-2 border-outline-variant flex items-end justify-between px-6 pt-10" 
               style={{
                 backgroundImage: "linear-gradient(to right, var(--color-surface-container-high) 1px, transparent 1px), linear-gradient(to bottom, var(--color-surface-container-high) 1px, transparent 1px)",
                 backgroundSize: "60px 60px"
               }}>
            <div className="w-16 bg-primary-container/80 rounded-t-xl h-[40%] transition-all hover:bg-primary-container cursor-pointer"></div>
            <div className="w-16 bg-primary-container/80 rounded-t-xl h-[60%] transition-all hover:bg-primary-container cursor-pointer"></div>
            <div className="w-16 bg-primary-container/80 rounded-t-xl h-[55%] transition-all hover:bg-primary-container cursor-pointer"></div>
            <div className="w-16 bg-primary rounded-t-xl h-[85%] transition-all hover:scale-y-105 transform origin-bottom cursor-pointer shadow-lg shadow-primary/30"></div>
            <div className="w-16 bg-primary-container/80 rounded-t-xl h-[70%] transition-all hover:bg-primary-container cursor-pointer"></div>
            <div className="w-16 bg-primary-container/80 rounded-t-xl h-[90%] transition-all hover:bg-primary-container cursor-pointer"></div>
            <div className="w-16 bg-primary-container/80 rounded-t-xl h-[65%] transition-all hover:bg-primary-container cursor-pointer"></div>
            <div className="w-16 bg-primary-container/80 rounded-t-xl h-[75%] transition-all hover:bg-primary-container cursor-pointer"></div>
          </div>
          <div className="flex justify-between mt-6 text-sm text-on-surface-variant font-bold uppercase tracking-widest px-6">
            <span>Sem 1</span>
            <span>Sem 2</span>
            <span>Sem 3</span>
            <span>Sem 4</span>
          </div>
        </div>

        {/* Right Column: Quick Stats or Ads */}
        <div className="space-y-10">
          <div className="bg-primary-container rounded-2xl p-8 shadow-inner flex flex-col justify-center text-center relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-on-primary-container font-black text-2xl leading-tight mb-4">FUNCIÓN PRO<br/>PRECIOS CON IA</p>
              <p className="text-base text-on-primary-container/80 mb-8 font-medium">Desbloquea estrategias para aumentar tus márgenes hasta un 22%.</p>
              <button className="px-8 py-3 bg-surface text-primary font-bold rounded-xl hover:shadow-lg transition-all active:scale-95">Mejorar Ahora</button>
            </div>
            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-on-primary-container/10 text-[180px] group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">insights</span>
          </div>

          <div className="bg-surface rounded-2xl border border-outline-variant shadow-sm p-8">
            <h4 className="text-xl font-black text-primary mb-8">Distribución de Órdenes</h4>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between text-base font-bold text-on-surface">
                  <span>Ventas Directas</span>
                  <span>65%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-base font-bold text-on-surface">
                  <span>Marketplace</span>
                  <span>25%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full transition-all" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-base font-bold text-on-surface">
                  <span>Retiro en Tienda</span>
                  <span>10%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full transition-all" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <section className="bg-surface rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-8 flex justify-between items-center border-b border-outline-variant bg-surface-container-lowest">
          <h3 className="text-2xl font-black text-primary">Órdenes Recientes</h3>
          <a className="text-secondary text-base font-bold hover:underline" href="#">Ver Todas</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                <th className="px-8 py-5">ID Orden</th>
                <th className="px-8 py-5">Cliente</th>
                <th className="px-8 py-5">Producto</th>
                <th className="px-8 py-5">Fecha</th>
                <th className="px-8 py-5">Monto</th>
                <th className="px-8 py-5">Estado</th>
                <th className="px-8 py-5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              <tr className="hover:bg-surface-container-high transition-colors cursor-pointer group">
                <td className="px-8 py-6 font-bold text-base">#ORD-2841</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-sm font-bold text-on-primary-container">EW</div>
                    <span className="text-base font-medium">Elena Walker</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-base font-medium text-on-surface-variant">Bolso de Cuero Premium</td>
                <td className="px-8 py-6 text-base text-on-surface-variant">24 Oct, 2023</td>
                <td className="px-8 py-6 font-black text-lg">$32.00</td>
                <td className="px-8 py-6">
                  <span className="px-4 py-2 bg-tertiary-container text-on-tertiary-container text-xs font-bold uppercase tracking-wider rounded-lg">Pendiente</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors group-hover:scale-110"><span className="material-symbols-outlined text-2xl">more_horiz</span></button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors cursor-pointer group">
                <td className="px-8 py-6 font-bold text-base">#ORD-2840</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-sm font-bold text-on-secondary-container">JD</div>
                    <span className="text-base font-medium">Julián Díaz</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-base font-medium text-on-surface-variant">Vestido de Novia Nivel 1</td>
                <td className="px-8 py-6 text-base text-on-surface-variant">24 Oct, 2023</td>
                <td className="px-8 py-6 font-black text-lg">$120.00</td>
                <td className="px-8 py-6">
                  <span className="px-4 py-2 bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider rounded-lg">Enviado</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors group-hover:scale-110"><span className="material-symbols-outlined text-2xl">more_horiz</span></button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors cursor-pointer group">
                <td className="px-8 py-6 font-bold text-base">#ORD-2839</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-sm font-bold text-on-primary-container">MK</div>
                    <span className="text-base font-medium">María Kolis</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-base font-medium text-on-surface-variant">Vestido Casual Surtido</td>
                <td className="px-8 py-6 text-base text-on-surface-variant">23 Oct, 2023</td>
                <td className="px-8 py-6 font-black text-lg">$45.50</td>
                <td className="px-8 py-6">
                  <span className="px-4 py-2 bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-wider rounded-lg">Entregado</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors group-hover:scale-110"><span className="material-symbols-outlined text-2xl">more_horiz</span></button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors cursor-pointer group">
                <td className="px-8 py-6 font-bold text-base">#ORD-2838</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-bold text-on-surface-variant">BT</div>
                    <span className="text-base font-medium">Benjamín Torres</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-base font-medium text-on-surface-variant">Pantalón de Lino</td>
                <td className="px-8 py-6 text-base text-on-surface-variant">23 Oct, 2023</td>
                <td className="px-8 py-6 font-black text-lg">$12.00</td>
                <td className="px-8 py-6">
                  <span className="px-4 py-2 bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-wider rounded-lg">Entregado</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors group-hover:scale-110"><span className="material-symbols-outlined text-2xl">more_horiz</span></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-surface-container/50 flex justify-center">
          <button className="text-base font-bold text-on-surface-variant hover:text-primary flex items-center gap-2 transition-colors active:scale-95">
            Cargar Más Registros
            <span className="material-symbols-outlined text-xl">expand_more</span>
          </button>
        </div>
      </section>

      {/* FAB */}
      <div className="fixed bottom-10 right-10 z-40">
        <button className="bg-[#F4C2D7] text-on-primary-container w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 hover:-translate-y-2 hover:shadow-primary/30 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
}
