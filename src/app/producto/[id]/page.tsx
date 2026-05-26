"use client";

import React, { useState, useEffect, use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { productsApi, Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';

// Helper to provide premium images on the frontend dynamically as fallback
function getProductFallbackImage(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('vestido')) {
    return 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  if (n.includes('sueter') || n.includes('cachemira') || n.includes('knitwear')) {
    return 'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  if (n.includes('lino') || n.includes('trench') || n.includes('abrigo')) {
    return 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  return 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Interaction States
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productsApi.getById(id);
        if (response.success && response.data) {
          const prodData = response.data;
          setProduct(prodData);

          // Configure initial states based on variations
          if (prodData.images && prodData.images.length > 0) {
            const mainImg = prodData.images.find(img => img.isMain)?.imageUrl || prodData.images[0].imageUrl;
            setActiveImage(mainImg);
          } else {
            setActiveImage(getProductFallbackImage(prodData.name));
          }

          if (prodData.sizes && prodData.sizes.length > 0) {
            setSelectedSize(prodData.sizes[0].size);
          }

          if (prodData.colors && prodData.colors.length > 0) {
            setSelectedColor(prodData.colors[0].colorName);
          }
        } else {
          setError(response.message || 'Error al cargar el detalle del producto.');
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
        setError('Error al establecer conexión con el servidor.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToBag = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? product.price : product.price.toString(),
      image: activeImage,
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(null as any), 3000);
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="py-40 flex flex-col items-center justify-center text-on-surface-variant gap-4 flex-1">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="font-bold">Cargando detalles de moda...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-background min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="py-40 text-center space-y-4 flex-1 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-error">search_off</span>
          <h2 className="text-3xl font-black text-primary">Producto no disponible</h2>
          <p className="text-on-surface-variant max-w-md">{error || 'El producto solicitado podría no existir.'}</p>
          <Link href="/catalogo" className="mt-4 px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-sm">
            Volver al Catálogo
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background antialiased overflow-x-hidden min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        {addedSuccess && (
          <div className="mb-8 p-4 bg-primary-container text-on-primary-container rounded-xl flex items-center gap-3 border border-primary/20 animate-pulse font-bold">
            <span className="material-symbols-outlined">check_circle</span>
            ¡Añadido a tu carrito con éxito!
          </div>
        )}

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery Grid (Dynamic Thumbnail Switcher) */}
          <div className="flex flex-col gap-6">
            <div className="col-span-2 aspect-[4/5] rounded-xl overflow-hidden shadow-md shadow-primary/10 bouncy-hover group relative bg-surface-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={activeImage} 
              />
            </div>
            
            {/* Gallery Thumbnails List */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto py-2">
                {product.images.map((img) => (
                  <button 
                    key={img.id}
                    onClick={() => setActiveImage(img.imageUrl)}
                    className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-surface-container shrink-0 ${activeImage === img.imageUrl ? 'border-primary shadow-sm scale-95' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      alt="Miniatura" 
                      className="w-full h-full object-cover" 
                      src={img.imageUrl} 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-4 py-1 bg-primary-container text-on-primary-container text-xs font-bold rounded-lg uppercase tracking-wider">
                  {product.brand || 'Colección Alanys'}
                </span>
                <div className="flex items-center text-tertiary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm">star_half</span>
                  <span className="ml-2 text-on-surface-variant font-medium">(48 calificaciones)</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-on-surface tracking-tighter leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-secondary mt-2">${product.price} USD</p>
            </div>
            
            <p className="text-on-surface-variant leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Dynamic Colors Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-on-surface uppercase text-sm tracking-widest">Color Seleccionado: <strong className="text-primary font-bold">{selectedColor}</strong></h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button 
                      key={color.id}
                      onClick={() => setSelectedColor(color.colorName)}
                      className={`w-12 h-12 rounded-full border-4 p-0.5 transition-all active:scale-90 cursor-pointer ${selectedColor === color.colorName ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-outline-variant'}`}
                      title={color.colorName}
                    >
                      <div 
                        className="w-full h-full rounded-full border border-outline-variant/20 shadow-inner" 
                        style={{ backgroundColor: color.hexCode || '#CCCCCC' }}
                      ></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-on-surface uppercase text-sm tracking-widest">Seleccionar Talla</h3>
                  <button className="text-primary font-bold text-sm underline">Guía de Tallas</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((sz) => (
                    <button 
                      key={sz.id}
                      onClick={() => setSelectedSize(sz.size)}
                      className={`px-8 py-3 rounded-lg border-2 font-bold transition-all active:scale-95 cursor-pointer text-sm ${selectedSize === sz.size ? 'border-primary bg-primary text-on-primary shadow-sm shadow-primary/30' : 'border-outline-variant hover:border-primary hover:text-primary'}`}
                    >
                      {sz.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button 
                onClick={handleAddToBag}
                className="flex-1 bg-primary text-on-primary text-xl font-black py-5 rounded-lg shadow-sm shadow-primary/30 bouncy-hover active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                Añadir al Carrito
              </button>
              <button className="w-16 h-16 rounded-lg border-2 border-outline-variant flex items-center justify-center text-primary hover:bg-primary-container hover:border-primary transition-all bouncy-hover cursor-pointer">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <span className="text-sm font-medium">Envío gratis desde $100</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined">restart_alt</span>
                </div>
                <span className="text-sm font-medium">Cambios gratis por 30 días</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look Section */}
        <section className="mt-32">
          <h2 className="text-4xl font-black text-on-surface mb-12 tracking-tighter text-center">COMPLETA <span className="text-secondary">EL LOOK</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Related Item 1 */}
            <div className="bg-surface-container-low rounded-lg p-4 shadow-sm shadow-secondary/10 bouncy-hover group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="Matching Pink Joggers" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLDmHIv14VJBfJfylFCUwrod2js-_afAG8V1CfXFgOJhVJ-9AsNU_kWyAj4b_Ho-AAIIephItkg0DjM4ne8Vc3d4gEPMQ45ObBZ9UpMXy4whtPZHNIQXDl7lye7OgcrnmFlKEB_8Ut1kiWxuftLY5Sh4VlnaTfYRrq7kGamZeGCRFJkH6RoC9Rdc1FWF5OOr10bGoYVqwIJR04jNgk3sPZkjcIwmzMNui8BWiWR43NaP-I2HxuFSJeJDXafW3QFSq7PIPHM1D87blC" 
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur rounded-lg flex items-center justify-center text-primary cursor-pointer">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <h4 className="font-bold text-on-surface">Joggers Nube</h4>
              <p className="text-secondary font-bold">$55.00</p>
              <div className="mt-3 flex gap-1">
                <span className="w-4 h-4 rounded-full bg-primary border border-white"></span>
                <span className="w-4 h-4 rounded-full bg-tertiary border border-white"></span>
              </div>
            </div>

            {/* Related Item 2 */}
            <div className="bg-surface-container-low rounded-lg p-4 shadow-sm shadow-secondary/10 bouncy-hover group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="Lavender Beanie" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtWkSS1g-TAcX7djXicvMmji_lOk3g1ORwY4cLPX6bf8C_lewIuIlSv2Nqb7HLIjrF60C10iLuT7CYLeeJ23A1GmTZ_ifhjJrYz5h8QvWX1Vvd5XzTmAYyLgnqfaSon_lPR4aRix8-0c24yijDZU5ido51jCid3OF1lWLCNDCOs3Hr7L21gbT-wW3RFPLrFIdJB_qqe4QfbIJ1c6r3TVjSf3SCSWDKXfbqgzk69haCdGSPPobLsz-n8A7egdwTDIKbfQRx2cCkJ-EX" 
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur rounded-lg flex items-center justify-center text-primary cursor-pointer">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <h4 className="font-bold text-on-surface">Beanie Tejido</h4>
              <p className="text-secondary font-bold">$22.00</p>
              <div className="mt-3 flex gap-1">
                <span className="w-4 h-4 rounded-full bg-secondary border border-white"></span>
                <span className="w-4 h-4 rounded-full bg-primary-container border border-white"></span>
              </div>
            </div>

            {/* Related Item 3 */}
            <div className="bg-surface-container-low rounded-lg p-4 shadow-sm shadow-secondary/10 bouncy-hover group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="White Chunky Sneakers" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBb7-g0EkE37_O1V16gqCcMGpEFc4Qkgx8vFHvPHax2K9rcOHz0INGJZfRc2tcHmm2zPw0Sol5SbllpVX5AHYaujUCSpC4_tDqXDYpCh8DjlIOZUv4tkd9ll7Iw_gJH4eVHK8OyD26CzPf2oc9C_RTXVrMEcEsPTbfvul4HB_n_IRFaXmVPW9hWNDp2AxvkEHZIe1xToRGaH8pFKAe_d7mSY1yGeFIdchfYjMwdkn3yJFf5i9jbhvgyCaQbABNn9MhcjdpPLmMYlPt" 
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur rounded-lg flex items-center justify-center text-primary cursor-pointer">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <h4 className="font-bold text-on-surface">Bubble Tenis</h4>
              <p className="text-secondary font-bold">$110.00</p>
              <div className="mt-3 flex gap-1">
                <span className="w-4 h-4 rounded-full bg-surface-container border border-white"></span>
              </div>
            </div>

            {/* Related Item 4 */}
            <div className="bg-surface-container-low rounded-lg p-4 shadow-sm shadow-secondary/10 bouncy-hover group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="Canvas Tote Bag" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJAy007zBlHhoojXoJNuVaqTsQEECjaEzDNkt-cZE3KR7tA4E_Xvo3puqVUcUaYZe9HqUEFqa-f9EluQxkv2-QmGLGtkSI-blJEghhoRwht32X0JxDDS98MLM86cAhLvGHQLMeWNP4SvV6Unds-gdUDAYcBvn5PeOss7KQrs70WZH2v8VfXVQwa5cgRyxtx0LFs-JA83zbA1ewonIFmDdHJoCtiyWk-0laeF4RULpkN6ZqN-7o418WxvWJtBUSCq0P5E8foyZiBWhC" 
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur rounded-lg flex items-center justify-center text-primary cursor-pointer">
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
