import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function GestionProductosAdmin() {
  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed flex flex-col">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-1 w-full">
        {/* Main Content Area */}
        <section className="w-full">
            <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
                <div>
                    <h1 className="font-h1 text-4xl md:text-5xl font-black text-primary tracking-tight leading-none mb-2">
                        GESTIÓN DE <span className="text-secondary">INVENTARIO</span>
                    </h1>
                    <p className="text-lg text-on-surface-variant max-w-lg font-medium">Gestiona tu colección de ropa y monitorea los niveles de stock en todas las categorías.</p>
                </div>
                <Link href="/admin/producto/nuevo" className="bg-primary text-on-primary font-bold py-3 px-6 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all whitespace-nowrap">
                    <span className="material-symbols-outlined">add</span>
                    Agregar Producto
                </Link>
            </div>
            
            {/* Filters Bar */}
            <div className="bg-surface rounded-xl p-4 border border-outline-variant flex flex-wrap gap-6 items-center mb-8 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="text-label-caps text-on-surface-variant font-bold uppercase tracking-wider text-sm">Categoría</span>
                    <div className="relative">
                        <select className="bg-background border border-outline-variant rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-primary outline-none min-w-[180px] appearance-none cursor-pointer">
                            <option>Todas las Categorías</option>
                            <option>Vestidos</option>
                            <option>Abrigos</option>
                            <option>Knitwear</option>
                            <option>Accesorios</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-sm">expand_more</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-label-caps text-on-surface-variant font-bold uppercase tracking-wider text-sm">Estado</span>
                    <div className="relative">
                        <select className="bg-background border border-outline-variant rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-primary outline-none min-w-[180px] appearance-none cursor-pointer">
                            <option>Todos los Estados</option>
                            <option>En Stock</option>
                            <option>Poco Stock</option>
                            <option>Agotado</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-sm">expand_more</span>
                    </div>
                </div>
                <div className="ml-auto text-sm text-on-surface-variant font-medium">
                    Mostrando <strong className="text-on-surface font-bold">24</strong> de 142 productos
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left whitespace-nowrap">
                        <thead>
                            <tr className="bg-surface-container border-b border-outline-variant">
                                <th className="px-6 py-4 font-label-caps font-bold text-on-surface-variant text-xs uppercase tracking-wider">Imagen</th>
                                <th className="px-6 py-4 font-label-caps font-bold text-on-surface-variant text-xs uppercase tracking-wider">Nombre del Producto</th>
                                <th className="px-6 py-4 font-label-caps font-bold text-on-surface-variant text-xs uppercase tracking-wider">Categoría</th>
                                <th className="px-6 py-4 font-label-caps font-bold text-on-surface-variant text-xs uppercase tracking-wider">Precio</th>
                                <th className="px-6 py-4 font-label-caps font-bold text-on-surface-variant text-xs uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 font-label-caps font-bold text-on-surface-variant text-xs uppercase tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {/* Row 1 */}
                            <tr className="hover:bg-surface-container transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-16 rounded-lg bg-surface-container overflow-hidden border border-outline-variant shadow-sm">
                                        <img alt="Silk Wrap Dress" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj2IU5hK0vHV_0NcHRyTaC7u_14YcwCZKKQ633LrIjUcWhGrVjl99PEZCCzTpaebOPTLI8O3d7NWhHJr6EWxmk_cwZKLB6EBml-1FP0ow39fyO1zGFgp4xNcIMgUWPAjZPHJsF7UF_lFMpdKf9YpIleKHT-pe5IXKXJe-8dgfy3_3lxj6PWKjV8Jk1-PRLjm60uQ-C0wZgk5yEACQ3DVXOs1U7gm0UyECpx9njgB12rcFDuB75mH8W5FmAuOiK2260PJHev6EXJHA" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-bold text-on-surface block text-[15px]">Vestido Cruzado de Seda</span>
                                    <span className="text-xs text-on-surface-variant font-medium">SKU: DR-2024-001</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-secondary/10 border border-secondary/20 text-secondary px-3 py-1.5 rounded-full text-xs font-bold inline-block">Vestidos</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-on-surface text-[15px]">$189.00</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-16 bg-surface-container-high rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[80%] rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-bold text-on-surface">42</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-all">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-all">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-surface-container transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-16 rounded-lg bg-surface-container overflow-hidden border border-outline-variant shadow-sm">
                                        <img alt="Cashmere Oversized Sweater" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1gA7aSD4BKstZj-vv17OcPXoKRR4-ntpcmS-tShdeoXD6JxwcoEwvVTlpnkCf23sS9gDWTqlSE037qiYNOqG58Y8eBm0v-o2ebmQhjD9YTFDV7uVTjjgiJrm38IZaAsV5-mY2LDd3n9vsOcyvl7ik64TDEvXjKar11M43uDEo9NNhizmmv4UVt8Khh-RaclAQUwZTYVs402WObGVIbcigbXVVGfmW9OS2Khogj5suVwDKhpCPPTdroTqU_r57wVKyiHsB7RGDkko" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-bold text-on-surface block text-[15px]">Suéter de Cachemira Oversize</span>
                                    <span className="text-xs text-on-surface-variant font-medium">SKU: KN-2024-042</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-tertiary/10 border border-tertiary/20 text-tertiary px-3 py-1.5 rounded-full text-xs font-bold inline-block">Knitwear</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-on-surface text-[15px]">$245.00</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-16 bg-surface-container-high rounded-full overflow-hidden">
                                            <div className="h-full bg-error w-[15%] rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-bold text-error">3</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-all">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-all">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="hover:bg-surface-container transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-16 rounded-lg bg-surface-container overflow-hidden border border-outline-variant shadow-sm">
                                        <img alt="Linen Blend Trench" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCam34hE5NkGfObC9GB6NUCOxwTTYGEqcKtpa6AjRBFvGYInSySuodw73MHh4u3o5_4olnmuuERgMFt-tLBeed2dpmpD4x2U41jZqZy25AvRIltHog0hvEBESkbHhWXokofUXkhZxC32JAlnTmRCf58Jsgt-mrVbyamriv5mZZpO8mKrgrIM210Y51XZ6pxyqgL3DVKpEuEoAMpJikQWlEcRiZ0OVAMEE7uidaeB54JpsWnvEepfMudBX6_1uBxLy-xjTUFwBx6298" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-bold text-on-surface block text-[15px]">Trench de Lino</span>
                                    <span className="text-xs text-on-surface-variant font-medium">SKU: OW-2024-088</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-secondary/10 border border-secondary/20 text-secondary px-3 py-1.5 rounded-full text-xs font-bold inline-block">Abrigos</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-on-surface text-[15px]">$310.00</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-16 bg-surface-container-high rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[55%] rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-bold text-on-surface">18</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-all">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-all">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {/* Row 4 */}
                            <tr className="hover:bg-surface-container transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-16 rounded-lg bg-surface-container overflow-hidden border border-outline-variant shadow-sm">
                                        <img alt="Velvet Choker Set" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjGuOlQMInaRSaxYTIr_Xlg9nNKSvhO1rPFFijX2fgZkRNMsUudNIwl5lHiaaFbiXck4BjhLtdMD2Hc-vF2KT4zIWJ50HkpkmGS_JWUQT6tGuSUlImVm4aJGLU3t2p_3ytgOkemEyV8wbLcMr0FhOSkvIsGr0ah8REqOHiuUQeoRdRR2RUUwyri9qn5DTZiTgY5Z8ceY55sNR_iLo2VYR7Sq89-7K_TjhbawZl_gxdCy9_1L1A8x9UigaXS3R6imDfCJC-InA2n5k" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-bold text-on-surface block text-[15px]">Set de Gargantilla de Terciopelo</span>
                                    <span className="text-xs text-on-surface-variant font-medium">SKU: AC-2024-012</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-bold inline-block">Accesorios</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-on-surface text-[15px]">$45.00</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-16 bg-surface-container-high rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[100%] rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-bold text-on-surface">124</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-all">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-all">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="px-6 py-4 bg-surface border-t border-outline-variant flex items-center justify-between">
                    <button className="px-4 py-2 border-2 border-outline-variant text-on-surface-variant rounded-lg text-sm font-bold hover:bg-surface-container transition-colors disabled:opacity-50" disabled>Anterior</button>
                    <div className="flex gap-2">
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-on-primary text-sm font-bold shadow-sm">1</button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold text-on-surface-variant hover:bg-surface-container border border-transparent hover:border-outline-variant transition-all">2</button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold text-on-surface-variant hover:bg-surface-container border border-transparent hover:border-outline-variant transition-all">3</button>
                        <span className="flex items-center justify-center px-2 text-on-surface-variant">...</span>
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold text-on-surface-variant hover:bg-surface-container border border-transparent hover:border-outline-variant transition-all">12</button>
                    </div>
                    <button className="px-4 py-2 border-2 border-outline-variant text-on-surface-variant rounded-lg text-sm font-bold hover:bg-surface-container transition-colors">Siguiente</button>
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
