'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { createCompetition } from '@/app/actions/competition';
import randomIcon from '@/assets/icons/random.svg';
import FormInput from '@/components/ui/FormInput';
import { FormSelect } from '@/components/ui/FormSelect';
import SubmitButton from '@/components/ui/SubmitButton';
import { usePlacesSearch } from '@/hooks/usePlacesSearch';
import { CLIMBING_GRADE_TYPES_OPTIONS } from '@/lib/constant/problem.conf';
import { generateRandomCode } from '@/lib/utils';

import ShowAddressOptions from './ShowAddressOptions';
import { CreateCompetitionSchema } from '../schemas/createCompetitionSchema';

export default function CreateCompetitionForm() {
  const router = useRouter();
  const [code, setCode] = React.useState('');
  const [lastResult, formAction] = useActionState(createCompetition, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({formData}) {
      return parseWithZod(formData, {schema: CreateCompetitionSchema});
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  const [locationInput, setLocationInput] = React.useState('');
  const { suggestions, loading, searchPlaces } = usePlacesSearch();
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  React.useEffect(() => {
    if (lastResult?.status === 'success' && 'competitionId' in lastResult) {
      toast.success('Competencia creada correctamente');
      router.push(`/dashboard/competitions/manage/${lastResult.competitionId.toString()}/judges`);
    } else if (lastResult?.status === 'error') {
      const errorMessage = lastResult.error?.message?.[0] || 'Error al crear la competencia';
      toast.error(errorMessage);
    }
  }, [lastResult, router]);

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
    fields.location.value = address;
    setShowSuggestions(false);
  }

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Crear Nueva Competencia</h2>
          
          <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">
            <FormInput
              label="Nombre"
              name={fields.name.name}
              type="text"
              placeholder="Ej: Iron Fest 2024"
              required
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
              errors={fields.date.errors}
            />

            <FormSelect
              label="Tipo de Graduación"
              name={fields.levelType.name}
              placeholder="Selecciona un tipo de graduación"
              options={Object.values(CLIMBING_GRADE_TYPES_OPTIONS)}
              required
              errors={fields.levelType.errors}
            />

            <FormInput
              label="Duración (minutos)"
              name={fields.duration.name}
              type="number"
              placeholder="Ej: 90"
              required
              min="30"
              step="5"
              errors={fields.duration.errors}
            />

            <FormInput
              label="Código"
              name={fields.code.name}
              type="text"
              placeholder="Ej: Escalada123"
              required
              errors={fields.code.errors}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              extraElement={generateCodeButton}
            />

            <SubmitButton
              label="Crear Competencia"
              loadingLabel="Creando..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}
