import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative bg-primary-container min-h-screen flex items-center pt-24 pb-12 overflow-hidden candy-shadow-primary">
      {/* Decorative background overlay */}
      <div className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12 relative z-10">
        
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left z-10">
          <span className="inline-block bg-white text-primary font-bold px-4 py-2 rounded-lg mb-6 candy-shadow-primary self-center lg:self-start">
            BIENVENIDOS
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-on-primary-container tracking-tighter leading-tight mb-6">
            Fashion that <br />
            Spreads Joy
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
            Descubre nuestra nueva línea de prendas diseñadas para brindarte comodidad y estilo. Colores vibrantes y texturas suaves que te encantarán.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/catalogo"
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-black text-lg text-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Comprar Ahora
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="/colecciones"
              className="bg-white/30 backdrop-blur-md border-2 border-white text-on-primary-container px-8 py-4 rounded-lg font-black text-lg text-center hover:scale-105 transition-all active:scale-95"
            >
              Ver Colección
            </Link>
          </div>
        </div>

        {/* Right Side: Logo / Image */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-end items-center relative z-10 mt-12 lg:mt-0">
           <div className="relative w-full max-w-lg aspect-square">
             <Image
                src="/alanays-fashion-logo.png"
                alt="Alanys Fashion Logo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                priority
             />
           </div>
        </div>

      </div>
    </div>
  );
}
