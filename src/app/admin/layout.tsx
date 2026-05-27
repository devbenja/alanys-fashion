"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'admin')) {
      router.replace('/');
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-on-surface-variant gap-4 font-['DM_Sans']">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="font-bold text-lg text-primary">Cargando Panel de Administración...</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null; // Evita el parpadeo de contenido mientras redirige
  }

  const getLinkClass = (href: string) => {
    const isActive = href === '/admin'
      ? pathname === href
      : pathname === href || pathname.startsWith(href + '/');

    return isActive
      ? "flex items-center gap-4 px-5 py-4 text-on-primary-container bg-primary-container rounded-xl font-bold transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
      : "flex items-center gap-4 px-5 py-4 text-on-surface-variant hover:bg-surface-container-high hover:text-primary font-medium transition-all duration-200 rounded-xl hover:scale-[1.02] active:scale-[0.98]";
  };

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen flex">
      {/* SideNavBar */}
      <aside className="h-screen w-72 fixed left-0 top-0 border-r border-outline-variant bg-surface/80 backdrop-blur-xl flex flex-col p-6 z-50 shadow-sm">
        <div className="mb-12 px-4 mt-2">
          <h1 className="text-3xl font-black tracking-tighter text-primary">AlanysFashion</h1>
          <p className="text-sm text-on-surface-variant font-medium mt-1">Panel de Administración</p>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/admin" className={getLinkClass('/admin')}>
            <span className="material-symbols-outlined text-lg">dashboard</span>
            <span className="font-dm-sans text-base tracking-tight">Panel de Control</span>
          </Link>
          <Link href="/admin/producto" className={getLinkClass('/admin/producto')}>
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            <span className="font-dm-sans text-base tracking-tight">Inventario</span>
          </Link>
          <Link href="/admin/categorias" className={getLinkClass('/admin/categorias')}>
            <span className="material-symbols-outlined text-lg">category</span>
            <span className="font-dm-sans text-base tracking-tight">Categorías</span>
          </Link>
          <Link href="/admin/pedidos" className={getLinkClass('/admin/pedidos')}>
            <span className="material-symbols-outlined text-lg">shopping_cart</span>
            <span className="font-dm-sans text-base tracking-tight">Pedidos</span>
          </Link>
          <Link href="#" className={getLinkClass('#clientes')}>
            <span className="material-symbols-outlined text-lg">group</span>
            <span className="font-dm-sans text-base tracking-tight">Clientes</span>
          </Link>
          <Link href="#" className={getLinkClass('#marketing')}>
            <span className="material-symbols-outlined text-lg">campaign</span>
            <span className="font-dm-sans text-base tracking-tight">Marketing</span>
          </Link>
          <Link href="#" className={getLinkClass('#analiticas')}>
            <span className="material-symbols-outlined text-lg">monitoring</span>
            <span className="font-dm-sans text-base tracking-tight">Analíticas</span>
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant space-y-2 mb-2">
          <Link href="#" className="flex items-center gap-4 px-5 py-4 text-on-surface-variant hover:bg-surface-container-high hover:text-primary font-medium transition-all duration-200 rounded-xl">
            <span className="material-symbols-outlined text-lg">help</span>
            <span className="font-dm-sans text-base tracking-tight">Centro de Ayuda</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-5 py-4 text-on-surface-variant hover:bg-surface-container-high hover:text-primary font-medium transition-all duration-200 rounded-xl">
            <span className="material-symbols-outlined text-lg">logout</span>
            <span className="font-dm-sans text-base tracking-tight">Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col w-full pl-72">
        {/* TopNavBar */}
        <header className="w-full top-0 sticky z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm flex justify-end h-20 px-10">
          <div className="flex items-center gap-6">
            <button className="hover:bg-surface-container-high text-primary rounded-full p-3 transition-all flex items-center justify-center active:scale-95">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <button className="hover:bg-surface-container-high text-primary rounded-full p-3 transition-all flex items-center justify-center active:scale-95">
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>

            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-outline-variant cursor-pointer hover:scale-105 transition-transform shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Perfil de Administrador"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY1rzF_jC7AhB6pL-kqUJab5DiPh881QVF7SUuUb34s2wJvC8ZPBPAhqNaH20_n9AavkZwQR4u1wNMvH0YIPbWmQGdth7sVBow09r8-p9rWGIojan0P2PwPvWTnd5IOyOudov7TSoNg_v4cxX-94xAsKMkwrowZ8yaCQumt8J_mw6J_dCLyhiDy6NAgo7IYI8XvKI2wMqUyzNG3E_LBq22zwxcgy_VrHMnh61gYNgj9F6N-gra5kaSErAMdYOY6gZdH1wh_Q4Vp-I"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full p-10 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
