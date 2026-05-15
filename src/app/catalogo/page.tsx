import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getProducts() {
  try {
    const res = await fetch('http://localhost:3000/api/v1/products', { cache: 'no-store' });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch('http://localhost:3000/api/v1/categories', { cache: 'no-store' });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Catalogo() {
  const products = await getProducts();
  const categories = await getCategories();

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
                    {categories.length > 0 ? categories.map((cat: any) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 rounded-lg border-2 border-outline text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer" type="checkbox" />
                        <span className="text-on-surface font-medium group-hover:text-primary transition-colors">{cat.name}</span>
                      </label>
                    )) : (
                      <p className="text-sm text-on-surface-variant">No categories found.</p>
                    )}
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
              <p className="text-on-surface-variant font-medium">Showing <span className="text-on-surface font-bold">{products.length} items</span></p>
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
              {products.length > 0 ? products.map((product: any) => (
                <div key={product.id} className="group bg-surface rounded-lg p-4 shadow-sm border border-outline-variant flex flex-col bouncy-hover">
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-surface-container">
                    {/* Placeholder image if product.images is empty */}
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={product.name} 
                      src={product.images && product.images.length > 0 ? product.images[0].imageUrl : "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                    {product.status === 'new' && (
                      <div className="absolute bottom-4 left-4">
                        <span className="px-4 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold rounded-lg">New Arrival</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-on-surface mb-1">{product.name}</h3>
                    <p className="text-on-surface-variant text-sm mb-4 font-medium">{product.category?.name || 'Uncategorized'} • {product.description.substring(0, 30)}...</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-2xl font-black text-secondary">${Number(product.price).toFixed(2)}</span>
                      <button className="px-6 py-2 bg-primary text-on-primary font-bold rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>add_shopping_cart</span>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-12 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-4 block">inventory_2</span>
                  <p className="text-lg">No products found. Start by adding some via the backend!</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {products.length > 0 && (
              <div className="mt-16 flex justify-center gap-3">
                <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface text-on-surface-variant font-bold border-2 border-transparent hover:border-primary transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold shadow-sm">1</button>
                <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface text-on-surface-variant font-bold border-2 border-transparent hover:border-primary transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
