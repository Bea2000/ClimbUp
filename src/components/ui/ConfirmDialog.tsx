'use client';

import React from 'react';

interface ConfirmDialogProps {
  id: string;
  title: string;
  message: string;
  onConfirm: (e: React.FormEvent) => void;
}

export default function ConfirmDialog({
  id,
  title,
  message,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form onSubmit={onConfirm} className="flex gap-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                (document.getElementById(id) as HTMLDialogElement)?.close();
              }}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-error">
              Eliminar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
} 
