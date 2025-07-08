'use client';

interface TestimonialCardProps {
  quote: string;
  name: string;
  position: string;
}

function TestimonialCard({ quote, name, position }: TestimonialCardProps) {
  return (
    <div className="rounded-lg bg-base-200 p-8 shadow-lg">
      <div className="mb-4 flex items-center">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
      <p className="mb-6 text-gray-300">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <p className="font-bold text-white">{name}</p>
        <p className="text-gray-400">{position}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const testimonials = [
    {
      quote: "ClimbUp ha transformado la forma en que organizamos nuestras competencias. Ahora todo es más rápido, eficiente y profesional. Los participantes están encantados con la experiencia.",
      name: "Carlos Rodríguez",
      position: "Director de Escalada Vertical, Santiago",
    },
    {
      quote: "La gestión de inscripciones y resultados solía ser un dolor de cabeza. Con ClimbUp, todo es automático y podemos centrarnos en lo que realmente importa: crear una gran experiencia para los escaladores.",
      name: "Ana Martínez",
      position: "Organizadora de Boulder Fest, Valparaíso",
    },
    {
      quote: "El sistema de puntuación en tiempo real ha sido un cambio radical. Los jueces pueden calificar fácilmente y los resultados se generan al instante. ¡Increíble herramienta!",
      name: "Javier Soto",
      position: "Juez Nacional de Escalada, Concepción",
    },
  ];

  return (
    <section id="testimonials" className="bg-base-100 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Lo que dicen nuestros usuarios</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Organizadores de competencias de escalada que ya confían en ClimbUp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              position={testimonial.position}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
