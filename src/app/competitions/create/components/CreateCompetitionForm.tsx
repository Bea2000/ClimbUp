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
import SubmitButton from '@/components/ui/SubmitButton';
import { generateRandomCode } from '@/lib/utils';

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

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Competencia creada correctamente');
      router.push('/dashboard/competitions');
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

            <FormInput
              label="Ubicación"
              name={fields.location.name}
              type="text"
              placeholder="Ej: Pdte. Riesco 5330, Las Condes"
              required
              errors={fields.location.errors}
            />

            <FormInput
              label="Fecha y Hora"
              name={fields.date.name}
              type="datetime-local"
              required
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

            <SubmitButton label="Crear Competencia" />
          </form>
        </div>
      </div>
    </div>
  );
}
