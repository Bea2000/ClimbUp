'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React, { useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { searchCompetition } from '@/app/actions/competition';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';
import { encodeIdInBloat } from '@/lib/encoder';

import { SearchCompetitionSchema } from '../schemas/searchCompetitionSchema';

export default function SearchCompetitionForm() {
  const [competitions, setCompetitions] = React.useState<Array<{
    id: number;
    name: string;
    location: string;
    date: Date;
    code: string;
    organizerName: string;
  }>>([]);

  const [lastResult, formAction] = useActionState(searchCompetition, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SearchCompetitionSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      setCompetitions(lastResult.data?.competitions || []);
    } else if (lastResult?.status === 'error') {
      const errorMessage = lastResult.error?.message?.[0] || 'Error al buscar competencias';
      toast.error(errorMessage);
    }
  }, [lastResult]);

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Buscar Competencias</h2>
          
          <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">
            <FormInput
              label="Nombre del Organizador"
              name={fields.organizerName.name}
              type="text"
              placeholder="Ingrese el nombre del organizador"
              required
              errors={fields.organizerName.errors}
            />
            <SubmitButton label="Buscar" />
          </form>

          {competitions.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold">Competencias Encontradas</h3>
              <div className="space-y-4">
                {competitions.map((competition) => (
                  <div key={competition.id} className="card bg-base-200">
                    <div className="card-body">
                      <h4 className="card-title">{competition.name}</h4>
                      <p><strong>Organizador:</strong> {competition.organizerName}</p>
                      <p><strong>Ubicación:</strong> {competition.location}</p>
                      <p><strong>Fecha:</strong> {new Date(competition.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                      <div className="card-actions justify-end">
                        <a 
                          href={`/welcome/competitions/show/${encodeIdInBloat(competition.id)}`} 
                          className="btn btn-primary"
                        >
                          Ingresar
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
