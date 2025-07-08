'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-primary/10 py-16 md:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
          ¿Listo para revolucionar tus competencias de escalada?
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-300">
          Únete a la comunidad de organizadores que ya confían en ClimbUp para gestionar sus eventos de forma profesional.
        </p>
        <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link href="/signup" className="btn btn-primary btn-lg">
            Crear Cuenta Gratis
          </Link>
          <Link href="/login" className="btn btn-outline btn-lg text-white">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </section>
  );
}
