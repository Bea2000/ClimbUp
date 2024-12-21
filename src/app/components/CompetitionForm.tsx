'use client';

import { useState } from 'react';

interface CompetitionFormData {
  code: string;
  name: string;
  location: string;
  date: string;
  duration: number;
  startTime: string;
}

export default function CompetitionForm() {
  const [formData, setFormData] = useState<CompetitionFormData>({
    code: '',
    name: '',
    location: '',
    date: '',
    duration: 90,
    startTime: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const generateRandomCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setFormData(prev => ({
      ...prev,
      code: newCode
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/competitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la competencia');
      }

      const data = await response.json();
      setSuccess(true);
      setFormData({
        code: '',
        name: '',
        location: '',
        date: '',
        duration: 0,
        startTime: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la competencia');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Crear Nueva Competencia</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            {success && (
              <div className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Competencia creada exitosamente</span>
              </div>
            )}

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
                className="input input-bordered w-full"
                placeholder="Ej: Iron Fest 2024"
                required
              />
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
                className="input input-bordered w-full"
                placeholder="Ej: Pdte. Riesco 5330, 7560996 Las Condes, Región Metropolitana"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Fecha</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
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
                min="0"
                step="30"
                className="input input-bordered w-full placeholder:opacity-100"
                placeholder="Ej: 90"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Hora de Inicio</span>
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
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
                  className="input input-bordered join-item w-full"
                  placeholder="Código autogenerado"
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
