"use client"

import { Calendar, Clock, MapPin, User, CurrencyDollar, ArrowSquareOut, Tag } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { getStatusColor, getStatusText } from '@/lib/constant/competition.conf'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { CompetitionWithOrganizer, RegisterFormSettings } from '@/types/competition'

interface CompetitionCardProps {
  competition: CompetitionWithOrganizer
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const registerFormSettings = competition.registerFormSettings as RegisterFormSettings
  const categories = ['Amateur', 'Novicio', 'Avanzado', 'Experto']
  const router = useRouter()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="card bg-base-100 shadow-lg hover:shadow-xl"
    >
      <figure className="relative h-56">
        <Image 
          src='/images/welcome-hero-image.jpg'
          alt={competition.name}
          width={1000}
          height={1000}
          className="size-full object-cover transition-transform duration-500"
          style={{ 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div className="pointer-events-none absolute" />
        <div className="absolute right-4 top-4">
          <span className={`badge badge-outline ${getStatusColor(competition.status)} text-white`}>
            {getStatusText(competition.status)}
          </span>
        </div>
      </figure>
      
      <div className="card-body">
        <h2 className="card-title">
          {competition.name}
        </h2>
        <p className="line-clamp-2 text-sm">
          {'No hay descripción disponible.'}
        </p>
        
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 size-4" />
            <span>{competition.date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="mr-2 size-4" />
            <span>{formatDuration(competition.duration)}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 size-4" />
            <span className="truncate">{competition.location}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <User className="mr-2 size-4" />
            <span className="truncate">{competition.organizer.name}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <CurrencyDollar className="mr-2 size-4" />
            <span>{registerFormSettings?.paymentRequired ? formatCurrency(registerFormSettings.price as string) : 'Gratuito'}</span>
          </div>
        </div>
        
        <div>
          <div className="mb-2 flex items-center">
            <Tag className="mr-2 size-4" />
            <span className="text-sm">Categorías</span>
          </div>
          <div className="card-actions">
            {categories.map((category) => (
              <div key={category} className="badge badge-outline">
                {category}
              </div>
            ))}
          </div>
        </div>
        
        {competition.status === 'NOT_STARTED' && registerFormSettings && (
          <div className="card-actions mt-4 justify-start">
            <button
              className="btn btn-primary"
              onClick={() => router.push(`/register/${competition.organizer.id}/${competition.id}`)}
            >
              Inscribirse
              <ArrowSquareOut className="ml-2 size-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
