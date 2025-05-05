"use client"

import { Spinner } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import { CompetitionWithOrganizer } from '@/types/competition'

import CompetitionCard from './CompetitionCard'

export default function CompetitionGrid({ competitions }: { competitions: CompetitionWithOrganizer[] }) {
  const [filteredCompetitions, setFilteredCompetitions] = useState<CompetitionWithOrganizer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')

  const categories = ['Amateur', 'Novicio', 'Avanzado', 'Experto']
  
  const allCategories = Array.from(
    new Set(competitions.flatMap(() => categories)),
  )
  
  const allLocations = Array.from(
    new Set(competitions.map((comp) => comp.location)),
  )
  
  useEffect(() => {
    setLoading(true)
    let results = [...competitions]
    
    if (searchTerm) {
      results = results.filter(
        comp => 
          comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comp.organizer.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    
    // if (selectedCategory !== 'all') {
    //   results = results.filter(
    //     comp => comp.categories.includes(selectedCategory as any),
    //   )
    // }
    
    // Filter by location
    if (selectedLocation !== 'all') {
      results = results.filter(
        comp => comp.location === selectedLocation,
      )
    }
    
    results.sort((a, b) => a.date.getTime() - b.date.getTime())
    
    setFilteredCompetitions(results)
    setLoading(false)
  }, [competitions, searchTerm, selectedCategory, selectedLocation])
  
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner className="size-12 animate-spin" />
      </div>
    )
  }
  
  function handleReset() {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedLocation('all')
  }
  
  return (
    <div>
      <div className="mb-8 rounded-lg p-4 shadow-md">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar competencias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full p-2"
            />
          </div>
          
          <div className="md:w-1/4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">Todas las categorías</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:w-1/4">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">Todas las ubicaciones</option>
              {allLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <button
              onClick={handleReset}
              className="btn w-full px-4 py-2 duration-300 md:w-auto"
            >
              Reiniciar
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-lg font-medium">
          {filteredCompetitions.length} competencia{filteredCompetitions.length !== 1 ? 's' : ''} encontrada{filteredCompetitions.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      {filteredCompetitions.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompetitions.map((competition) => (
            <CompetitionCard key={competition.id} competition={competition} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg bg-gray-100 p-8 text-center dark:bg-gray-800"
        >
          <p className="mb-2 text-xl font-medium">No se encontraron competencias</p>
          <p className="text-gray-600 dark:text-gray-400">
            Intenta con otros filtros o palabras clave
          </p>
        </motion.div>
      )}
    </div>
  )
}
