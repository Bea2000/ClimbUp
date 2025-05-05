'use client'

import { ArrowRight, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function PresentationComponent() {
  const router = useRouter()
  return (
    <>
      <section>
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            ¿Por qué ClimbUp?
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl p-8 text-center shadow-lg">
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary p-3">
                <MagnifyingGlass className="size-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Encuentra Competencias</h3>
              <p>
                Todas las competencias de escalada en un solo lugar.
              </p>
            </div>
            
            <div className="rounded-xl p-8 text-center shadow-lg">
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary p-3">
                <ArrowRight className="size-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Inscríbete Fácilmente</h3>
              <p>
                Proceso de inscripción simple y rápido para todas las competencias disponibles.
              </p>
            </div>
            
            <div className="rounded-xl p-8 text-center shadow-lg">
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary p-3">
                <Plus className="size-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Participa</h3>
              <p>
                Compite en diferentes categorías y modalidades según tu nivel de experiencia.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto bg-primary-content px-4">
          <div className="rounded-2xl bg-gradient-to-r p-10 text-center md:p-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">¿Eres organizador de competencias?</h2>
            <p className="mx-auto mb-8 max-w-3xl text-lg md:text-xl">
              Publica tus competencias en nuestra plataforma y llega a más escaladores. Gestiona inscripciones, resultados y más.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => router.push('/app/signup')}
            >
              Crear Cuenta de Organizador
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
