'use client';

import React, { useState } from 'react';

import Dialog from '@/components/Dialog';

interface CompetitionCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
}

export default function CompetitionCodeModal({ isOpen, onClose, onSubmit }: CompetitionCodeModalProps) {
  const [competitionCode, setCompetitionCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleCodeSubmit() {
    if (!competitionCode.trim()) {
      setErrorMessage('Por favor ingrese un código');
      return;
    }
    onSubmit(competitionCode);
  }

  const actions = (
    <>
      <button onClick={handleCodeSubmit} className="btn btn-primary">
        Verificar
      </button>
      <button onClick={onClose} className="btn">
        Cancelar
      </button>
    </>
  );

  return (
    <Dialog
      id="competition-code-modal"
      title="Ingresar Código de Competencia"
      isOpen={isOpen}
      onClose={onClose}
      actions={actions}
    >
      <input
        type="text"
        value={competitionCode}
        onChange={(e) => setCompetitionCode(e.target.value)}
        className="input input-bordered w-full"
        placeholder="Código de Competencia"
      />
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </Dialog>
  );
}
