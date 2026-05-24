import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function MisPedidosPage() {
  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 min-h-screen">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-primary tracking-tight mb-2">Mis Pedidos</h1>
          <p className="text-on-surface-variant font-medium">Lleva el control de todos tus caprichos y sorpresas.</p>
        </div>
        <div className="grid gap-6">
          {/* Order Card 1: Delivered */}
          <div className="bg-surface-container-lowest p-6 rounded-lg shadow-md border-2 border-transparent hover:border-primary-container transition-all duration-300 group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-primary-fixed">
                  <Image fill alt="Order CS-89241" className="w-full h-full object-cover" sizes="64px" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary uppercase tracking-wider">Pedido #CS-89241</p>
                  <p className="text-on-surface-variant text-sm">Realizado el 12 de Octubre, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Entregado
                </div>
                <p className="text-xl font-black text-primary">$42.50</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-surface-variant">
              <div className="text-sm font-medium text-on-surface-variant">
                3 Artículos: Top corto, Pantalón ancho, Sandalias
              </div>
              <button className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">reorder</span>
                Volver a pedir
              </button>
            </div>
          </div>
          {/* Order Card 2: In Transit */}
          <div className="bg-surface-container-lowest p-6 rounded-lg shadow-md border-2 border-transparent hover:border-tertiary-container transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-tertiary-fixed">
                  <Image fill alt="Order CS-90112" className="w-full h-full object-cover" sizes="64px" src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=200&auto=format&fit=crop" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary uppercase tracking-wider">Pedido #CS-90112</p>
                  <p className="text-on-surface-variant text-sm">Realizado el 24 de Octubre, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-4 py-2 bg-blue-100 text-tertiary rounded-lg font-bold text-sm">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                  En Tránsito
                </div>
                <p className="text-xl font-black text-primary">$28.99</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-surface-variant">
              <div className="text-sm font-medium text-on-surface-variant">
                1 Artículo: Vestido de Verano Floral
              </div>
              <Link href="/seguimiento" className="bg-tertiary text-on-tertiary font-bold px-6 py-2.5 rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">map</span>
                Rastrear Pedido
              </Link>
            </div>
          </div>
          {/* Order Card 3: Cancelled */}
          <div className="bg-surface-container-lowest p-6 rounded-lg shadow-md border-2 border-transparent opacity-80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-variant grayscale">
                  <Image fill alt="Order CS-87550" className="w-full h-full object-cover" sizes="64px" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=200&auto=format&fit=crop" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary uppercase tracking-wider">Pedido #CS-87550</p>
                  <p className="text-on-surface-variant text-sm">Realizado el 30 de Septiembre, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-500 rounded-lg font-bold text-sm">
                  <span className="material-symbols-outlined text-sm">cancel</span>
                  Cancelado
                </div>
                <p className="text-xl font-black text-slate-400">$15.75</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-surface-variant">
              <div className="text-sm font-medium text-slate-400">
                2 Artículos: Blusa de Seda, Falda Plisada
              </div>
              <button className="border-2 border-primary text-primary font-bold px-6 py-2 rounded-lg hover:bg-primary-fixed transition-all flex items-center gap-2">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
        {/* Featured Collections (Bento Style Section) */}
        <div className="mt-16">
          <h2 className="text-2xl font-black text-secondary mb-6">También te podría gustar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px]">
            <div className="md:col-span-2 relative rounded-lg overflow-hidden group cursor-pointer shadow-lg">
              <Image fill alt="Colección de Verano" sizes="(max-width: 768px) 100vw, 66vw" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
                <span className="bg-on-primary text-primary font-black px-3 py-1 rounded-lg text-xs w-max mb-2">NUEVA TEMPORADA</span>
                <h3 className="text-on-primary text-xl font-bold">Colección de Verano Exclusiva</h3>
                <p className="text-on-primary/90 text-sm">¡Descubre las nuevas tendencias para brillar!</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden group cursor-pointer shadow-lg bg-secondary">
              <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center">
                <span className="material-symbols-outlined text-on-primary text-4xl mb-4">card_giftcard</span>
                <h3 className="text-on-primary text-lg font-bold">Tarjetas de Regalo</h3>
                <p className="text-on-primary/80 text-xs mt-2">El regalo perfecto con mucho estilo para tus seres queridos.</p>
                <button className="mt-4 bg-on-primary text-secondary font-bold text-xs px-4 py-2 rounded-lg">Enviar Regalo</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
