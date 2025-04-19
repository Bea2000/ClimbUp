'use client';

import { CheckCircle } from '@phosphor-icons/react';

interface BenefitItemProps {
  title: string;
  description: string;
}

function BenefitItem({ title, description }: BenefitItemProps) {
  return (
    <div className="flex">
      <div className="mr-4 shrink-0">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/20">
          <CheckCircle size={24} weight="fill" className="text-primary" />
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}

export default function Benefits() {
  const leftBenefits = [
    {
      title: "Ahorro de Tiempo",
      description: "Automatiza procesos repetitivos y reduce el tiempo dedicado a tareas administrativas.",
    },
    {
      title: "Reducción de Errores",
      description: "Minimiza errores humanos en la gestión de inscripciones, puntuaciones y resultados.",
    },
    {
      title: "Experiencia Mejorada",
      description: "Ofrece una experiencia más profesional y satisfactoria tanto para participantes como para espectadores.",
    },
  ];

  const rightBenefits = [
    {
      title: "Análisis de Datos",
      description: "Obtén estadísticas y análisis detallados sobre tus competencias y participantes.",
    },
    {
      title: "Escalabilidad",
      description: "Gestiona competencias de cualquier tamaño, desde pequeños eventos locales hasta campeonatos nacionales.",
    },
    {
      title: "Comunicación Efectiva",
      description: "Mantén informados a todos los involucrados con notificaciones y actualizaciones en tiempo real.",
    },
  ];

  return (
    <section id="benefits" className="bg-base-200 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Beneficios para Organizadores</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Descubre cómo ClimbUp puede transformar la forma en que organizas tus competencias de escalada.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-8">
            {leftBenefits.map((benefit, index) => (
              <BenefitItem 
                key={index}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
          <div className="space-y-8">
            {rightBenefits.map((benefit, index) => (
              <BenefitItem 
                key={index}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
