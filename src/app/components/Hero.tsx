'use client';

import { ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="container mx-auto flex flex-col items-center px-6 py-16 md:flex-row md:py-24">
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 25,
          delay: 0.5,
          duration: 3,
        }}
        className="mb-10 md:mb-0 md:w-1/2"
      >
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Organiza competencias de escalada como nunca antes
        </h1>
        <p className="mb-8 text-lg text-gray-300 md:text-xl">
          ClimbUp es la plataforma especializada en la gestión de competencias de escalada, 
          diseñada para optimizar la organización de eventos y mejorar la experiencia de 
          participantes, jueces y organizadores.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link href="/signup" className="btn btn-primary btn-lg">
            Comenzar Ahora
            <ArrowRight size={20} weight="bold" className="ml-2" />
          </Link>
          <a 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start', 
              });
            }} 
            href="#features" 
            className="btn btn-outline btn-lg cursor-pointer text-white"
          >
            Conocer Más
          </a>
        </div>
      </motion.div>
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 25,
          delay: 1,
          duration: 4,
        }}
        className="flex justify-center md:w-1/2"
      >
        <div className="relative h-80 w-full max-w-lg md:h-96">
          <Image 
            src="/climbing.png" 
            alt="Escalada deportiva" 
            fill
            className="rounded-lg object-cover shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  );
}
