import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CompetitionSchema } from '../schemas/competition';
import { z } from 'zod';

// Tipos
interface CompetitionFormData {
  code: string;
  name: string;
  location: string;
  date: string;
  duration: number;
  startTime: string | null;
}

interface CompetitionDBData {
  code: string;
  name: string;
  location: string;
  date: Date;
  duration: number;
  startTime: Date | null;
}

export function useCompetitionForm() {
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
  }, []);

  const generateRandomCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setFormData(prev => ({
      ...prev,
      code: newCode
    }));
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
      const validatedData = CompetitionSchema.omit({ startTime: true }).parse(formData);

      const dbData: CompetitionDBData = {
        ...validatedData,
        date: new Date(formData.date),
        startTime: null,
      };

      const response = await fetch('/api/competitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbData),
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
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach(error => {
          const field = error.path[0];
          fieldErrors[field] = error.message;
        });
        setErrors(fieldErrors);
        toast.error('Por favor, corrige los errores en el formulario');
      } else {
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

    validateField(name as keyof Omit<CompetitionFormData, 'startTime'>, newValue);
  };

  return {
    formData,
    errors,
    handleSubmit,
    handleChange,
    generateRandomCode,
  };
}
