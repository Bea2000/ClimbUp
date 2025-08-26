'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { createSectorAction } from '@/app/actions/sector';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';

import { ManageSectorSchema } from '../schemas/manageSectorsSchema';

interface AddSectorFormProps {
  competitionId: number;
}

export default function AddSectorForm({ competitionId }: AddSectorFormProps) {
  const router = useRouter();
  const [lastResult, formAction] = useActionState(createSectorAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ManageSectorSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Sector creado correctamente');
      router.push(`/dashboard/competitions/manage/${competitionId}/sectors`);
    } else if (lastResult?.status === 'error') {
      const errorMessage = lastResult.error?.message?.[0] || 'Error al crear el sector';
      toast.error(errorMessage);
    }
  }, [lastResult, router, competitionId]);

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Crear Nuevo Sector</h2>
          
          <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">
            <FormInput
              label="Nombre del Sector"
              name={fields.name.name}
              type="text"
              placeholder="ej. Sector 1 (Placa), Muro Principal, etc."
              required
              errors={fields.name.errors}
            />

            <FormInput
              label="Descripción"
              name={fields.description.name}
              type="text"
              placeholder="Descripción opcional del sector (ubicación, características, etc.)"
              errors={fields.description.errors}
            />

            <input type="hidden" name="competitionId" value={competitionId} />

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="btn btn-neutral"
                onClick={() => router.push(`/dashboard/competitions/manage/${competitionId}/sectors`)}
              >
                Volver
              </button>
              
              <SubmitButton
                label="Crear Sector"
                loadingLabel="Creando..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
