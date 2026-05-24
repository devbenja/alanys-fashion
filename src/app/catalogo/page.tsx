"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Catalogo() {
  const { addToCart } = useCart();
  const mockProducts = [
    {
      id: "1",
      name: "Pink Sorbet Gown",
      description: "Summer Collection • 100% Organic Cotton",
      price: "89.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI7SORgUGmrRe9tXxTbnxgpjvJfHoKTpqK--rp-CoEfJeNz9XKJaaqITeD5iOhSAcc1FqK7gBxHt9o5tiUxOLlKiRUq8tSffwUoWqCgbTdVj-nFpIgneufnB3R_1ZXjsQRNbFjzCwPkeZA6I0PUJz5NA6c_nrt4fmpnTpQTWfowmbZwUsixJkzEqnkA9gI8JgCTM5HfI2PYmjl1kVRmuume4XLo_wE_o_VBFyFPjcZ447BKZI06nj5b5Y8HzCj9rUMPK3sg_Jl_MM3",
      tag: "New Arrival",
      tagColor: "bg-tertiary-fixed text-on-tertiary-fixed"
    },
    {
      id: "2",
      name: "Lavender Dreams Bag",
      description: "Accessories • Limited Edition",
      price: "124.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdRVTJVjbdk1Ksg-PVGMPnJRNLU4IHhvUz5z9QPWqKvW8PE4PPdXEx9UIqIIW0BS1i6d7414xNuwTTRK0WRCml2Iho6YeedwsV0VBQFiBk2yPsJDh17q6zZQoZr0Ivx9OQ9QfdI3roLNktRnd-HG4rIOMH-oegRp1NilPVjGSshUSC33YJnvPzSUykwk0hUC8y4y7msNGyVIz2QpWS8b8w0zZU4fzT07tyK8xS7kQSBJcFdCUI52vB3UWo8B7yf0i_tB43V825iJPx"
    },
    {
      id: "3",
      name: "Sky High Trainers",
      description: "Footwear • Multi-color",
      price: "145.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4lkedz3XGhbkrd_tA-bdU2V7ATgUuOnlVHMltokY2GLo9ZoR_F8WJm9OgxyQB9j-oXkwWsiUVpYerB5LqHybdLuFxAUPdzPkrRPX7oGMG7EBSCV-qN_tlaSFR7-LHEj9Niz_CVa3l-r0BNJ0iF8FpfcPR1yvgWKz3-HZRkOFJoytabMmfooRyzw8ljSVhmVc3UpOdJ2jwC-yOB3-5pwfSbT5yOSSCGbhtq6iz5cGCnUKhMwEQZfFvyjkn8HwH2i3b6PCuncZ_ovmZ",
      tag: "Selling Fast",
      tagColor: "bg-secondary-fixed text-on-secondary-fixed"
    },
    {
      id: "4",
      name: "Sweet Stitch Shorts",
      description: "Denim • Embroidered",
      price: "55.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBfN42SOJx5QcTOMo2LVTI9bOTu2y1I7iin8m_1poiRF0IKL5mWWAPypBUm7dBeUmA-ADuLLVekKK4GLcd-k81iLsqx6XIBwiJbaK-d1qCHJOI2AB28KCfMyrwi1HM-5n3JYgbPA6t2l8GZAJPseHaVW6C1JoNJs1aTwLq4Kh2uqokFMnP34nXSqA1klEedSAPkEvG6sxyUbVYa-5BeMNtSF28pQLgHxpu_0QqhliSFnz_rS6hVkZE_tgQiSSPPipQGdv4kYVJEofr"
    },
    {
      id: "5",
      name: "Graphic Candy Tee",
      description: "Essentials • 100% Cotton",
      price: "32.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjd5BxV6Bo2wGzkCKgOK39FYgI5ypoKEz1YiMQ1RSwuoLyia4OF6J_lh-HtDUSA3l-8on23dv3gouE0yDvc_zlo1cPLKpnrYgXg75A-XtVDH4Npj4DMtTuI8xurA4XQqL_LPFikV7HDwZpeXrs-Z5JsW9aiqLk0dTw7JGxn0f1uDvCT6YKIHmHfI4wIiVNwa0PbrVle05kuCulON9AlOWl4askFqkQg0RN0siuyXrVW5umtJjdilJAywRHWW9o12DCFNWX5n3qifrM"
    },
    {
      id: "6",
      name: "Lemon Fizz Sundress",
      description: "Summer Sale • Light Chiffon",
      price: "49.00",
      originalPrice: "70.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZpWns0gcOCt4BMAwj7oTg0vKCB5TkcvVJPXMMFvScIlrBmywlgbbE0uUAwCJd0vmQC1VdiOARUq5UlnT2WK9k82isYn54a4AflV-5h7sXlHbEyytkSSEyeSNH-Upmux-W022O92gUAk4Jat4iTD3tI3lFZsmOE5og5KYgc5iTQco3Ngqjp89-Pc_BvmEyYukBKetkJzBSF8BEgDoxooL51RqRi4VCdnPF_rHxSslc8ef5MjNaBz6WjrnG4ytZejcpMX0a2I-Hfben",
      tag: "-30% OFF",
      tagColor: "bg-error text-on-error"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tight leading-none mb-4">
            EXPLORE <br/><span className="text-secondary">THE JOY</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg font-medium">Find your next favorite piece in our vibrant collection of playful fashion and accessories.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 space-y-8 shrink-0">
            <div className="bg-surface p-8 rounded-lg shadow-sm border border-outline-variant">
              <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">tune</span> Filters
              </h3>
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-on-surface-variant block mb-4">Category</span>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input defaultChecked className="w-5 h-5 rounded-lg border-2 border-primary text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer" type="checkbox" />
                      <span className="text-on-surface font-medium group-hover:text-primary transition-colors">Dresses</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="w-5 h-5 rounded-lg border-2 border-outline text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer" type="checkbox" />
                      <span className="text-on-surface font-medium group-hover:text-primary transition-colors">Summer Tops</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="w-5 h-5 rounded-lg border-2 border-outline text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer" type="checkbox" />
                      <span className="text-on-surface font-medium group-hover:text-primary transition-colors">Bags &amp; Totes</span>
                    </label>
                  </div>
                </div>
                {/* Color Filter */}
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-on-surface-variant block mb-4">Color Pop</span>
                  <div className="flex flex-wrap gap-3">
                    <button className="w-8 h-8 rounded-full bg-primary ring-2 ring-offset-2 ring-primary transition-transform hover:scale-110"></button>
                    <button className="w-8 h-8 rounded-full bg-secondary ring-2 ring-offset-2 ring-transparent hover:ring-secondary transition-transform hover:scale-110"></button>
                    <button className="w-8 h-8 rounded-full bg-tertiary ring-2 ring-offset-2 ring-transparent hover:ring-tertiary transition-transform hover:scale-110"></button>
                    <button className="w-8 h-8 rounded-full bg-yellow-400 ring-2 ring-offset-2 ring-transparent hover:ring-yellow-400 transition-transform hover:scale-110"></button>
                    <button className="w-8 h-8 rounded-full bg-emerald-400 ring-2 ring-offset-2 ring-transparent hover:ring-emerald-400 transition-transform hover:scale-110"></button>
                  </div>
                </div>
                {/* Price Range */}
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-on-surface-variant block mb-4">Price Range</span>
                  <input className="w-full accent-primary h-2 bg-surface-container rounded-lg appearance-none cursor-pointer" type="range" />
                  <div className="flex justify-between mt-2 text-sm font-bold text-secondary">
                    <span>$10</span>
                    <span>$250</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-container p-6 rounded-lg shadow-inner flex items-center justify-center text-center relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-on-primary-container font-black text-xl leading-tight">JOIN THE CLUB<br/>GET 20% OFF</p>
                <button className="mt-4 px-6 py-2 bg-surface text-primary font-bold rounded-lg hover:shadow-lg transition-all active:scale-95">Sign Up</button>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-on-primary-container/20 text-8xl group-hover:rotate-12 transition-transform">celebration</span>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-on-surface-variant font-medium">Showing <span className="text-on-surface font-bold">6 items</span></p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-on-surface-variant">Sort by:</span>
                <select className="bg-surface border border-outline-variant rounded-lg py-2 px-6 shadow-sm font-bold text-on-surface focus:ring-primary text-sm cursor-pointer">
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {mockProducts.map((product) => (
                <div key={product.id} className="group bg-surface rounded-lg p-4 shadow-sm border border-outline-variant flex flex-col bouncy-hover cursor-pointer relative">
                  <Link href={`/producto/${product.id}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View {product.name}</span>
                  </Link>
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-surface-container">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={product.name} 
                      src={product.image} 
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-on-primary transition-colors z-20">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                    {product.tag && (
                      <div className="absolute bottom-4 left-4">
                        <span className={`px-4 py-1 text-xs font-bold rounded-lg ${product.tagColor}`}>{product.tag}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-on-surface mb-1">{product.name}</h3>
                    <p className="text-on-surface-variant text-sm mb-4 font-medium">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-2xl font-black text-secondary">
                        ${product.price}
                        {product.originalPrice && <span className="text-sm line-through text-on-surface-variant opacity-60 ml-2">${product.originalPrice}</span>}
                      </span>
                      <button 
                        className="px-6 py-2 bg-primary text-on-primary font-bold rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 z-20 relative"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          });
                        }}
                      >
                        <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>add_shopping_cart</span>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center gap-3">
              <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface text-on-surface-variant font-bold border-2 border-transparent hover:border-primary transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold shadow-sm">1</button>
              <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface text-on-surface-variant font-bold border-2 border-transparent hover:border-primary transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
