import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'Vestidos', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Blusas', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Zapatos', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'Accesorios', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
];

export default function CategoryList() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-32 pt-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-on-background mb-2">Comprar por Categoría</h2>
          <p className="text-on-surface-variant font-medium">Encuentra tus nuevas piezas favoritas llenas de color.</p>
        </div>
        <Link href="/catalogo" className="text-primary font-bold hover:underline flex items-center gap-1">
          Explorar Todo <span className="material-symbols-outlined">trending_flat</span>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link key={category.id} href={`/catalogo?categoria=${category.name.toLowerCase()}`} className="group relative cursor-pointer overflow-hidden rounded-lg aspect-[3/4] shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 block">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-white text-3xl font-black tracking-tight">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
