'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { validateJudge } from '@/app/actions/judge';
import { RutInput } from '@/components/RutInput';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';
import { encodeIdInBloat } from '@/lib/encoder';

import { JudgeValidationSchema } from '../schemas/judgeValidationSchema';

interface JudgeValidationFormProps {
  competitionId: number;
  encodedCompetitionId: string;
}

export default function JudgeValidationForm({ competitionId, encodedCompetitionId }: JudgeValidationFormProps) {
  const router = useRouter();
  const [lastResult, formAction] = useActionState(
    async (_state: unknown | undefined, formData: FormData) => validateJudge(undefined, formData, competitionId),
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: JudgeValidationSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  React.useEffect(() => {
    if (lastResult?.status === 'success' && lastResult.data?.judgeId) {
      const encodedJudgeId = encodeIdInBloat(lastResult.data.judgeId);
      toast.success('Validación exitosa');
      router.push(`/welcome/competitions/show/${encodedCompetitionId}/${encodedJudgeId}`);
    } else if (lastResult?.status === 'error') {
      const errorMessage = lastResult.error?.message?.[0] || 'Error en la validación';
      toast.error(errorMessage);
    }
  }, [lastResult, router, encodedCompetitionId]);

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Validación de Juez</h2>
          
          <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">
            <div className="form-control">
              <label htmlFor={fields.rut.name} className="label">RUT</label>
              <RutInput
                error={fields.rut.errors?.[0]}
              />
            </div>

            <FormInput
              label="Código de Competencia"
              name={fields.competitionCode.name}
              type="text"
              placeholder="Ingrese el código de la competencia"
              required
              errors={fields.competitionCode.errors}
            />

            <SubmitButton label="Validar" />
          </form>
        </div>
      </div>
    </div>
  );
} 
