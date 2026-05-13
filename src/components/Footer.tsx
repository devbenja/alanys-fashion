import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-pink-500 tracking-tight">
              Alanys Fashion
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Creando tendencias y vistiendo tus mejores momentos desde 2026.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Tienda</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/catalogo?categoria=vestidos" className="text-base text-gray-500 hover:text-pink-500 transition-colors">
                  Vestidos
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=blusas" className="text-base text-gray-500 hover:text-pink-500 transition-colors">
                  Blusas
                </Link>
              </li>
              <li>
                <Link href="/colecciones" className="text-base text-gray-500 hover:text-pink-500 transition-colors">
                  Colecciones
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="text-base text-gray-500 hover:text-pink-500 transition-colors">
                  Ofertas Especiales
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Soporte</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/faq" className="text-base text-gray-500 hover:text-pink-500 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/envios" className="text-base text-gray-500 hover:text-pink-500 transition-colors">
                  Políticas de Envío
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="text-base text-gray-500 hover:text-pink-500 transition-colors">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-base text-gray-500 hover:text-pink-500 transition-colors">
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/privacidad" className="text-base text-gray-500 hover:text-pink-500 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-base text-gray-500 hover:text-pink-500 transition-colors">
                  Términos de Servicio
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-400">
            &copy; 2026 Alanys Fashion. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
