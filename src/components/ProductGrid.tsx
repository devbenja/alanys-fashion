import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
}

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} href={`/producto/${product.id}`} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <div className="relative h-80 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center group-hover:opacity-75 transition-opacity"
                  />
                </div>
              </div>
              <h3 className="mt-4 text-sm text-gray-700 font-medium">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
