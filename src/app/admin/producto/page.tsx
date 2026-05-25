import React from 'react';
import Link from 'next/link';

export default function GestionProductosAdmin() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 relative pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-3">Gestión de Inventario</h2>
          <p className="text-lg text-on-surface-variant font-medium">Gestiona tu colección de ropa y monitorea los niveles de stock en todas las categorías.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/producto/nuevo" className="bg-[#F4C2D7] text-on-primary-container px-6 py-3 rounded-xl text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span>
            Agregar Producto
          </Link>
        </div>
      </div>
      
      {/* Filters Area */}
      <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm space-y-6">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-3 px-5 py-3 bg-surface-container-high rounded-xl min-w-[200px] border border-outline-variant focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">filter_list</span>
            <select className="bg-transparent border-none text-base font-medium focus:ring-0 w-full text-on-surface outline-none cursor-pointer">
              <option>Todas las Categorías</option>
              <option>Vestidos</option>
              <option>Abrigos</option>
              <option>Knitwear</option>
              <option>Accesorios</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3 bg-surface-container-high rounded-xl min-w-[200px] border border-outline-variant focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">tune</span>
            <select className="bg-transparent border-none text-base font-medium focus:ring-0 w-full text-on-surface outline-none cursor-pointer">
              <option>Todos los Estados</option>
              <option>En Stock</option>
              <option>Poco Stock</option>
              <option>Agotado</option>
            </select>
          </div>
          
          <div className="ml-auto text-base text-on-surface-variant font-medium">
            Mostrando <strong className="text-on-surface font-bold">24</strong> de 142 productos
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-surface rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant">
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Imagen</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Nombre del Producto</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Categoría</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Precio</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Stock</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6">
                  <div className="w-12 h-16 rounded-lg bg-surface-container overflow-hidden border border-outline-variant shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Silk Wrap Dress" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj2IU5hK0vHV_0NcHRyTaC7u_14YcwCZKKQ633LrIjUcWhGrVjl99PEZCCzTpaebOPTLI8O3d7NWhHJr6EWxmk_cwZKLB6EBml-1FP0ow39fyO1zGFgp4xNcIMgUWPAjZPHJsF7UF_lFMpdKf9YpIleKHT-pe5IXKXJe-8dgfy3_3lxj6PWKjV8Jk1-PRLjm60uQ-C0wZgk5yEACQ3DVXOs1U7gm0UyECpx9njgB12rcFDuB75mH8W5FmAuOiK2260PJHev6EXJHA" />
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="font-bold text-on-surface block text-[15px]">Vestido Cruzado de Seda</span>
                  <span className="text-xs text-on-surface-variant font-medium">SKU: DR-2024-001</span>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-secondary/10 border border-secondary/20 text-secondary px-3 py-1.5 rounded-full text-xs font-bold inline-block">Vestidos</span>
                </td>
                <td className="px-8 py-6 font-bold text-on-surface text-[15px]">$189.00</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-16 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[80%] rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-on-surface">42</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
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
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6">
                  <div className="w-12 h-16 rounded-lg bg-surface-container overflow-hidden border border-outline-variant shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Cashmere Oversized Sweater" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1gA7aSD4BKstZj-vv17OcPXoKRR4-ntpcmS-tShdeoXD6JxwcoEwvVTlpnkCf23sS9gDWTqlSE037qiYNOqG58Y8eBm0v-o2ebmQhjD9YTFDV7uVTjjgiJrm38IZaAsV5-mY2LDd3n9vsOcyvl7ik64TDEvXjKar11M43uDEo9NNhizmmv4UVt8Khh-RaclAQUwZTYVs402WObGVIbcigbXVVGfmW9OS2Khogj5suVwDKhpCPPTdroTqU_r57wVKyiHsB7RGDkko" />
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="font-bold text-on-surface block text-[15px]">Suéter de Cachemira Oversize</span>
                  <span className="text-xs text-on-surface-variant font-medium">SKU: KN-2024-042</span>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-tertiary/10 border border-tertiary/20 text-tertiary px-3 py-1.5 rounded-full text-xs font-bold inline-block">Knitwear</span>
                </td>
                <td className="px-8 py-6 font-bold text-on-surface text-[15px]">$245.00</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-16 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-error w-[15%] rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-error">3</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
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
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6">
                  <div className="w-12 h-16 rounded-lg bg-surface-container overflow-hidden border border-outline-variant shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Linen Blend Trench" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCam34hE5NkGfObC9GB6NUCOxwTTYGEqcKtpa6AjRBFvGYInSySuodw73MHh4u3o5_4olnmuuERgMFt-tLBeed2dpmpD4x2U41jZqZy25AvRIltHog0hvEBESkbHhWXokofUXkhZxC32JAlnTmRCf58Jsgt-mrVbyamriv5mZZpO8mKrgrIM210Y51XZ6pxyqgL3DVKpEuEoAMpJikQWlEcRiZ0OVAMEE7uidaeB54JpsWnvEepfMudBX6_1uBxLy-xjTUFwBx6298" />
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="font-bold text-on-surface block text-[15px]">Trench de Lino</span>
                  <span className="text-xs text-on-surface-variant font-medium">SKU: OW-2024-088</span>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-secondary/10 border border-secondary/20 text-secondary px-3 py-1.5 rounded-full text-xs font-bold inline-block">Abrigos</span>
                </td>
                <td className="px-8 py-6 font-bold text-on-surface text-[15px]">$310.00</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-16 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[55%] rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-on-surface">18</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
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
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6">
                  <div className="w-12 h-16 rounded-lg bg-surface-container overflow-hidden border border-outline-variant shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Velvet Choker Set" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjGuOlQMInaRSaxYTIr_Xlg9nNKSvhO1rPFFijX2fgZkRNMsUudNIwl5lHiaaFbiXck4BjhLtdMD2Hc-vF2KT4zIWJ50HkpkmGS_JWUQT6tGuSUlImVm4aJGLU3t2p_3ytgOkemEyV8wbLcMr0FhOSkvIsGr0ah8REqOHiuUQeoRdRR2RUUwyri9qn5DTZiTgY5Z8ceY55sNR_iLo2VYR7Sq89-7K_TjhbawZl_gxdCy9_1L1A8x9UigaXS3R6imDfCJC-InA2n5k" />
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="font-bold text-on-surface block text-[15px]">Set de Gargantilla de Terciopelo</span>
                  <span className="text-xs text-on-surface-variant font-medium">SKU: AC-2024-012</span>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-bold inline-block">Accesorios</span>
                </td>
                <td className="px-8 py-6 font-bold text-on-surface text-[15px]">$45.00</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-16 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[100%] rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-on-surface">124</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
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
        <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between bg-surface-container-lowest border-t border-outline-variant gap-4">
          <span className="text-base font-medium text-on-surface-variant">Mostrando 1 a 4 de 142 productos</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-surface border-2 border-outline-variant rounded-xl text-on-surface-variant hover:text-primary hover:border-primary transition-colors disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-xl align-middle">chevron_left</span>
            </button>
            <button className="px-4 py-2 bg-[#F4C2D7] text-on-primary-container font-bold rounded-xl shadow-sm">1</button>
            <button className="px-4 py-2 bg-surface border-2 border-transparent text-on-surface font-medium rounded-xl hover:bg-surface-container-high transition-colors">2</button>
            <button className="px-4 py-2 bg-surface border-2 border-transparent text-on-surface font-medium rounded-xl hover:bg-surface-container-high transition-colors">3</button>
            <span className="px-2 py-2 text-on-surface-variant font-bold">...</span>
            <button className="px-4 py-2 bg-surface border-2 border-transparent text-on-surface font-medium rounded-xl hover:bg-surface-container-high transition-colors">12</button>
            <button className="px-4 py-2 bg-surface border-2 border-outline-variant rounded-xl text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-xl align-middle">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
