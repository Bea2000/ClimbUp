'use client';

import { X } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { getOrganizerSettings, updateOrganizerSettings } from '@/app/actions/organizer';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';

type Organizer = {
  id: number;
  name: string;
};

export default function OrganizerSettingsForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [organizer, setOrganizer] = useState<Organizer | null>(null);

  useEffect(() => {
    async function fetchOrganizer() {
      try {
        const result = await getOrganizerSettings();
        if (result.status === 'error') {
          throw new Error(result.error?.message?.[0] || 'Error desconocido');
        }
        if (result.status === 'success' && result.data) {
          setOrganizer(result.data);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        toast.error(`No se pudo cargar la configuración del organizador: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    }

    fetchOrganizer();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!organizer) return;
    
    const { name, value } = e.target;
    setOrganizer({ ...organizer, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!organizer) return;
    
    setSaving(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await updateOrganizerSettings(formData);

      if (result.status === 'error') {
        throw new Error(result.error?.message?.[0] || 'Error desconocido');
      }

      toast.success('Nombre del organizador actualizado correctamente');
      router.refresh();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(`No se pudo actualizar el nombre del organizador: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!organizer) {
    return (
      <div className="alert alert-error">
        <X size={24} weight="bold" />
        <span>No se pudo cargar la información del organizador</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Información General</h2>
      
      <FormInput
        label="Nombre del Organizador"
        name="name"
        type="text"
        value={organizer.name}
        onChange={handleChange}
        required
      />

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancelar
        </button>
        <SubmitButton 
          label="Guardar Cambios"
          loadingLabel="Guardando..."
          disabled={saving}
        />
      </div>
    </form>
  );
}
