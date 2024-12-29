'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CompetitionSchema, type Competition } from '../schemas/competition';
import { z } from 'zod';

export default function CompetitionForm() {
  const [formData, setFormData] = useState<Omit<CompetitionFormData, 'startTime'>>({
    code: '',
    name: '',
    location: '',
    date: '',
    duration: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Omit<CompetitionFormData, 'startTime'>, string>>>({});

  useEffect(() => {
    if (formData.code === '') {
      generateRandomCode();
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  const generateRandomCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setFormData(prev => ({
      ...prev,
      code: newCode
    }));
    // Limpiar error del código si existe
    setErrors(prev => ({ ...prev, code: undefined }));
  };

  const validateField = (name: keyof Omit<CompetitionFormData, 'startTime'>, value: string | number) => {
    try {
      CompetitionSchema.omit({ startTime: true }).shape[name].parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validar todos los campos
      const validatedData = CompetitionSchema.omit({ startTime: true }).parse(formData);

      const response = await fetch('/api/competitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...validatedData, startTime: null }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la competencia');
      }

      await response.json();
      toast.success('Competencia creada exitosamente');
      
      setFormData({
        code: '',
        name: '',
        location: '',
        date: '',
        duration: 0,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Error de validación de Zod
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach(error => {
          const field = error.path[0];
          fieldErrors[field] = error.message;
        });
        setErrors(fieldErrors);
        toast.error('Por favor, corrige los errores en el formulario');
      } else {
        // Error de la API
        toast.error(err instanceof Error ? err.message : 'Error al crear la competencia');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'duration' ? parseInt(value) || 0 : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Validar el campo cuando cambia
    validateField(name as keyof Omit<CompetitionFormData, 'startTime'>, newValue);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Crear Nueva Competencia</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                placeholder="Ej: Iron Fest 2024"
                required
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Ubicación</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`input input-bordered w-full ${errors.location ? 'input-error' : ''}`}
                placeholder="Ej: Pdte. Riesco 5330, Las Condes"
                required
              />
              {errors.location && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.location}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Fecha y Hora</span>
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`input input-bordered w-full ${errors.date ? 'input-error' : ''}`}
                required
              />
              {errors.date && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.date}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Duración (minutos)</span>
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration || ''}
                onChange={handleChange}
                min="30"
                step="30"
                className={`input input-bordered w-full ${errors.duration ? 'input-error' : ''}`}
                placeholder="Ej: 90"
                required
              />
              {errors.duration && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.duration}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Código</span>
              </label>
              <div className="join w-full">
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className={`input input-bordered join-item w-full ${errors.code ? 'input-error' : ''}`}
                  placeholder="Código para que jueces ingresen a la competencia"
                  required
                />
                <button 
                  type="button"
                  className="btn join-item"
                  onClick={generateRandomCode}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {errors.code && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.code}</span>
                </label>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Crear Competencia
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
