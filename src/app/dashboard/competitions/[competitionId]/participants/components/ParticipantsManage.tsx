'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ParticipantStatus } from "@prisma/client";
import React, { useActionState, useState } from "react";
import { toast } from 'react-hot-toast';

import { updateParticipants } from '@/app/actions/participants';
import SubmitButton from '@/components/ui/SubmitButton';
import { ParticipantWithUser } from "@/types/participant";

import { UpdateParticipantsSchema } from '../schemas/UpdateParticipantsSchema';

interface ParticipantsManageProps {
  participants: ParticipantWithUser[];
}

export default function ParticipantsManage({ participants }: ParticipantsManageProps) {
  const [selectedParticipants, setSelectedParticipants] = useState<ParticipantWithUser[]>(participants);
  const originalParticipants = React.useRef(participants);
  const [lastResult, formAction] = useActionState(updateParticipants, undefined);
  const [changedParticipants, setChangedParticipants] = useState<{ id: number; status: ParticipantStatus }[]>([]);
  const [form] = useForm({
    lastResult,
    onValidate({formData}) {
      return parseWithZod(formData, {schema: UpdateParticipantsSchema});
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  function toggleParticipantStatus(id: number | 'all', status: ParticipantStatus, currentStatus: ParticipantStatus) {
    if (id === 'all') {
      setSelectedParticipants(selectedParticipants.map(participant => (
        participant.status === currentStatus
          ? { ...participant, status }
          : participant
      )));
    } else {
      setSelectedParticipants(selectedParticipants.map(participant =>
        ((participant.id === id && participant.status === currentStatus)
          ? { ...participant, status }
          : participant),
      ));
    }
  }

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Cambios confirmados');
    } else if (lastResult?.status === 'error') {
      toast.error(lastResult.error?.message?.[0] || 'Error al confirmar cambios');
    }
  }, [lastResult]);

  React.useEffect(() => {
    const newChangedParticipants = selectedParticipants.filter(participant => {
      const original = originalParticipants.current.find(p => p.id === participant.id);
      return original && original.status !== participant.status;
    }).map(participant => ({
      id: participant.id,
      status: participant.status,
    }));

    setChangedParticipants(newChangedParticipants);
  }, [selectedParticipants]);

  const confirmedParticipants = selectedParticipants.filter(participant => participant.status === ParticipantStatus.CONFIRMED);
  const pendingParticipants = selectedParticipants.filter(participant => participant.status === ParticipantStatus.PENDING);
  const rejectedParticipants = selectedParticipants.filter(participant => participant.status === ParticipantStatus.REJECTED);

  return (
    <div className="w-full p-16">
      <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="w-full space-y-4 px-4">
        <div className="flex items-end justify-between">
          <h1 className="text-2xl font-bold leading-10">Gestionar participantes</h1>
          <SubmitButton label="Confirmar cambios" loadingLabel="Confirmando..." disabled={changedParticipants.length === 0}/>
        </div>
        
        <h2 className="mb-2 text-xl">Participantes pendientes</h2>
        <div className="mb-4">
          <button className="btn btn-primary mr-2" disabled={pendingParticipants.length === 0} onClick={() => toggleParticipantStatus('all', ParticipantStatus.CONFIRMED, ParticipantStatus.PENDING)}>Confirmar todos</button>
          <button className="btn btn-secondary" disabled={pendingParticipants.length === 0} onClick={() => toggleParticipantStatus('all', ParticipantStatus.REJECTED, ParticipantStatus.PENDING)}>Rechazar todos</button>
        </div>
        <table className="table mb-8 w-full">
          <thead>
            <tr>
              <th className="w-1/4">Nombre</th>
              <th className="w-1/4">Email</th>
              <th className="w-1/4">RUT</th>
              <th className="w-1/3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pendingParticipants.map(participant => (
              <tr key={participant.id}>
                <td>{participant.user.name}</td>
                <td>{participant.user.email}</td>
                <td>{participant.user.rut}</td>
                <td>
                  <button className="btn btn-info btn-sm mr-2">Ver datos de inscripción</button>
                  <button className="btn btn-success btn-sm mr-2" onClick={() => toggleParticipantStatus(participant.id, ParticipantStatus.CONFIRMED, ParticipantStatus.PENDING)}>Confirmar</button>
                  <button className="btn btn-error btn-sm" onClick={() => toggleParticipantStatus(participant.id, ParticipantStatus.REJECTED, ParticipantStatus.PENDING)}>Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="mb-2 text-xl">Participantes confirmados</h2>
        <table className="table mb-8 w-full">
          <thead>
            <tr>
              <th className="w-1/4">Nombre</th>
              <th className="w-1/4">Email</th>
              <th className="w-1/4">RUT</th>
              <th className="w-1/3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {confirmedParticipants.map(participant => (
              <tr key={participant.id}>
                <td>{participant.user.name}</td>
                <td>{participant.user.email}</td>
                <td>{participant.user.rut}</td>
                <td>
                  <button className="btn btn-info btn-sm mr-2">Ver datos de inscripción</button>
                  <button className="btn btn-error btn-sm" onClick={() => toggleParticipantStatus(participant.id, ParticipantStatus.REJECTED, ParticipantStatus.CONFIRMED)}>Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="mb-2 text-xl">Participantes rechazados</h2>
        <table className="table mb-8 w-full">
          <thead>
            <tr>
              <th className="w-1/4">Nombre</th>
              <th className="w-1/4">Email</th>
              <th className="w-1/4">RUT</th>
              <th className="w-1/3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rejectedParticipants.map(participant => (
              <tr key={participant.id}>
                <td>{participant.user.name}</td>
                <td>{participant.user.email}</td>
                <td>{participant.user.rut}</td>
                <td>
                  <button className="btn btn-info btn-sm mr-2">Ver datos de inscripción</button>
                  <button className="btn btn-success btn-sm" onClick={() => toggleParticipantStatus(participant.id, ParticipantStatus.CONFIRMED, ParticipantStatus.REJECTED)}>Aceptar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <input type="hidden" name="participantsUpdated" value={JSON.stringify(changedParticipants)} />
      </form>
    </div>
  );
}
