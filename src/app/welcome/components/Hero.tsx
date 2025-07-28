"use client"

import { CaretDown } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  function scrollToCompetitions() {
    const competitionsSection = document.getElementById('competitions')
    if (competitionsSection) {
      competitionsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/welcome-hero-image.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          style={{ filter: 'brightness(0.6)' }}
        />
      </div>
      
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-white md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-center text-4xl font-bold md:text-6xl"
        >
          Desafía Tus Límites
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 max-w-2xl text-center text-xl md:text-2xl"
        >
          Encuentra las mejores competencias de escalada y demuestra tus habilidades.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToCompetitions}
          className="btn rounded-lg px-6 text-center text-lg font-semibold transition-colors duration-300"
        >
          Ver Competencias
        </motion.button>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToCompetitions}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <CaretDown size={36} className="text-white" />
        </motion.div>
      </motion.div>
    </div>
  )
}
