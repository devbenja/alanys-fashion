import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'Vestidos', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Blusas', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Pantalones', image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'Accesorios', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 5, name: 'Zapatos', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
];

export default function CategoryList() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Comprar por Categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/catalogo?categoria=${category.name.toLowerCase()}`} className="group flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100 group-hover:ring-4 ring-pink-100 transition-all">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-sm font-medium text-gray-900 group-hover:text-pink-500 transition-colors">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
