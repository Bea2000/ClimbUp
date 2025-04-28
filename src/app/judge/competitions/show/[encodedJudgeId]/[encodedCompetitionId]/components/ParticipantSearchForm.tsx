'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { searchParticipant } from '@/app/actions/participant';
import FormInput from '@/components/ui/FormInput';
import QrScanner from '@/components/ui/QrScanner';
import SubmitButton from '@/components/ui/SubmitButton';
import { ParticipantWithCompetitionAndProblems } from '@/types/participant';

import { ParticipantSearchSchema } from '../schemas/participantSearchSchema';

interface ParticipantSearchFormProps {
  competitionId: number;
  judgeId: number;
  setParticipants: React.Dispatch<React.SetStateAction<ParticipantWithCompetitionAndProblems[]>>;
  participants: ParticipantWithCompetitionAndProblems[];
}

export default function ParticipantSearchForm({ competitionId, judgeId, setParticipants, participants }: ParticipantSearchFormProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [participantCode, setParticipantCode] = useState('');
  const [lastResult, formAction] = useActionState(
    async (_state: unknown | undefined, formData: FormData) => searchParticipant(undefined, formData, competitionId, judgeId),
    undefined,
  );
  const router = useRouter();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ParticipantSearchSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  function participantExists(prevParticipants: ParticipantWithCompetitionAndProblems[], participantId: number) {
    return prevParticipants.some((p) => p.id === participantId);
  }

  useEffect(() => {
    if (lastResult?.status === 'success' && lastResult.data?.participant) {
      if (participantExists(participants, lastResult.data!.participant.id)) {
        toast.error('El participante ya está en la cola');
        return;
      }
      toast.success('Participante encontrado');
      setParticipants((prevParticipants) => [...prevParticipants, lastResult.data!.participant]);
    } else if (lastResult?.status === 'error') {
      const errorMessage = lastResult.error?.message?.[0] || 'Error al buscar participante';
      toast.error(errorMessage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competitionId, judgeId, lastResult, router, setParticipants]);

  function handleQrSuccess(result: string) {
    setParticipantCode(result);
    setShowScanner(false);
    fields.participantCode.value = result;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Buscar Participante</h2>

          <div className="flex flex-col gap-4">
            <button
              className="btn btn-primary"
              onClick={() => setShowScanner(!showScanner)}
            >
              {showScanner ? 'Cerrar Scanner' : 'Escanear QR'}
            </button>

            {showScanner && (
              <div className="my-4">
                <QrScanner onScan={handleQrSuccess} />
              </div>
            )}

            <div className="divider">O</div>

            <form
              id={form.id}
              onSubmit={form.onSubmit}
              action={formAction}
              className="space-y-4"
            >
              <FormInput
                label="Código del Participante"
                name={fields.participantCode.name}
                type="text"
                placeholder="Ingrese el código del participante"
                required
                value={participantCode}
                onChange={(e) => setParticipantCode(e.target.value)}
                errors={fields.participantCode.errors}
              />

              <SubmitButton
                label="Buscar Participante"
                loadingLabel="Buscando Participante"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 
