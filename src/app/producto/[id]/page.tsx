import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <div className="bg-background text-on-background antialiased overflow-x-hidden min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery Grid (Bento Style) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 aspect-[4/5] rounded-lg overflow-hidden shadow-sm shadow-primary/20 bouncy-hover group">
              <img 
                alt="Candy Pink Oversized Hoodie" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPu5o7O0zDdyueUHXdER65teJrdoGfMHW4IpcqKWKeuGRvIAMUYlHdGbbRsOwO353aHDrIKa9h9_bspepjqhUfy8el_UwjIP5z2p3MTuqo3WIVUytyWk45C4MPQ_ZcqTufh3giYNdNNzWEgNcK4vCmAelsiERSEWCXNM1sdWQWonQXLciW5OHblR7rMoZiOm377Jlbj_fKI58vl5yP-pD2oT3wf1z2zY3Z_UdTbFNggGOIO-zDDJuQWwPKfilyAfBwgi6RQ-smhJkA" 
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-sm shadow-secondary/20 bouncy-hover">
              <img 
                alt="Hoodie Detail" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHa2DrEo0oiqDUr6KDn1QqX9ZnoLarrYzMHL9Xj4ISwjpEXQCayaE80t-QIhhTxfoHtPBAKK8lVi7qMQHqlaBqh5YtgFLTsvoAuhW-vjdu3Xg5ySc0DFJo0skqSaLAoZhtUXEgQ7XNClSMb-jrfk2d447nLTKH6jYp-UkCOZMKKBmmMVl_lmYanINanQnrzZi5dcEWGsa51A507SyF45Qenz2WavgTMG7P1qrzqfv7-fcIHt98eCUrlVpjTVKGR8OiivXvsufGYJSb" 
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-sm shadow-secondary/20 bouncy-hover">
              <img 
                alt="Model Lifestyle" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC32a12T4atklzxBcfTwx3lt4JSauN8km4Nj2duUkQno0I74vx7lspxXe_FCnGFZajNhPlpC5OTmy-8hmPvkPqcSKIMwosm-OorhhVidaIPSgfJkq_SK22X52ABKOe1sTMasIY-R7Rqks05eH647xVBTTgnOLtk3Fuebbvpr0G9nSFLveIWtYDvX74GFRqhqCKPFHJpaqH5C_s2yxWRpFzST3uAqcX5SKbuGfzAo9fgh89s1YoVN0k1w2kmSk_Ghk2KMeo0wL5Aa5Ai" 
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-4 py-1 bg-primary-container text-on-primary-container text-xs font-bold rounded-lg uppercase tracking-wider">New Arrival</span>
                <div className="flex items-center text-tertiary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm">star_half</span>
                  <span className="ml-2 text-on-surface-variant font-medium">(128 reviews)</span>
                </div>
              </div>
              <h1 className="text-5xl font-black text-on-surface tracking-tighter leading-tight">Cotton Candy <br /><span className="text-primary">Oversized Hoodie</span></h1>
              <p className="text-2xl font-bold text-secondary mt-2">$79.00</p>
            </div>
            
            <p className="text-on-surface-variant leading-relaxed text-lg">
              Experience ultimate comfort with our signature oversized hoodie. Made from 100% organic cotton with a brushed interior that feels like a soft cloud. Perfect for making a statement while staying cozy.
            </p>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="font-bold text-on-surface uppercase text-sm tracking-widest">Select Color</h3>
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-full border-4 border-primary p-0.5 transition-transform active:scale-90">
                  <div className="w-full h-full rounded-full bg-primary"></div>
                </button>
                <button className="w-12 h-12 rounded-full border-4 border-transparent hover:border-secondary-container p-0.5 transition-transform active:scale-90">
                  <div className="w-full h-full rounded-full bg-secondary"></div>
                </button>
                <button className="w-12 h-12 rounded-full border-4 border-transparent hover:border-tertiary-container p-0.5 transition-transform active:scale-90">
                  <div className="w-full h-full rounded-full bg-tertiary"></div>
                </button>
                <button className="w-12 h-12 rounded-full border-4 border-transparent hover:border-primary-container p-0.5 transition-transform active:scale-90">
                  <div className="w-full h-full rounded-full bg-primary-container"></div>
                </button>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-on-surface uppercase text-sm tracking-widest">Select Size</h3>
                <button className="text-primary font-bold text-sm underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-8 py-3 rounded-lg border-2 border-outline-variant font-bold hover:border-primary hover:text-primary transition-all active:scale-95">XS</button>
                <button className="px-8 py-3 rounded-lg border-2 border-primary bg-primary text-on-primary font-bold transition-all active:scale-95 shadow-sm shadow-primary/30">S</button>
                <button className="px-8 py-3 rounded-lg border-2 border-outline-variant font-bold hover:border-primary hover:text-primary transition-all active:scale-95">M</button>
                <button className="px-8 py-3 rounded-lg border-2 border-outline-variant font-bold hover:border-primary hover:text-primary transition-all active:scale-95">L</button>
                <button className="px-8 py-3 rounded-lg border-2 border-outline-variant font-bold hover:border-primary hover:text-primary transition-all active:scale-95">XL</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="flex-1 bg-primary text-on-primary text-xl font-black py-5 rounded-lg shadow-sm shadow-primary/30 bouncy-hover active:scale-95 flex items-center justify-center gap-3">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                Add to Bag
              </button>
              <button className="w-16 h-16 rounded-lg border-2 border-outline-variant flex items-center justify-center text-primary hover:bg-primary-container hover:border-primary transition-all bouncy-hover">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <span className="text-sm font-medium">Free Shipping over $100</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined">restart_alt</span>
                </div>
                <span className="text-sm font-medium">30-day Free Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look Section */}
        <section className="mt-32">
          <h2 className="text-4xl font-black text-on-surface mb-12 tracking-tighter text-center">Complete <span className="text-secondary">The Look</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Related Item 1 */}
            <div className="bg-surface-container-low rounded-lg p-4 shadow-sm shadow-secondary/10 bouncy-hover group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative">
                <img 
                  alt="Matching Pink Joggers" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLDmHIv14VJBfJfylFCUwrod2js-_afAG8V1CfXFgOJhVJ-9AsNU_kWyAj4b_Ho-AAIIephItkg0DjM4ne8Vc3d4gEPMQ45ObBZ9UpMXy4whtPZHNIQXDl7lye7OgcrnmFlKEB_8Ut1kiWxuftLY5Sh4VlnaTfYRrq7kGamZeGCRFJkH6RoC9Rdc1FWF5OOr10bGoYVqwIJR04jNgk3sPZkjcIwmzMNui8BWiWR43NaP-I2HxuFSJeJDXafW3QFSq7PIPHM1D87blC" 
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <h4 className="font-bold text-on-surface">Cloud Joggers</h4>
              <p className="text-secondary font-bold">$55.00</p>
              <div className="mt-3 flex gap-1">
                <span className="w-4 h-4 rounded-full bg-primary border border-white"></span>
                <span className="w-4 h-4 rounded-full bg-tertiary border border-white"></span>
              </div>
            </div>

            {/* Related Item 2 */}
            <div className="bg-surface-container-low rounded-lg p-4 shadow-sm shadow-secondary/10 bouncy-hover group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative">
                <img 
                  alt="Lavender Beanie" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtWkSS1g-TAcX7djXicvMmji_lOk3g1ORwY4cLPX6bf8C_lewIuIlSv2Nqb7HLIjrF60C10iLuT7CYLeeJ23A1GmTZ_ifhjJrYz5h8QvWX1Vvd5XzTmAYyLgnqfaSon_lPR4aRix8-0c24yijDZU5ido51jCid3OF1lWLCNDCOs3Hr7L21gbT-wW3RFPLrFIdJB_qqe4QfbIJ1c6r3TVjSf3SCSWDKXfbqgzk69haCdGSPPobLsz-n8A7egdwTDIKbfQRx2cCkJ-EX" 
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <h4 className="font-bold text-on-surface">Knit Beanie</h4>
              <p className="text-secondary font-bold">$22.00</p>
              <div className="mt-3 flex gap-1">
                <span className="w-4 h-4 rounded-full bg-secondary border border-white"></span>
                <span className="w-4 h-4 rounded-full bg-primary-container border border-white"></span>
              </div>
            </div>

            {/* Related Item 3 */}
            <div className="bg-surface-container-low rounded-lg p-4 shadow-sm shadow-secondary/10 bouncy-hover group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative">
                <img 
                  alt="White Chunky Sneakers" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBb7-g0EkE37_O1V16gqCcMGpEFc4Qkgx8vFHvPHax2K9rcOHz0INGJZfRc2tcHmm2zPw0Sol5SbllpVX5AHYaujUCSpC4_tDqXDYpCh8DjlIOZUv4tkd9ll7Iw_gJH4eVHK8OyD26CzPf2oc9C_RTXVrMEcEsPTbfvul4HB_n_IRFaXmVPW9hWNDp2AxvkEHZIe1xToRGaH8pFKAe_d7mSY1yGeFIdchfYjMwdkn3yJFf5i9jbhvgyCaQbABNn9MhcjdpPLmMYlPt" 
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <h4 className="font-bold text-on-surface">Bubble Kicks</h4>
              <p className="text-secondary font-bold">$110.00</p>
              <div className="mt-3 flex gap-1">
                <span className="w-4 h-4 rounded-full bg-surface-container border border-white"></span>
              </div>
            </div>

            {/* Related Item 4 */}
            <div className="bg-surface-container-low rounded-lg p-4 shadow-sm shadow-secondary/10 bouncy-hover group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative">
                <img 
                  alt="Canvas Tote Bag" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJAy007zBlHhoojXoJNuVaqTsQEECjaEzDNkt-cZE3KR7tA4E_Xvo3puqVUcUaYZe9HqUEFqa-f9EluQxkv2-QmGLGtkSI-blJEghhoRwht32X0JxDDS98MLM86cAhLvGHQLMeWNP4SvV6Unds-gdUDAYcBvn5PeOss7KQrs70WZH2v8VfXVQwa5cgRyxtx0LFs-JA83zbA1ewonIFmDdHJoCtiyWk-0laeF4RULpkN6ZqN-7o418WxvWJtBUSCq0P5E8foyZiBWhC" 
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <h4 className="font-bold text-on-surface">Sweet Tote</h4>
              <p className="text-secondary font-bold">$18.00</p>
              <div className="mt-3 flex gap-1">
                <span className="w-4 h-4 rounded-full bg-outline-variant border border-white"></span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
