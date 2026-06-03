import { ArrowRight } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="bg-zinc-950 relative overflow-hidden py-24 md:py-32 border-t border-amber-900/30">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1]">
          Join the Collective.
        </h2>
        
        <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          Early access to drops. Exclusive edits. No spam, just signal.
          Subscribe to the KOVA newsletter.
        </p>

        <form className="mt-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <label htmlFor="emailAddress" className="sr-only">Email address</label>
          <input
            id="emailAddress"
            type="email"
            autoComplete="email"
            required
            className="w-full flex-grow bg-zinc-900 border border-zinc-800 text-white rounded-lg px-5 py-4 text-sm font-medium focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors placeholder:text-zinc-600"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-zinc-950 rounded-lg font-bold text-sm transition-colors btn-press shrink-0"
          >
            Subscribe
            <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <p className="mt-6 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          By subscribing you agree to our terms.
        </p>
      </div>
    </section>
  );
}
