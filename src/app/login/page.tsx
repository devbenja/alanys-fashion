"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar'; // Optionally include Navbar if needed, but the design is full bleed so maybe I should make it stand alone, or just a small back button. The design has the brand name absolute positioned.

export default function LoginPage() {
  return (
    <div className="bg-background text-on-background min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      <main className="flex min-h-screen md:h-screen w-full flex-col md:flex-row md:overflow-hidden">
        {/* Left Side: Lifestyle Image (Full Bleed 50%) */}
        <section className="relative w-full md:w-1/2 min-h-[30vh] md:min-h-0 md:h-full">
          <div className="absolute inset-0 bg-black/10 pointer-events-none z-10"></div>
          <Image 
            fill 
            priority
            alt="Alanys Fashion Lifestyle" 
            className="absolute inset-0 w-full h-full object-cover" 
            sizes="(max-width: 768px) 100vw, 50vw"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" 
          />
          {/* Floating Brand Badge */}
          <div className="absolute top-8 left-8 bg-surface/90 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-20">
            <Link href="/">
              <span className="text-2xl font-black tracking-tighter text-primary">AlanysFashion</span>
            </Link>
          </div>
          {/* Descriptive Overlay */}
          <div className="absolute bottom-12 left-12 right-12 text-white drop-shadow-md z-20 hidden md:block">
            <h2 className="text-4xl md:text-5xl font-black mb-2 leading-tight">El estilo es una actitud.</h2>
            <p className="text-lg md:text-xl font-medium opacity-95">Descubre la colección más increíble de la temporada.</p>
          </div>
        </section>

        {/* Right Side: Login Form (Full Bleed 50%) */}
        <section className="w-full md:w-1/2 h-full overflow-y-auto flex items-center justify-center p-8 md:p-16 lg:p-24 bg-surface relative">
          {/* Background Decorative Gradients for Right Side */}
          <div className="absolute top-0 left-1/2 -z-0 w-96 h-96 bg-primary-fixed/30 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 -z-0 w-[30rem] h-[30rem] bg-tertiary-fixed/30 blur-[150px] rounded-full pointer-events-none"></div>

          {/* Mobile Brand Logo (Small screen only) */}
          <div className="md:hidden absolute top-8 left-8 z-20 bg-surface/80 p-2 rounded-lg backdrop-blur-sm">
            <Link href="/">
              <span className="text-2xl font-black tracking-tighter text-primary">AlanysFashion</span>
            </Link>
          </div>

          <div className="w-full max-w-md flex flex-col z-10 relative py-8 md:py-0">
            {/* Welcoming Header */}
            <header className="mb-10 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-on-surface mb-3 tracking-tight">¡Bienvenida!</h1>
              <p className="text-on-surface-variant font-medium text-lg">¿Lista para la nueva temporada? Inicia sesión abajo.</p>
            </header>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary px-2" htmlFor="email">Correo Electrónico</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
                  <input 
                    className="w-full h-14 pl-14 pr-4 bg-surface-container rounded-lg border-2 border-transparent focus:border-primary focus:ring-0 focus:bg-white transition-all text-on-surface placeholder:text-outline" 
                    id="email" 
                    placeholder="hola@alanysfashion.com" 
                    type="email" 
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-sm font-bold text-secondary" htmlFor="password">Contraseña</label>
                  <Link className="text-xs font-bold text-tertiary hover:text-primary transition-colors" href="#">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
                  <input 
                    className="w-full h-14 pl-14 pr-12 bg-surface-container rounded-lg border-2 border-transparent focus:border-primary focus:ring-0 focus:bg-white transition-all text-on-surface placeholder:text-outline" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password" 
                  />
                  <button className="absolute right-5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" type="button">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>
              
              {/* Login Button */}
              <button 
                className="w-full h-14 bg-primary text-white font-black text-lg rounded-lg shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mt-4" 
                type="submit"
              >
                Iniciar Sesión
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-12 flex items-center py-1">
              <div className="flex-grow border-t border-outline-variant"></div>
              <span className="flex-shrink mx-4 text-outline text-[10px] font-bold uppercase tracking-[0.2em]">O continúa con</span>
              <div className="flex-grow border-t border-outline-variant"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="flex-1 h-14 rounded-lg border-2 border-surface-container-highest flex items-center justify-center gap-3 hover:bg-surface-container transition-colors hover:scale-[1.02] active:scale-[0.98] group bg-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-bold text-on-surface-variant group-hover:text-on-surface">Google</span>
              </button>
              <button className="flex-1 h-14 rounded-lg border-2 border-surface-container-highest flex items-center justify-center gap-3 hover:bg-surface-container transition-colors hover:scale-[1.02] active:scale-[0.98] group bg-white">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-bold text-on-surface-variant group-hover:text-on-surface">Facebook</span>
              </button>
            </div>

            {/* Call to Action */}
            <footer className="text-center md:text-left">
              <p className="text-on-surface-variant font-medium">
                ¿Nueva por aquí? 
                <Link className="text-primary font-black hover:underline underline-offset-4 ml-1" href="#">Únete al Club</Link>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
