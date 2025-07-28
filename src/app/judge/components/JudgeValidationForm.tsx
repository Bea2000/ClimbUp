'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Competition } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { findJudge } from '@/app/actions/judge';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';
import { encodeIdInBloat } from '@/lib/encoder';

import CompetitionCodeModal from './CompetitionCodeModal';
import { FoundCompetitionsList } from './FoundCompetitionsList';
import { JudgeValidationSchema } from '../schemas/judgeValidationSchema';

export default function JudgeValidationForm() {
  const router = useRouter();
  const [lastResult, formAction] = useActionState(findJudge, undefined);
  const [competitions, setCompetitions] = React.useState<Competition[]>([]);
  const [organizerName, setOrganizerName] = React.useState<string>('');
  const [judgeId, setJudgeId] = React.useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCompetition, setSelectedCompetition] = React.useState<Competition | null>(null);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: JudgeValidationSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Validación exitosa');
    } else if (lastResult?.status === 'error') {
      const errorMessage = lastResult.error?.message?.[0] || 'No se encontró el juez';
      toast.error(errorMessage);
    }
    setCompetitions(lastResult?.data?.competitions || []);
    setOrganizerName(lastResult?.data?.organizerName || '');
    setJudgeId(lastResult?.data?.judgeId || null);
  }, [lastResult, router]);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleOpenModal(competition: Competition) {
    setSelectedCompetition(competition);
    setIsModalOpen(true);
  }

  function handleCodeSubmit(code: string) {
    if (selectedCompetition) {
      if (selectedCompetition.code === code) {
        toast.success('Competencia ingresada correctamente');
        if (judgeId) {
          router.push(`/judge/competitions/show/${encodeIdInBloat(judgeId)}/${encodeIdInBloat(selectedCompetition.id)}`);
        }
      } else {
        toast.error('Código incorrecto');
      }
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Validación de Juez</h2>
          
          <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">
            <div className="form-control">
              <FormInput
                label="Email"
                name="email"
                type="email"
                errors={fields.email.errors}
              />
            </div>

            <SubmitButton
              label="Buscar"
              loadingLabel="Buscando..."
            />
          </form>
        </div>

        <FoundCompetitionsList competitions={competitions} organizerName={organizerName} handleOpenModal={handleOpenModal}/>
        
        {isModalOpen && (
          <CompetitionCodeModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleCodeSubmit}
          />
        )}
      </div>
    </div>
  );
} 
