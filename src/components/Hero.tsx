import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const MARQUEE_ITEMS = [
  'FREE SHIPPING ON ORDERS OVER $75',
  'NEW DROPS EVERY THURSDAY',
  '30-DAY HASSLE-FREE RETURNS',
  'OVER 4,000 STYLES IN STOCK',
  'FREE SHIPPING ON ORDERS OVER $75',
  'NEW DROPS EVERY THURSDAY',
  '30-DAY HASSLE-FREE RETURNS',
  'OVER 4,000 STYLES IN STOCK',
];

export default function Hero() {
  return (
    <section className="relative bg-zinc-950 min-h-[100dvh] overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 right-0 w-[60vw] h-[80vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(217,119,6,0.07) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[50vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(217,119,6,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[100dvh] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-16 items-center pt-28 pb-16">

          {/* Left: Text */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-amber-600" />
              <span className="text-xs font-bold text-amber-500 tracking-[0.2em] uppercase">
                SS 2026 Collection
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[0.95] mb-8">
              Wear what<br />
              <span className="text-zinc-500">moves</span> you.
            </h1>

            <p className="text-base text-zinc-400 leading-relaxed max-w-[48ch] mb-10 font-light">
              Curated drops. Honest prices. No noise. From everyday staples to
              limited-run pieces — built for people who care about how they look
              without overthinking it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalogo"
                className="group inline-flex items-center justify-center gap-2.5 bg-amber-600 hover:bg-amber-700 text-zinc-950 px-8 py-4 rounded-lg font-bold text-sm transition-all duration-200 active:scale-[0.97] btn-press"
              >
                Shop Collection
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/colecciones"
                className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-8 py-4 rounded-lg font-medium text-sm transition-all duration-200 active:scale-[0.97]"
              >
                View Lookbook
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-12 pt-10 border-t border-zinc-800">
              <div>
                <p className="text-2xl font-black text-white font-mono">4.2k+</p>
                <p className="text-xs text-zinc-500 mt-0.5">Active customers</p>
              </div>
              <div className="w-px h-8 bg-zinc-800" />
              <div>
                <p className="text-2xl font-black text-white font-mono">4,100+</p>
                <p className="text-xs text-zinc-500 mt-0.5">Styles available</p>
              </div>
              <div className="w-px h-8 bg-zinc-800" />
              <div>
                <p className="text-2xl font-black text-white font-mono">97.3%</p>
                <p className="text-xs text-zinc-500 mt-0.5">Satisfaction rate</p>
              </div>
            </div>
          </div>

          {/* Right: Editorial Image */}
          <div className="relative hidden lg:flex items-center justify-end">
            <div className="relative w-full max-w-[440px] aspect-[3/4] rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/kova-hero-editorial/900/1200"
                alt="Editorial fashion photography"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 glass-panel rounded-xl px-5 py-3.5">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">New Drop</p>
                <p className="text-sm font-bold text-white">Spring Essentials 2026</p>
              </div>
            </div>

            {/* Accent bar */}
            <div className="absolute -left-4 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-amber-600 to-transparent rounded-full opacity-60" />
          </div>
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-amber-600/10 border-t border-amber-600/20 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="text-xs font-bold text-amber-500/80 tracking-[0.15em] uppercase mr-16">
              {item}
              <span className="ml-16 text-amber-700">—</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
