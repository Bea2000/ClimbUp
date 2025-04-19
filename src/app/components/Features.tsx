'use client';

import { Medal, Users, Trophy, Calendar, CheckCircle } from '@phosphor-icons/react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg bg-base-200 p-8 shadow-lg">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/20">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default function Features() {
  const features = [
    {
      icon: <Medal size={32} weight="fill" className="text-primary" />,
      title: "Gestión de Competencias",
      description: "Crea y administra competencias con diferentes categorías, modalidades y sistemas de puntuación.",
    },
    {
      icon: <Users size={32} weight="fill" className="text-primary" />,
      title: "Registro de Participantes",
      description: "Sistema completo para la inscripción y gestión de participantes, con confirmación automática.",
    },
    {
      icon: <Trophy size={32} weight="fill" className="text-primary" />,
      title: "Puntuación en Tiempo Real",
      description: "Sistema de puntuación en tiempo real que permite a jueces calificar a los participantes de forma eficiente.",
    },
    {
      icon: <Calendar size={32} weight="fill" className="text-primary" />,
      title: "Programación de Eventos",
      description: "Organiza tus eventos con fechas, horarios y ubicaciones específicas para cada categoría y ronda.",
    },
    {
      icon: <CheckCircle size={32} weight="fill" className="text-primary" />,
      title: "Resultados Automáticos",
      description: "Generación automática de resultados y rankings basados en el sistema de puntuación elegido.",
    },
    {
      icon: <Users size={32} weight="fill" className="text-primary" />,
      title: "Panel de Jueces",
      description: "Interfaz especializada para jueces que facilita la evaluación y puntuación de los participantes.",
    },
  ];

  return (
    <section id="features" className="bg-base-100 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Características Principales</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Todo lo que necesitas para gestionar tus competencias de escalada de forma eficiente y profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
