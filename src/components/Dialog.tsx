'use client';

import React from 'react';

interface DialogProps {
  id: string;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Dialog({ id, title, children, actions, isOpen, onClose }: DialogProps) {
  return (
    <dialog id={id} className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="mt-4">{children}</div>
        <div className="modal-action">
          {actions || (
            <button type="button" className="btn" onClick={onClose}>
              Cerrar
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
} 
