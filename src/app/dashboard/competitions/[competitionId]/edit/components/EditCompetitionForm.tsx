'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Competition } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { updateCompetition } from '@/app/actions/competition';
import randomIcon from '@/assets/icons/random.svg';
import GoBackButton from '@/components/goBackButton';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';
import { usePlacesSearch } from '@/hooks/usePlacesSearch';
import { generateRandomCode } from '@/lib/utils';

import ShowAddressOptions from '../../../create/components/ShowAddressOptions';
import { editCompetitionSchema } from '../schemas/editCompetitionSchema';

interface EditCompetitionFormProps {
  competition: Competition;
}

export default function EditCompetitionForm({ competition }: EditCompetitionFormProps) {
  const router = useRouter();
  const [name, setName] = useState<string>(competition.name);
  const [locationInput, setLocationInput] = useState<string>(competition.location);
  const [date, setDate] = useState<string>(competition.date.toISOString().slice(0, 16));
  const [duration, setDuration] = useState<string>(competition.duration.toString());
  const [code, setCode] = useState<string>(competition.code);
  
  const { suggestions, loading, searchPlaces } = usePlacesSearch();
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [lastResult, formAction] = useActionState(
    (state: unknown, formData: FormData) => updateCompetition(state, formData, competition.id),
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { 
        schema: editCompetitionSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Competencia actualizada correctamente');
      router.push(`/dashboard/competitions/${competition.id}`);
    } else if (lastResult?.status === 'error') {
      const errorMessage = lastResult.error?.message?.[0] || 'Error al actualizar la competencia';
      toast.error(errorMessage);
    }
  }, [lastResult, router, competition.id]);

  const generateCodeButton = (
    <button 
      type="button"
      className="btn join-item"
      onClick={() => {
        const newCode = generateRandomCode(6);
        setCode(newCode);
        fields.code.value = newCode;
      }}
    >
      <Image 
        src={randomIcon}
        alt="Generar código aleatorio"
        width={20}
        height={20}
        className="invert"
      />
    </button>
  );

  function handleLocationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setLocationInput(value);
    searchPlaces(value);
    setShowSuggestions(true);
  }

  function handleSuggestionClick(address: string) {
    setLocationInput(address);
    setShowSuggestions(false);
  }

  return (
    <div className="card flex flex-col gap-4 bg-base-100 shadow-xl">
      <div className="mt-4">
        <GoBackButton />
      </div>
      <div className="card-body">
        <h1 className="card-title mb-6 text-2xl">Editar Competencia {competition.name}</h1>
        
        <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">
          <FormInput
            label="Nombre"
            name={fields.name.name}
            type="text"
            placeholder="Ej: Iron Fest 2024"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            errors={fields.name.errors}
          />

          <div className="relative">
            <FormInput
              label="Ubicación"
              name={fields.location.name}
              type="text"
              placeholder="Ej: Pdte. Riesco 5330, Las Condes"
              required
              errors={fields.location.errors}
              value={locationInput}
              onChange={handleLocationChange}
            />
            
            <ShowAddressOptions
              loading={loading}
              suggestions={suggestions}
              showSuggestions={showSuggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
          </div>

          <FormInput
            label="Fecha y Hora"
            name={fields.date.name}
            type="datetime-local"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            errors={fields.date.errors}
          />

          <FormInput
            label="Duración (minutos)"
            name={fields.duration.name}
            type="number"
            placeholder="Ej: 90"
            required
            min="30"
            step="30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            errors={fields.duration.errors}
          />

          <FormInput
            label="Código"
            name={fields.code.name}
            type="text"
            placeholder="Ej: Clave123"
            required
            errors={fields.code.errors}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            extraElement={generateCodeButton}
          />

          <SubmitButton
            label="Guardar Cambios"
            loadingLabel="Guardando..."
          />
        </form>
      </div>
    </div>
  );
}
