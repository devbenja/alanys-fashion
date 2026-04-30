import Image from "next/image";
import { Camera, MessageCircle, Send } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="text-center space-y-8 p-6">
        <Image
          src="/alanays-fashion-logo.png"
          alt="Alanys Fashion Logo"
          width={220}
          height={220}
          className="object-contain mx-auto drop-shadow-lg"
          priority
        />
        
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider text-gray-800">
            MUY PRONTO
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-md mx-auto">
            Estamos preparando algo especial para ti. 
            <span className="block mt-2">Mantente atento.</span>
          </p>
        </div>

        <div className="flex justify-center gap-6 pt-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 text-pink-500"
          >
            <Camera size={24} />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 text-green-500"
          >
            <MessageCircle size={24} />
          </a>
          <a
            href="mailto:contacto@alanysfashion.com"
            className="p-3 bg-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 text-amber-500"
          >
            <Send size={24} />
          </a>
        </div>

        <p className="text-gray-400 text-sm pt-8">
          © 2026 Alanys Fashion. Todos los derechos reservados.
        </p>
      </div>
    </main>
  );
}