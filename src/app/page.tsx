import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryList from '@/components/CategoryList';
import ProductGrid from '@/components/ProductGrid';
import Banner from '@/components/Banner';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const bestSellers = [
  { id: '1', name: 'Vestido Floral de Verano', price: '$45.00', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: '2', name: 'Blusa de Seda Elegante', price: '$35.00', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: '3', name: 'Pantalón Casual Recto', price: '$50.00', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: '4', name: 'Zapatos de Tacón Clásicos', price: '$65.00', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
];

const newArrivals = [
  { id: '5', name: 'Bolso de Cuero Minimalista', price: '$80.00', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: '6', name: 'Chaqueta Denim Oversize', price: '$75.00', image: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: '7', name: 'Falda Plisada Midi', price: '$40.00', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: '8', name: 'Gafas de Sol Retro', price: '$25.00', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoryList />
      <ProductGrid title="Our Best Sellers" products={bestSellers} />
      <Banner />
      <ProductGrid title="New Arrivals" products={newArrivals} bgColorClass="bg-transparent" />
      <Newsletter />
      <Footer />
    </div>
  );
}