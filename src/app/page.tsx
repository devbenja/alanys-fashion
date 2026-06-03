import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryList from '@/components/CategoryList';
import ProductGrid from '@/components/ProductGrid';
import Banner from '@/components/Banner';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const bestSellers = [
  { id: '1', name: 'Structured Heavyweight Tee', price: '$45.00', image: 'https://picsum.photos/seed/kova-tee-1/600/800' },
  { id: '2', name: 'Everyday Relaxed Chino', price: '$85.00', image: 'https://picsum.photos/seed/kova-chino/600/800' },
  { id: '3', name: 'Minimalist Leather Sneaker', price: '$150.00', image: 'https://picsum.photos/seed/kova-sneaker-1/600/800' },
  { id: '4', name: 'Organic Cotton Oxford', price: '$65.00', image: 'https://picsum.photos/seed/kova-oxford/600/800' },
];

const newArrivals = [
  { id: '5', name: 'Technical Field Jacket', price: '$180.00', image: 'https://picsum.photos/seed/kova-jacket-1/600/800' },
  { id: '6', name: 'Merino Wool Crewneck', price: '$120.00', image: 'https://picsum.photos/seed/kova-crewneck/600/800' },
  { id: '7', name: 'Pleated Wide Leg Trouser', price: '$95.00', image: 'https://picsum.photos/seed/kova-trouser-1/600/800' },
  { id: '8', name: 'Canvas Tote Bag', price: '$55.00', image: 'https://picsum.photos/seed/kova-tote/600/800' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <Hero />
      <CategoryList />
      <ProductGrid title="Core Collection" products={bestSellers} />
      <Banner />
      <ProductGrid title="New Arrivals" products={newArrivals} bgColorClass="bg-zinc-950 border-t border-zinc-900" />
      <Newsletter />
      <Footer />
    </div>
  );
}