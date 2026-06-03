"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { paymentsApi } from '@/lib/api';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Minus, Plus, Trash2, ShoppingBag, X, Lock, MessageCircle, AlertCircle, ShieldCheck, Truck, MapPin, User as UserIcon } from 'lucide-react';

export default function CarritoPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'envio' | 'retiro'>('envio');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [mounted, setMounted] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStripeCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/carrito');
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError('');

    try {
      const items = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const res = await paymentsApi.createCheckoutSession(items);

      if (res.success && res.data?.url) {
        window.location.href = res.data.url;
      } else {
        setCheckoutError(res.message || 'Payment initiation failed.');
      }
    } catch (error: any) {
      setCheckoutError('Error connecting to payment server.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

    const itemsText = cartItems.map(item => {
      const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      const totalItemPrice = priceValue * item.quantity;
      return `▪ *${item.name}* (x${item.quantity}) - $${totalItemPrice.toFixed(2)}`;
    }).join('\n');

    const message = `*NEW ORDER — KOVA COLLECTIVE*

Hello, I'd like to place an order:

*Customer:* ${customerName}
*Method:* ${deliveryMethod === 'envio' ? 'Home Delivery' : 'Store Pickup'}
${deliveryMethod === 'envio' ? `*Address:* ${deliveryAddress}\n` : ''}*Notes:* ${additionalNotes || 'None'}

------------------------------------------
*Cart Details:*

${itemsText}

------------------------------------------
*Subtotal:* $${cartTotal.toFixed(2)}
*Shipping:* Free
*Total:* $${cartTotal.toFixed(2)}

Please let me know the next steps for payment. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-600/30">
      <Navbar />
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-[100dvh]">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">Shopping Bag</h1>
          <p className="text-zinc-400 font-light text-lg">Review your items before checkout.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Items Section */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {!mounted ? (
              <div className="w-full aspect-[2/1] bg-zinc-900/50 rounded-2xl border border-zinc-800 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-600 rounded-full animate-spin" />
              </div>
            ) : cartItems.length === 0 ? (
              <div className="bg-zinc-900/30 rounded-2xl p-16 text-center border border-zinc-800 border-dashed">
                <ShoppingBag size={48} className="mx-auto text-zinc-700 mb-6" strokeWidth={1} />
                <h2 className="text-2xl font-black text-white mb-3">Your bag is empty</h2>
                <p className="text-zinc-500 mb-8 max-w-sm mx-auto">Looks like you haven't added any items yet. Discover our latest drops.</p>
                <Link href="/catalogo" className="inline-flex items-center justify-center bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-4 rounded-lg font-bold text-sm transition-colors btn-press">
                  Shop Collection
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-zinc-900 border-y border-zinc-900">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-8 flex items-start gap-6 group">
                    <div className="relative h-32 w-24 sm:h-40 sm:w-32 flex-shrink-0 bg-zinc-900 rounded-lg overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, 128px"
                      />
                    </div>
                    
                    <div className="flex-grow flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-bold text-lg text-white mb-1 group-hover:text-amber-500 transition-colors">{item.name}</h3>
                          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Limited Run</p>
                        </div>
                        <span className="text-lg font-mono font-bold text-amber-500">{item.price}</span>
                      </div>
                      
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-mono font-bold text-sm text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-500 hover:text-red-400 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors btn-press"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary Section */}
          {mounted && cartItems.length > 0 && (
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="bg-zinc-900/50 rounded-2xl p-8 sticky top-32 border border-zinc-800">
                <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest">Order Summary</h2>
                
                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span className="text-amber-500 font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Taxes</span>
                    <span className="font-mono text-white">Calculated at checkout</span>
                  </div>
                  
                  <div className="pt-6 border-t border-zinc-800 flex justify-between items-end">
                    <span className="font-bold text-white uppercase tracking-widest text-xs">Total</span>
                    <span className="text-3xl font-mono font-black text-amber-500">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {checkoutError && (
                    <div className="p-3 bg-red-950/50 border border-red-900/50 text-red-200 rounded-lg text-xs font-medium flex items-start gap-2">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      {checkoutError}
                    </div>
                  )}

                  <button
                    onClick={handleStripeCheckout}
                    disabled={checkoutLoading}
                    className="w-full bg-white hover:bg-zinc-200 text-zinc-950 py-4 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 btn-press disabled:opacity-50"
                  >
                    {checkoutLoading ? (
                      <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                    ) : (
                      <>
                        {isAuthenticated ? 'Checkout Securely' : 'Sign In to Checkout'}
                        <Lock size={16} strokeWidth={2} />
                      </>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white py-4 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 btn-press"
                  >
                    <MessageCircle size={16} strokeWidth={2} />
                    Order via WhatsApp
                  </button>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-2 text-zinc-600">
                  <ShieldCheck size={14} />
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    Secure Encrypted Checkout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* WhatsApp Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md p-4 animate-fade-in-up">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
              <div>
                <h3 className="text-xl font-black text-white">Order Details</h3>
                <p className="text-zinc-400 text-xs mt-1">Complete info to send via WhatsApp</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleWhatsAppOrder} className="p-6 space-y-6">
              <div className="space-y-1.5">
                <label htmlFor="customerName" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">
                  Full Name *
                </label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    id="customerName"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">
                  Delivery Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('envio')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all font-bold text-xs cursor-pointer ${
                      deliveryMethod === 'envio'
                        ? 'border-amber-600 bg-amber-600/10 text-amber-500'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    <Truck size={20} />
                    Home Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('retiro')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all font-bold text-xs cursor-pointer ${
                      deliveryMethod === 'retiro'
                        ? 'border-amber-600 bg-amber-600/10 text-amber-500'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    <MapPin size={20} />
                    Store Pickup
                  </button>
                </div>
              </div>

              {deliveryMethod === 'envio' && (
                <div className="space-y-1.5">
                  <label htmlFor="deliveryAddress" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">
                    Delivery Address *
                  </label>
                  <textarea
                    id="deliveryAddress"
                    required={deliveryMethod === 'envio'}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Full street address, city, zip code..."
                    rows={3}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all placeholder:text-zinc-700 resize-none"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="additionalNotes" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">
                  Notes (Optional)
                </label>
                <textarea
                  id="additionalNotes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Special instructions..."
                  rows={2}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all placeholder:text-zinc-700 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-zinc-950 py-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 btn-press"
                >
                  <MessageCircle size={16} strokeWidth={2.5} />
                  Send to WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
