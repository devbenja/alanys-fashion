export default function Newsletter() {
  return (
    <section className="bg-pink-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Join the Sweetest Club
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Suscríbete a nuestro boletín para recibir ofertas exclusivas, novedades de la colección y consejos de estilo directamente en tu correo.
          </p>
        </div>
        <div className="mt-8 sm:max-w-md sm:mx-auto sm:flex">
          <label htmlFor="emailAddress" className="sr-only">Correo Electrónico</label>
          <input
            id="emailAddress"
            type="email"
            autoComplete="email"
            required
            className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-100 focus:ring-white focus:border-white sm:max-w-xs rounded-md shadow-sm"
            placeholder="Introduce tu email"
          />
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-100 focus:ring-pink-500 transition-colors"
            >
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
