import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function MiPerfilPage() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24 md:pb-0 font-['DM_Sans']">
      <Navbar />
      
      {/* Añadimos un pequeño padding superior porque el Navbar es fixed */}
      <main className="max-w-7xl mx-auto px-6 py-10 pt-28">
        {/* Hero Profile Section */}
        <section className="relative mb-12">
          <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden relative shadow-lg shadow-primary/5">
            <Image 
              fill
              sizes="100vw"
              className="object-cover" 
              alt="Fashion texture background" 
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop" 
              priority
            />
            {/* Dark overlay for better contrast if needed */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="absolute -bottom-10 left-8 flex items-end gap-4 md:gap-6">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 md:border-8 border-background overflow-hidden shadow-xl relative bg-surface-container">
                <Image 
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-cover" 
                  alt="Sarah Sweet Avatar" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" 
                />
              </div>
              <button className="absolute bottom-2 right-2 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            
            <div className="mb-12 md:mb-14">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">Hola, Sarah!</h1>
              <p className="text-white/90 font-medium drop-shadow-md">Fashion Insider desde 2023</p>
            </div>
          </div>
        </section>

        {/* My Sweet Stats (Bento Grid Style) -> Mis Estadísticas de Estilo */}
        <section className="mt-20 mb-12">
          <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">star_rate</span>
            Mis Estadísticas de Estilo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Candy Points -> Alanys Points */}
            <div className="bg-primary text-on-primary p-8 rounded-lg hover:scale-[1.02] transition-transform duration-300 shadow-md flex flex-col justify-between overflow-hidden relative group">
              <div className="relative z-10">
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Alanys Points</p>
                <h3 className="text-5xl font-black mt-2">1,250</h3>
                <p className="text-xs mt-4 font-medium">
                  Estás a solo 250 puntos de tu <br />
                  <strong>¡Envío Gratis Premium!</strong>
                </p>
              </div>
              <button className="mt-6 bg-surface-container-lowest text-primary font-bold py-3 px-6 rounded-lg w-fit hover:bg-opacity-90 transition-all shadow-sm">
                Canjear Ahora
              </button>
              <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[160px] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">auto_awesome</span>
            </div>

            {/* Coupons Card */}
            <div className="bg-secondary text-on-secondary p-8 rounded-lg hover:scale-[1.02] transition-transform duration-300 shadow-md flex flex-col justify-between overflow-hidden relative group">
              <div className="relative z-10">
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Cupones Activos</p>
                <h3 className="text-5xl font-black mt-2">04</h3>
                <div className="mt-4 flex flex-col gap-2">
                  <span className="bg-on-secondary/20 text-xs py-1 px-3 w-fit rounded font-medium">20% Dscto. en Tienda</span>
                  <span className="bg-on-secondary/20 text-xs py-1 px-3 w-fit rounded font-medium">Envío Gratis</span>
                </div>
              </div>
              <button className="mt-6 bg-surface-container-lowest text-secondary font-bold py-3 px-6 rounded-lg w-fit hover:bg-opacity-90 transition-all shadow-sm">
                Ver Billetera
              </button>
              <span className="material-symbols-outlined absolute -top-4 -right-4 text-[120px] opacity-10 rotate-12 pointer-events-none group-hover:rotate-45 transition-transform duration-500">confirmation_number</span>
            </div>

            {/* Quick Shortcuts */}
            <div className="bg-surface-container p-8 rounded-lg border border-outline-variant/50 flex flex-col gap-4">
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Accesos Rápidos</p>
              <div className="grid grid-cols-2 gap-3 h-full">
                <Link href="/mis-pedidos" className="flex flex-col items-center justify-center p-4 bg-surface-container-lowest rounded-lg shadow-sm border border-surface-variant hover:scale-105 transition-transform duration-300">
                  <span className="material-symbols-outlined text-primary mb-2">receipt_long</span>
                  <span className="text-xs font-bold text-on-surface">Mis Pedidos</span>
                </Link>
                <Link href="#" className="flex flex-col items-center justify-center p-4 bg-surface-container-lowest rounded-lg shadow-sm border border-surface-variant hover:scale-105 transition-transform duration-300">
                  <span className="material-symbols-outlined text-tertiary mb-2">location_on</span>
                  <span className="text-xs font-bold text-on-surface">Direcciones</span>
                </Link>
                <Link href="#" className="flex flex-col items-center justify-center p-4 bg-surface-container-lowest rounded-lg shadow-sm border border-surface-variant hover:scale-105 transition-transform duration-300">
                  <span className="material-symbols-outlined text-secondary mb-2">payments</span>
                  <span className="text-xs font-bold text-on-surface">Pagos</span>
                </Link>
                <Link href="#" className="flex flex-col items-center justify-center p-4 bg-surface-container-lowest rounded-lg shadow-sm border border-surface-variant hover:scale-105 transition-transform duration-300">
                  <span className="material-symbols-outlined text-on-surface-variant mb-2">settings</span>
                  <span className="text-xs font-bold text-on-surface">Ajustes</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Details Form */}
          <div className="flex-grow bg-surface-container-lowest p-8 rounded-lg shadow-sm border border-surface-variant">
            <h2 className="text-xl font-black text-on-background mb-8">Información Personal</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-surface-variant px-2">Nombre Completo</label>
                <input 
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-lg px-6 py-3 transition-all text-on-surface font-medium" 
                  type="text" 
                  defaultValue="Sarah Sweet" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-surface-variant px-2">Correo Electrónico</label>
                <input 
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-lg px-6 py-3 transition-all text-on-surface font-medium" 
                  type="email" 
                  defaultValue="sarah.sweet@alanysfashion.com" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-surface-variant px-2">Número de Teléfono</label>
                <input 
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-lg px-6 py-3 transition-all text-on-surface font-medium" 
                  type="tel" 
                  defaultValue="+1 (555) 123-4567" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-surface-variant px-2">Fecha de Nacimiento</label>
                <input 
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-lg px-6 py-3 transition-all text-on-surface font-medium" 
                  type="text" 
                  defaultValue="14 de Mayo, 1995" 
                />
              </div>
            </div>
            
            <div className="mt-10 flex justify-end">
              <button className="bg-primary text-on-primary font-black py-4 px-10 rounded-lg shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform">
                Guardar Cambios
              </button>
            </div>
          </div>

          {/* Side Information Card */}
          <aside className="lg:w-80 flex flex-col gap-6">
            {/* Support Card */}
            <div className="bg-tertiary-container text-on-tertiary-container p-6 rounded-lg relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-black mb-2">Soporte de Estilo</h4>
              <p className="text-sm font-medium mb-4 opacity-90">¿Necesitas ayuda con un pedido o tienes una pregunta de estilo?</p>
              <Link href="#" className="flex items-center gap-2 font-bold hover:underline">
                Contactar Soporte <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-6xl opacity-20 rotate-12 pointer-events-none">support_agent</span>
            </div>
            
            {/* Subscription / Loyalty Card */}
            <div className="bg-surface-container p-6 rounded-lg border-2 border-dashed border-outline-variant">
              <h4 className="text-sm font-black text-on-surface mb-4">Estado de Cuenta</h4>
              
              <div className="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-lg shadow-sm border border-surface-variant mb-4">
                <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>card_membership</span>
                </div>
                <div>
                  <p className="text-xs font-black text-on-surface">Alanys VIP</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Plan Activo</p>
                </div>
              </div>
              
              <p className="text-xs text-on-surface-variant mb-4">Próxima evaluación: <strong>12 de Diciembre, 2024</strong></p>
              
              <button className="w-full text-center py-2 text-primary font-bold text-sm hover:text-on-primary-container hover:bg-primary-container/50 transition-colors rounded-lg">
                Gestionar Membresía
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
