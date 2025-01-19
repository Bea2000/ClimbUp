import React from 'react';

export default function ConfirmDialog({ title, message, onConfirm, onCancel }: { title: string; message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onConfirm}>Confirmar</button>
          <button className="btn" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
