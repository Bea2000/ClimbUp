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
import { encodeIdInBloat } from '@/lib/encoder';

import { ParticipantSearchSchema } from '../schemas/participantSearchSchema';

export default function ParticipantSearchForm({ competitionId, judgeId }: { competitionId: number, judgeId: number }) {
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

  useEffect(() => {
    if (lastResult?.status === 'success' && lastResult.data) {
      toast.success('Participante encontrado');
      router.push(`/welcome/competitions/show/${encodeIdInBloat(competitionId)}/${encodeIdInBloat(judgeId)}/participant/${encodeIdInBloat(lastResult.data.id)}`);
    } else if (lastResult?.status === 'error') {
      const errorMessage = lastResult.error?.message?.[0] || 'Error al buscar participante';
      toast.error(errorMessage);
    }
  }, [competitionId, judgeId, lastResult, router]);

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

              <SubmitButton label="Buscar Participante" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 
