'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { addJudgeToCompetition } from '@/app/actions/judge';
import { RutInput } from '@/components/RutInput';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';

import { ManageJudgeSchema } from '../../schemas/manageJudgesSchema';

interface AddJudgeFormProps {
  competitionId: number;
}

export default function AddJudgeForm({ competitionId }: AddJudgeFormProps) {
  const router = useRouter();
  
  const [lastResult, formAction] = useActionState((state: unknown, formData: FormData) => addJudgeToCompetition(state, formData, competitionId), undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ManageJudgeSchema });
    },
  });

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Juez agregado correctamente');
      router.push(`/dashboard/competitions/manage/${competitionId}/judges`);
    } else if (lastResult?.status === 'error') {
      toast.error(lastResult.error?.message?.[0] || 'Error al agregar juez');
    }
  }, [lastResult, router, competitionId]);

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Agregar Juez</h2>
          
          <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                label="Nombre"
                name="name"
                type="text"
                required
                errors={fields.name?.errors}
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                required
                errors={fields.email?.errors}
              />

              <RutInput
                errors={fields.rut?.errors}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="btn btn-outline mt-6"
                onClick={() => router.back()}
              >
                Cancelar
              </button>
              
              <SubmitButton
                label="Agregar"
                loadingLabel="Agregando..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
