'use client'

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ClimbingGrade } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { createProblem } from '@/app/actions/problem';
import FormInput from '@/components/ui/FormInput';
import { FormSelect } from '@/components/ui/FormSelect';
import SubmitButton from '@/components/ui/SubmitButton';
import { CLIMBING_GRADES } from '@/lib/constant/problem.conf';

import { ManageProblemSchema } from '../schemas/manageProblemsSchema';

interface AddProblemFormProps {
  competitionId: number;
  levelType: ClimbingGrade;
}

export default function AddProblemForm({ competitionId, levelType }: AddProblemFormProps) {
  const router = useRouter();
  const [lastResult, formAction] = useActionState(createProblem, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ManageProblemSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Problema creado correctamente');
      router.push(`/dashboard/competitions/manage/${competitionId}/problems`);
    } else if (lastResult?.status === 'error') {
      const errorMessage = lastResult.error?.message?.[0] || 'Error al crear el problema';
      toast.error(errorMessage);
    }
  }, [lastResult, router, competitionId]);

  const levelOptions = Object.values(CLIMBING_GRADES[levelType]);

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Agregar Nuevo Problema</h2>
          
          <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">
            <FormInput
              label="Nombre"
              name={fields.name.name}
              type="text"
              placeholder="Nombre del problema"
              errors={fields.name.errors}
            />

            <FormSelect
              label="Nivel"
              name={fields.level.name}
              placeholder="Seleccione un nivel"
              options={levelOptions}
              required
              errors={fields.level.errors}
            />

            <FormInput
              label="Puntos Máximos"
              name={fields.maxPoints.name}
              type="number"
              placeholder="Ej: 100"
              required
              min="1"
              errors={fields.maxPoints.errors}
            />

            <FormInput
              label="Intentos Permitidos"
              name={fields.attempts.name}
              type="number"
              placeholder="Ej: 3"
              required
              min="1"
              errors={fields.attempts.errors}
            />

            <FormInput
              label="Descuento por Intento"
              name={fields.discountPerAttempt.name}
              type="number"
              placeholder="Ej: 10"
              required
              min="0"
              errors={fields.discountPerAttempt.errors}
            />

            <input type="hidden" name="competitionId" value={competitionId} />

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="btn btn-neutral"
                onClick={() => router.push(`/dashboard/competitions/manage/${competitionId}/problems`)}
              >
                Volver
              </button>
              
              <SubmitButton
                label="Crear Problema"
                loadingLabel="Creando..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
