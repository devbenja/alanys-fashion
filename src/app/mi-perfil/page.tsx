import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Star, Ticket, Package, MapPin, CreditCard, Settings, Headset, Crown, Edit2 } from 'lucide-react';

export default function MiPerfilPage() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen pb-24 md:pb-0">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-10 pt-32 min-h-[100dvh]">
        {/* Profile Header */}
        <section className="relative mb-16">
          <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden relative border border-zinc-800">
            <Image 
              fill
              sizes="100vw"
              className="object-cover grayscale opacity-60" 
              alt="Editorial texture" 
              src="https://picsum.photos/seed/kova-profile-bg/1200/400" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </div>
          
          <div className="absolute -bottom-12 left-8 md:left-12 flex items-end gap-6">
            <div className="relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-zinc-950 overflow-hidden relative bg-zinc-900 shadow-2xl">
                <Image 
                  fill
                  sizes="(max-width: 768px) 112px, 144px"
                  className="object-cover grayscale" 
                  alt="Avatar" 
                  src="https://picsum.photos/seed/kova-avatar/400/400" 
                />
              </div>
              <button className="absolute bottom-1 right-1 bg-white hover:bg-zinc-200 text-zinc-950 p-2 rounded-full shadow-lg transition-transform btn-press" aria-label="Edit Profile">
                <Edit2 size={14} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="mb-14">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Jane Doe</h1>
              <p className="text-zinc-400 font-light mt-1 text-sm md:text-base">Member since 2024</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-24">
          
          {/* Main Content */}
          <div className="flex-grow space-y-12">
            
            {/* Stats */}
            <section>
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Star size={18} className="text-amber-500" />
                Your Rewards
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Points */}
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl flex flex-col justify-between relative overflow-hidden group">
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">KOVA Points</p>
                    <h3 className="text-4xl font-mono font-black mt-2 text-white">1,250</h3>
                    <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
                      You are 250 points away from<br />
                      <strong className="text-white">Premium Tier Status</strong>.
                    </p>
                  </div>
                  <button className="mt-6 border border-zinc-700 hover:border-amber-500 hover:text-amber-500 text-zinc-300 text-xs font-bold py-3 px-6 rounded-lg w-fit transition-colors btn-press">
                    Redeem Points
                  </button>
                  <Star size={120} className="absolute -bottom-8 -right-8 text-zinc-800 opacity-20 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
                </div>

                {/* Coupons */}
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl flex flex-col justify-between relative overflow-hidden group">
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Active Offers</p>
                    <h3 className="text-4xl font-mono font-black mt-2 text-white">02</h3>
                    <div className="mt-4 flex flex-col gap-2">
                      <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold py-1 px-2 w-fit rounded uppercase tracking-wider">20% Off Next Order</span>
                      <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px] font-bold py-1 px-2 w-fit rounded uppercase tracking-wider">Free Shipping</span>
                    </div>
                  </div>
                  <button className="mt-6 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white text-xs font-bold py-3 px-6 rounded-lg w-fit transition-colors btn-press">
                    View Wallet
                  </button>
                  <Ticket size={120} className="absolute -bottom-8 -right-8 text-zinc-800 opacity-20 pointer-events-none group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700" />
                </div>
              </div>
            </section>

            {/* Profile Form */}
            <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl">
              <h2 className="text-lg font-bold text-white mb-8">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Full Name</label>
                  <input 
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none rounded-lg px-4 py-3 transition-all text-white text-sm" 
                    type="text" 
                    defaultValue="Jane Doe" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Email Address</label>
                  <input 
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none rounded-lg px-4 py-3 transition-all text-white text-sm" 
                    type="email" 
                    defaultValue="jane.doe@example.com" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Phone Number</label>
                  <input 
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none rounded-lg px-4 py-3 transition-all text-white text-sm" 
                    type="tel" 
                    defaultValue="+1 (555) 000-0000" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Date of Birth</label>
                  <input 
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none rounded-lg px-4 py-3 transition-all text-white text-sm" 
                    type="text" 
                    defaultValue="May 14, 1995" 
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-3 px-8 rounded-lg text-sm transition-colors btn-press">
                  Save Changes
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex flex-col gap-6 shrink-0">
            {/* Quick Links */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/mis-pedidos" className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <Package size={18} />
                  <span className="text-sm font-medium">Order History</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <MapPin size={18} />
                  <span className="text-sm font-medium">Saved Addresses</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <CreditCard size={18} />
                  <span className="text-sm font-medium">Payment Methods</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <Settings size={18} />
                  <span className="text-sm font-medium">Account Settings</span>
                </Link>
              </div>
            </div>

            {/* VIP Status */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative overflow-hidden">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Membership</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-600/10 border border-amber-600/20 rounded-full flex items-center justify-center text-amber-500">
                  <Crown size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">KOVA Insider</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Active Tier</p>
                </div>
              </div>
              
              <button className="w-full text-center py-2.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-bold transition-colors rounded-lg btn-press">
                View Benefits
              </button>
            </div>

            {/* Support */}
            <div className="bg-amber-600/10 border border-amber-600/20 text-amber-500 p-6 rounded-xl">
              <Headset size={24} className="mb-3" />
              <h4 className="text-sm font-bold text-amber-400 mb-1">Need assistance?</h4>
              <p className="text-xs text-amber-500/80 mb-4">Our styling and support team is here to help.</p>
              <Link href="/contacto" className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline">
                Contact Support &rarr;
              </Link>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
