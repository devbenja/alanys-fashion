import React from 'react';

export default function GestionPedidosPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 relative pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-3">Gestión de Pedidos</h2>
          <p className="text-lg text-on-surface-variant font-medium">Rastrea y administra tus entregas y transacciones de clientes.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-surface border-2 border-outline-variant text-on-surface px-6 py-3 rounded-xl text-sm font-bold hover:border-primary hover:text-primary transition-all">
            <span className="material-symbols-outlined text-lg">download</span>
            Exportar CSV
          </button>
          <button className="flex items-center gap-2 bg-[#F4C2D7] text-on-primary-container px-6 py-3 rounded-xl text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            Nuevo Pedido
          </button>
        </div>
      </div>

      {/* Dashboard Stats (Bento Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between bouncy-hover">
          <span className="material-symbols-outlined text-primary text-3xl mb-6">pending_actions</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">Procesando</p>
            <h3 className="text-4xl font-black text-on-surface">24</h3>
          </div>
        </div>
        
        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between bouncy-hover">
          <span className="material-symbols-outlined text-secondary text-3xl mb-6">local_shipping</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">En Tránsito</p>
            <h3 className="text-4xl font-black text-on-surface">12</h3>
          </div>
        </div>
        
        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between bouncy-hover">
          <span className="material-symbols-outlined text-tertiary text-3xl mb-6">verified</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">Entregados</p>
            <h3 className="text-4xl font-black text-on-surface">1,402</h3>
          </div>
        </div>
        
        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between bouncy-hover">
          <span className="material-symbols-outlined text-primary-fixed-dim text-3xl mb-6">payments</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">Ganancia Total</p>
            <h3 className="text-4xl font-black text-on-surface">$42,850.00</h3>
          </div>
        </div>
      </div>

      {/* Filters Area */}
      <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm space-y-6">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-3 px-5 py-3 bg-surface-container-high rounded-xl min-w-[200px] border border-outline-variant focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">filter_list</span>
            <select className="bg-transparent border-none text-base font-medium focus:ring-0 w-full text-on-surface outline-none cursor-pointer">
              <option>Todos los Estados</option>
              <option>Procesando</option>
              <option>En Tránsito</option>
              <option>Entregado</option>
              <option>Cancelado</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3 bg-surface-container-high rounded-xl min-w-[240px] border border-outline-variant focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">calendar_today</span>
            <input 
              className="bg-transparent border-none text-base font-medium focus:ring-0 w-full outline-none text-on-surface" 
              placeholder="Rango de Fechas" 
              type="text" 
              defaultValue="Oct 1, 2023 - Oct 31, 2023"
            />
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3 bg-surface-container-high rounded-xl min-w-[200px] border border-outline-variant focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">credit_card</span>
            <select className="bg-transparent border-none text-base font-medium focus:ring-0 w-full text-on-surface outline-none cursor-pointer">
              <option>Todos los Métodos</option>
              <option>Tarjeta de Crédito</option>
              <option>PayPal</option>
              <option>Apple Pay</option>
            </select>
          </div>
          
          <button className="ml-auto text-base font-bold text-primary px-6 py-3 hover:bg-surface-container-high rounded-xl transition-all">
            Reiniciar Filtros
          </button>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="bg-surface rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant">
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">ID Orden</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Fecha</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Cliente</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Monto Total</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Pago</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Estado</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6 font-bold text-base text-primary">#ORD-9421</td>
                <td className="px-8 py-6 text-on-surface-variant text-base font-medium">24 Oct, 2023</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-sm font-bold text-on-secondary-container">JS</div>
                    <span className="text-base font-medium text-on-surface">Jane Simmons</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-black text-lg text-on-surface">$124.50</td>
                <td className="px-8 py-6 text-base font-medium text-on-surface-variant">Visa •••• 4242</td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-tertiary-container text-on-tertiary-container">Procesando</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-base font-bold text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalles</button>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6 font-bold text-base text-primary">#ORD-9420</td>
                <td className="px-8 py-6 text-on-surface-variant text-base font-medium">23 Oct, 2023</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-sm font-bold text-on-tertiary-container">BW</div>
                    <span className="text-base font-medium text-on-surface">Billie Wright</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-black text-lg text-on-surface">$89.00</td>
                <td className="px-8 py-6 text-base font-medium text-on-surface-variant">PayPal</td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-secondary-container text-on-secondary-container">En Tránsito</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-base font-bold text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalles</button>
                </td>
              </tr>
              
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6 font-bold text-base text-primary">#ORD-9419</td>
                <td className="px-8 py-6 text-on-surface-variant text-base font-medium">22 Oct, 2023</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-sm font-bold text-on-primary-container">ML</div>
                    <span className="text-base font-medium text-on-surface">Marcus Lane</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-black text-lg text-on-surface">$342.15</td>
                <td className="px-8 py-6 text-base font-medium text-on-surface-variant">Apple Pay</td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-primary-container text-on-primary-container">Entregado</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-base font-bold text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalles</button>
                </td>
              </tr>
              
              {/* Row 4 */}
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6 font-bold text-base text-primary">#ORD-9418</td>
                <td className="px-8 py-6 text-on-surface-variant text-base font-medium">22 Oct, 2023</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-bold text-on-surface-variant">SM</div>
                    <span className="text-base font-medium text-on-surface">Sarah Mayer</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-black text-lg text-on-surface">$45.00</td>
                <td className="px-8 py-6 text-base font-medium text-on-surface-variant">Mastercard •••• 9012</td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-error-container text-on-error-container">Cancelado</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-base font-bold text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalles</button>
                </td>
              </tr>
              
              {/* Row 5 */}
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6 font-bold text-base text-primary">#ORD-9417</td>
                <td className="px-8 py-6 text-on-surface-variant text-base font-medium">21 Oct, 2023</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-sm font-bold text-on-secondary-container">KT</div>
                    <span className="text-base font-medium text-on-surface">Kevin Tompson</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-black text-lg text-on-surface">$198.20</td>
                <td className="px-8 py-6 text-base font-medium text-on-surface-variant">Visa •••• 1152</td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-primary-container text-on-primary-container">Entregado</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-base font-bold text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalles</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between bg-surface-container-lowest border-t border-outline-variant gap-4">
          <span className="text-base font-medium text-on-surface-variant">Mostrando 1 a 5 de 1,438 órdenes</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-surface border-2 border-outline-variant rounded-xl text-on-surface-variant hover:text-primary hover:border-primary transition-colors disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-xl align-middle">chevron_left</span>
            </button>
            <button className="px-4 py-2 bg-[#F4C2D7] text-on-primary-container font-bold rounded-xl shadow-sm">1</button>
            <button className="px-4 py-2 bg-surface border-2 border-transparent text-on-surface font-medium rounded-xl hover:bg-surface-container-high transition-colors">2</button>
            <button className="px-4 py-2 bg-surface border-2 border-transparent text-on-surface font-medium rounded-xl hover:bg-surface-container-high transition-colors">3</button>
            <span className="px-2 py-2 text-on-surface-variant font-bold">...</span>
            <button className="px-4 py-2 bg-surface border-2 border-transparent text-on-surface font-medium rounded-xl hover:bg-surface-container-high transition-colors">288</button>
            <button className="px-4 py-2 bg-surface border-2 border-outline-variant rounded-xl text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-xl align-middle">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Insight Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
        <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <h4 className="font-black text-2xl text-on-surface">Actividad Reciente</h4>
            <button className="text-primary text-base font-bold hover:underline">Ver Todo</button>
          </div>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="mt-2 w-3 h-3 rounded-full bg-primary shrink-0 shadow-sm shadow-primary/30"></div>
              <div>
                <p className="text-lg font-medium text-on-surface">La orden #ORD-9421 cambió a <span className="text-primary font-bold">Procesando</span></p>
                <p className="text-sm font-bold text-on-surface-variant mt-1">hace 2 minutos</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="mt-2 w-3 h-3 rounded-full bg-secondary shrink-0 shadow-sm shadow-secondary/30"></div>
              <div>
                <p className="text-lg font-medium text-on-surface">Etiqueta de envío generada para #ORD-9420</p>
                <p className="text-sm font-bold text-on-surface-variant mt-1">hace 45 minutos</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="mt-2 w-3 h-3 rounded-full bg-tertiary shrink-0 shadow-sm shadow-tertiary/30"></div>
              <div>
                <p className="text-lg font-medium text-on-surface">Reembolso procesado para #ORD-9399</p>
                <p className="text-sm font-bold text-on-surface-variant mt-1">hace 3 horas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden group border border-outline-variant shadow-sm bg-primary-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            alt="Atención al cliente" 
            className="w-full h-full object-cover opacity-20 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnFj_fqt_GkoG3qNqVlWEeCTO97ogCTBx1rQBJIK3pedj0gAnhkHDFlWaqHKaTdieVylruqNSu3Iv_YPBsO8XbimVX0dblYfV7ZABNdKvgaEZBmS7lUIMLoUW0UkHwEiavp9PuNnNxRFyLov7YXdSWX7iWsptolsQleth9ansdVFZ3fcR_CKycjvZzyE_DDWv-Twpv3aMf8MPNCuUcKx2IcpmawLcqSQsHO8OkAIf8b1SshWbFYwCXKlVsoEa1QQH2AKyFu7Nb1dk"
          />
          <div className="absolute inset-0 p-10 flex flex-col justify-center items-start">
            <h4 className="text-3xl font-black text-on-primary-container mb-3 tracking-tight">¿Necesitas ayuda<br/>con la logística?</h4>
            <p className="text-on-primary-container/90 mb-8 max-w-sm text-lg font-medium leading-relaxed">Conecta con nuestros especialistas de distribución para optimizar tu cadena de suministro.</p>
            <button className="px-8 py-4 bg-surface text-primary rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all text-base">Contactar Centro Logístico</button>
          </div>
        </div>
      </div>
    </div>
  );
}
