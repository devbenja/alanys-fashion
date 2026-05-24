import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className="bg-pink-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 h-64 md:h-auto">
             <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Mujer feliz con bolsas de compras"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-sm font-semibold text-pink-500 tracking-wide uppercase">Explore The Joy</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Clothing That Makes You Feel Like Candy
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Descubre nuestra nueva línea de prendas diseñadas para brindarte comodidad y estilo. Colores vibrantes y texturas suaves que te encantarán.
            </p>
            <div className="mt-8">
              <Link href="/nosotros" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                Conoce Más
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
