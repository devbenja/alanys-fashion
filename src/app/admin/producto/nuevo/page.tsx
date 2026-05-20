import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AgregarProductoAdmin() {
  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed flex flex-col">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-1 w-full">
        {/* Page Header */}
        <header className="mb-12">
          <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-6 font-medium font-dm-sans">
            <Link className="hover:text-primary transition-colors" href="#">Inventario</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-secondary font-bold">Agregar Nuevo Producto</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tight leading-none mb-4">
            CREAR NUEVO <span className="text-secondary">PRODUCTO</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg font-medium">Define la apariencia de tu producto, precio y variantes.</p>
        </header>

        <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Primary Details */}
          <div className="col-span-1 lg:col-span-8 space-y-8">
            {/* Basic Info Card */}
            <div className="bg-surface p-8 rounded-lg border border-outline-variant shadow-sm">
              <h2 className="font-h2 text-xl mb-6 text-secondary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">edit_document</span>
                Detalles del Producto
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-sm">Título del Producto</label>
                  <input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" placeholder="ej. Blusa de Seda" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-sm">Descripción</label>
                  <textarea className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" placeholder="Describe la tela, el ajuste y las sensaciones de esta prenda..." rows={6}></textarea>
                </div>
              </div>
            </div>

            {/* Media Upload Card */}
            <div className="bg-surface p-8 rounded-lg border border-outline-variant shadow-sm">
              <h2 className="font-h2 text-xl mb-6 text-secondary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">image</span>
                Imágenes del Producto
              </h2>
              <div className="border-2 border-dashed border-outline-variant rounded-xl p-12 text-center bg-surface-container group hover:bg-surface-container-high transition-colors cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                  </div>
                  <h3 className="font-h2 text-lg text-on-surface font-bold">Arrastra y suelta tus imágenes aquí</h3>
                  <p className="text-on-surface-variant mt-2 text-sm">Soporta PNG, JPG, o WEBP de hasta 10MB cada una</p>
                  <button className="mt-6 px-6 py-2 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all" type="button">Buscar Archivos</button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="aspect-square rounded-lg bg-surface-container border border-outline-variant overflow-hidden relative group">
                  <img className="w-full h-full object-cover" alt="Image 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXtI5P0OchCdNuVKeiXs39L_YxZG1H6mY6j5r91_SkKDxLPEklTMgHAgHBMtX0irRvFu5mkrCqYjPxP6uqgzJrka3D1ej2DZ0en1LetMqR77bpiUSbX-HlfDzO_6ZR6CRpESHNmpIjU1V3I45cRReU7FjSvnhIZpaY4SToH5PVzKH78qQR7UiOQ8b4w_g0oUtoZtBv6kOe9d_Xj0SafaU-WZMWCNXuq0i9GUdHOLq2ljA-XLpFHO02dFLiViesW7LqGMApO50dMTI" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <button type="button" className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
                <div className="aspect-square rounded-lg bg-surface-container border border-outline-variant overflow-hidden relative group">
                  <img className="w-full h-full object-cover" alt="Image 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFKonq5UjUDmQrIL1NrBavOFV72oUcD8-1I-qd7guau3XTPWeF3uZ-5EBlHA32q4stbmbh5EqN5OsQC2nb7cnefXIl7kHHXio-j44jNUYeduY-YPHDA-oECxeNl_MwXwqITYOKZeth0W2y3SXXHHr3Fe1MtauAKnCLYB-GiFXCXyqeVohtxWzs6s_GyjioUpykFmYXbjKKChjPo8pfWDKnJ5GTdY9qGUvR0NdOw1st5JLfFUzOrkH0EAvqE_WYK68oQQ5SNZdx1uQ" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <button type="button" className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
                <div className="aspect-square rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-primary cursor-pointer hover:bg-surface-container transition-colors group">
                  <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-3xl">add</span>
                     <span className="text-xs font-bold uppercase tracking-wider">Añadir Más</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Variants Card */}
            <div className="bg-surface p-8 rounded-lg border border-outline-variant shadow-sm">
              <h2 className="font-h2 text-xl mb-6 text-secondary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">style</span>
                Variantes y Opciones
              </h2>
              <div className="space-y-8">
                {/* Size Variant */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-sm">Tallas Disponibles</label>
                    <button className="text-xs text-primary font-bold hover:underline" type="button">Gestionar Tallas</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <label className="relative cursor-pointer">
                      <input defaultChecked className="peer sr-only" type="checkbox" />
                      <div className="w-12 h-12 flex items-center justify-center border-2 border-outline-variant rounded-lg text-sm font-bold text-on-surface-variant peer-checked:bg-primary peer-checked:border-primary peer-checked:text-on-primary hover:border-primary transition-all">S</div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input defaultChecked className="peer sr-only" type="checkbox" />
                      <div className="w-12 h-12 flex items-center justify-center border-2 border-outline-variant rounded-lg text-sm font-bold text-on-surface-variant peer-checked:bg-primary peer-checked:border-primary peer-checked:text-on-primary hover:border-primary transition-all">M</div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input defaultChecked className="peer sr-only" type="checkbox" />
                      <div className="w-12 h-12 flex items-center justify-center border-2 border-outline-variant rounded-lg text-sm font-bold text-on-surface-variant peer-checked:bg-primary peer-checked:border-primary peer-checked:text-on-primary hover:border-primary transition-all">L</div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input className="peer sr-only" type="checkbox" />
                      <div className="w-12 h-12 flex items-center justify-center border-2 border-outline-variant rounded-lg text-sm font-bold text-on-surface-variant peer-checked:bg-primary peer-checked:border-primary peer-checked:text-on-primary hover:border-primary transition-all">XL</div>
                    </label>
                  </div>
                </div>

                {/* Color Variant */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-sm">Colores Disponibles</label>
                    <button className="text-xs text-primary font-bold hover:underline" type="button">+ Añadir Color</button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 p-2 pr-4 border border-outline-variant rounded-full bg-background group cursor-pointer hover:border-primary transition-all shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-primary shadow-inner"></div>
                      <span className="text-xs font-bold text-on-surface">Rosa Suave</span>
                      <span className="material-symbols-outlined text-xs text-on-surface-variant group-hover:text-error">close</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 pr-4 border border-outline-variant rounded-full bg-background group cursor-pointer hover:border-primary transition-all shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-secondary shadow-inner"></div>
                      <span className="text-xs font-bold text-on-surface">Azul Océano</span>
                      <span className="material-symbols-outlined text-xs text-on-surface-variant group-hover:text-error">close</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 pr-4 border border-outline-variant rounded-full bg-background group cursor-pointer hover:border-primary transition-all shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-tertiary shadow-inner"></div>
                      <span className="text-xs font-bold text-on-surface">Verde Oliva</span>
                      <span className="material-symbols-outlined text-xs text-on-surface-variant group-hover:text-error">close</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Pricing */}
          <div className="col-span-1 lg:col-span-4 space-y-8">
            {/* Classification Card */}
            <div className="bg-surface p-8 rounded-lg border border-outline-variant shadow-sm">
              <h2 className="font-h2 text-xl mb-6 text-secondary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">category</span>
                Organización
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-sm">Categoría</label>
                  <div className="relative">
                    <select className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md appearance-none cursor-pointer">
                      <option>Vestidos</option>
                      <option>Tops</option>
                      <option>Abrigos</option>
                      <option>Accesorios</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-sm">Estado</label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1">
                      <input defaultChecked className="peer sr-only" name="status" type="radio" />
                      <div className="text-center py-2 border-2 border-outline-variant rounded-lg text-sm font-bold text-on-surface-variant peer-checked:bg-primary peer-checked:border-primary peer-checked:text-on-primary transition-all cursor-pointer hover:border-primary">ACTIVO</div>
                    </label>
                    <label className="flex-1">
                      <input className="peer sr-only" name="status" type="radio" />
                      <div className="text-center py-2 border-2 border-outline-variant rounded-lg text-sm font-bold text-on-surface-variant peer-checked:bg-primary peer-checked:border-primary peer-checked:text-on-primary transition-all cursor-pointer hover:border-primary">BORRADOR</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Stock Card */}
            <div className="bg-surface p-8 rounded-lg border border-outline-variant shadow-sm">
              <h2 className="font-h2 text-xl mb-6 text-secondary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">sell</span>
                Precios e Inventario
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-sm">Precio Base ($)</label>
                  <div className="relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">$</span>
                     <input className="w-full bg-background border border-outline-variant rounded-lg pl-8 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" placeholder="0.00" type="number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-sm">Precio de Oferta ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">$</span>
                    <input className="w-full bg-background border border-outline-variant rounded-lg pl-8 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" placeholder="0.00" type="number" />
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 italic">Deja en blanco si no hay oferta activa</p>
                </div>
                
                <hr className="border-outline-variant/30" />
                
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-sm">Cantidad en Stock</label>
                  <div className="relative">
                    <input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" placeholder="0" type="number" defaultValue="10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Sidebar */}
            <div className="space-y-4 pt-4">
              <button className="w-full py-4 bg-primary text-on-primary rounded-lg font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all text-lg flex items-center justify-center gap-2" type="submit">
                <span className="material-symbols-outlined text-xl">save</span>
                Guardar Producto
              </button>
              <button className="w-full py-4 border-2 border-outline-variant text-on-surface-variant rounded-lg font-bold hover:bg-surface-container transition-all" type="button">Cancelar</button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
