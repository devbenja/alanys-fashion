import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function SeguimientoPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20 md:py-12 md:pt-32 min-h-screen">
        {/* Order Header */}
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight mb-2">Pedido #CS-88291</h1>
              <p className="text-on-surface-variant font-medium">Entrega estimada: Hoy antes de las 4:30 PM</p>
            </div>
            <div className="bg-primary-fixed text-on-primary-fixed-variant px-6 py-2 rounded-lg font-bold shadow-sm inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-lg bg-primary animate-pulse"></span> En Tránsito
            </div>
          </div>
        </div>

        {/* New Timeline Section */}
        <div className="mb-12 bg-surface rounded-lg p-8 shadow-sm border border-primary-container overflow-x-auto scrollbar-hide">
          <div className="min-w-[800px] relative">
            {/* Continuous Line Background */}
            <div className="absolute top-[22px] left-[5%] right-[5%] h-1 bg-surface-variant rounded-lg"></div>
            {/* Progress Line */}
            <div className="absolute top-[22px] left-[5%] w-[54%] h-1 bg-primary rounded-lg z-0 transition-all duration-1000"></div>

            <div className="relative z-10 flex justify-between items-start">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center w-32">
                <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg mb-3">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>check</span>
                </div>
                <span className="text-xs font-bold text-primary">Pedido Recibido</span>
                <span className="text-[10px] text-on-surface-variant">14 Mar, 10:20</span>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center w-32">
                <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg mb-3">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>check</span>
                </div>
                <span className="text-xs font-bold text-primary">Preparando pedido</span>
                <span className="text-[10px] text-on-surface-variant">14 Mar, 11:45</span>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center w-32">
                <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg mb-3">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>check</span>
                </div>
                <span className="text-xs font-bold text-primary">Entregado a Agencia</span>
                <span className="text-[10px] text-on-surface-variant">Hoy, 1:30 PM</span>
              </div>
              {/* Step 4 (ACTIVE) */}
              <div className="flex flex-col items-center text-center w-32">
                <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center shadow-md mb-3 relative">
                  <span className="material-symbols-outlined text-xl animate-bounce">local_shipping</span>
                  <div className="absolute -inset-1 border-2 border-primary rounded-lg animate-ping opacity-25"></div>
                </div>
                <span className="text-xs font-black text-primary">En Tránsito</span>
                <span className="text-[10px] text-on-surface-variant">En camino</span>
              </div>
              {/* Step 5 */}
              <div className="flex flex-col items-center text-center w-32">
                <div className="w-12 h-12 rounded-lg bg-surface-variant text-outline flex items-center justify-center mb-3">
                  <div className="w-3 h-3 rounded-lg bg-outline-variant"></div>
                </div>
                <span className="text-xs font-bold text-outline">En Delegación</span>
                <span className="text-[10px] text-on-surface-variant">Pendiente</span>
              </div>
              {/* Step 6 */}
              <div className="flex flex-col items-center text-center w-32">
                <div className="w-12 h-12 rounded-lg bg-surface-variant text-outline flex items-center justify-center mb-3">
                  <div className="w-3 h-3 rounded-lg bg-outline-variant"></div>
                </div>
                <span className="text-xs font-bold text-outline">En Reparto</span>
                <span className="text-[10px] text-on-surface-variant">Pendiente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Map and Products */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Map Section */}
            <div className="h-[450px] rounded-lg overflow-hidden border-4 border-white shadow-xl relative group">
              <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              <Image fill alt="Delivery Map" sizes="(max-width: 1024px) 100vw, 66vw" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" />
              {/* Live Info Overlay */}
              <div className="absolute top-6 left-6 z-20 bg-surface/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-primary-container max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-lg bg-primary animate-pulse"></div>
                  <span className="text-xs font-black uppercase tracking-wider text-primary">Ruta en vivo</span>
                </div>
                <p className="text-sm font-bold text-on-surface">Tu pedido está recorriendo las calles de la ciudad.</p>
              </div>
              {/* Delivery Marker */}
              <div className="absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                  <div className="absolute -inset-6 bg-primary/20 rounded-lg animate-ping"></div>
                  <div className="absolute -inset-4 bg-primary/30 rounded-lg animate-pulse"></div>
                  <div className="bg-primary text-white p-4 rounded-lg shadow-lg relative z-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">moped</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Summary */}
            <div className="bg-surface p-8 rounded-lg shadow-sm border border-primary-container">
              <h3 className="text-xl font-black text-on-surface mb-8">Productos en este pedido</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-primary-fixed flex-shrink-0 shadow-inner">
                    <Image fill alt="Top corto" sizes="96px" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-black text-lg text-on-surface">Top Corto</p>
                    <p className="text-sm text-on-surface-variant">Talla M • Algodón</p>
                    <div className="mt-2 inline-flex items-center gap-1 bg-primary-container text-primary px-2 py-0.5 rounded-lg text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]">stars</span> Favorito del mes
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl text-primary">$24.00</p>
                    <p className="text-xs text-on-surface-variant">Cantidad: 1</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group border-t border-outline-variant pt-8">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-tertiary-fixed flex-shrink-0 shadow-inner">
                    <Image fill alt="Pantalón ancho" sizes="96px" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=200&auto=format&fit=crop" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-black text-lg text-on-surface">Pantalón Ancho</p>
                    <p className="text-sm text-on-surface-variant">Talla S • Lino</p>
                    <div className="mt-2 inline-flex items-center gap-1 bg-blue-50 text-tertiary px-2 py-0.5 rounded-lg text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]">bolt</span> Edición Limitada
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl text-primary">$18.50</p>
                    <p className="text-xs text-on-surface-variant">Cantidad: 1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Sidebar Info and Summary */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Delivery Agency Card */}
            <div className="bg-surface p-8 rounded-lg shadow-xl border border-primary-container flex flex-col">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-6">Agencia de Transporte</h4>
              <div className="bg-secondary-container/20 p-5 rounded-lg flex items-center gap-4 mb-8 border border-secondary/10">
                <div className="bg-secondary text-white w-12 h-12 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <div>
                  <p className="font-black text-on-surface leading-tight">Alanys Express Logística</p>
                  <p className="text-[11px] text-on-surface-variant">Socio de transporte premium</p>
                </div>
              </div>
              <div className="mb-8">
                <p className="text-[11px] text-on-surface-variant font-bold mb-2 uppercase tracking-wide">Número de seguimiento:</p>
                <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-lg border border-outline-variant group">
                  <code className="font-black text-primary text-sm">ALANYS-99281-RT</code>
                  <button className="text-secondary hover:scale-125 transition-transform duration-200">
                    <span className="material-symbols-outlined text-lg">content_copy</span>
                  </button>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <button className="w-full py-4 px-6 bg-secondary text-white rounded-lg font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-md">
                  <span className="material-symbols-outlined text-lg">language</span>
                  Ver en web de la agencia
                </button>
                <button className="w-full py-4 px-6 bg-primary-container text-secondary rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-opacity-80 transition-all">
                  <span className="material-symbols-outlined text-lg">support_agent</span>
                  Contactar soporte
                </button>
              </div>
              <div className="pt-6 border-t border-outline-variant">
                <p className="text-[11px] text-on-surface-variant font-bold mb-2 uppercase tracking-wide">Estado del paquete:</p>
                <div className="bg-surface-container-lowest p-4 rounded-lg border-l-4 border-primary italic">
                  <p className="text-sm font-medium text-on-surface">"Tu paquete ha salido del centro logístico regional y se encuentra de camino a la delegación de destino."</p>
                </div>
              </div>
            </div>

            {/* Price Summary Card */}
            <div className="bg-primary text-white p-8 rounded-lg shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12">
                <span className="material-symbols-outlined text-[180px]">shopping_bag</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-8 border-b border-white/20 pb-4">Resumen de Pago</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-primary-container">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-black text-lg">$42.50</span>
                  </div>
                  <div className="flex justify-between text-primary-container">
                    <span className="font-medium">Envío Express</span>
                    <span className="font-black text-lg">$5.00</span>
                  </div>
                  <div className="flex justify-between text-primary-container">
                    <span className="font-medium">Impuestos</span>
                    <span className="font-black text-lg">$3.20</span>
                  </div>
                  <div className="pt-4 flex justify-between items-center text-2xl font-black border-t border-white/30">
                    <span className="">Total</span>
                    <span className="text-3xl">$50.70</span>
                  </div>
                </div>
              </div>
              <div className="relative z-10 pt-4 bg-white/10 rounded-lg p-4 border border-white/20">
                <p className="text-[10px] text-primary-container uppercase tracking-[0.2em] font-black mb-3">Método de Pago</p>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="material-symbols-outlined">credit_card</span>
                  </div>
                  <span className="font-black text-sm uppercase tracking-wider">Apple Pay •••• 9210</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
