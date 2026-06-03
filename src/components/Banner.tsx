import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Banner() {
  return (
    <section className="bg-zinc-950 py-12 md:py-24 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          
          {/* Image Side */}
          <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[500px]">
            <Image
              src="https://picsum.photos/seed/kova-banner/1000/1000"
              alt="Editorial campaign"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-zinc-950/20 mix-blend-multiply" />
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center relative">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-amber-600" />
              <span className="text-[10px] font-bold text-amber-500 tracking-[0.2em] uppercase">
                The Core Collection
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6">
              Elevate your<br />everyday uniform.
            </h2>
            
            <p className="text-base text-zinc-400 leading-relaxed mb-10 max-w-md">
              Discover our foundational pieces designed to work together seamlessly. 
              Premium fabrics, timeless cuts, zero compromises.
            </p>
            
            <div>
              <Link 
                href="/colecciones" 
                className="group inline-flex items-center gap-2 bg-white text-zinc-950 hover:bg-zinc-200 px-8 py-4 rounded-lg font-bold text-sm transition-colors btn-press"
              >
                Shop Essentials
                <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
