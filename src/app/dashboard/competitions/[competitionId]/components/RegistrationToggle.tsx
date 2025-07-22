'use client';

import { useState, useEffect } from 'react';

import { updateCompetitionRegistrationStatus } from '@/app/actions/competition';

interface RegistrationToggleProps {
  competitionId: number;
  initialAcceptsRegistrations: boolean;
  isDisabled: boolean;
}

export function RegistrationToggle({ 
  competitionId, 
  initialAcceptsRegistrations, 
  isDisabled, 
}: RegistrationToggleProps) {
  const [acceptsRegistrations, setAcceptsRegistrations] = useState(initialAcceptsRegistrations);

  useEffect(() => {
    async function updateRegistrationStatus() {
      if (isDisabled && initialAcceptsRegistrations) {
        try {
          const result = await updateCompetitionRegistrationStatus(competitionId, false);
          if (result.status === 'success') {
            setAcceptsRegistrations(false);
          }
        } catch {
          // Ignoramos silenciosamente cualquier error
        }
      }
    }

    updateRegistrationStatus();
  }, [isDisabled, initialAcceptsRegistrations, competitionId]);

  async function handleToggle() {
    const originalValue = acceptsRegistrations;
    const newValue = !originalValue;
    
    try {
      setAcceptsRegistrations(newValue);
      
      const result = await updateCompetitionRegistrationStatus(competitionId, newValue);
      
      if (result.status === 'error') {
        setAcceptsRegistrations(originalValue);
      }
    } catch {
      setAcceptsRegistrations(originalValue);
    }
  }

  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-4">
        <span className="label-text font-medium">
          {acceptsRegistrations ? 'Inscripciones abiertas' : 'Inscripciones cerradas'}
        </span>
        {isDisabled ? (
          <div className="tooltip tooltip-right" data-tip="No se puede modificar porque la fecha de la competencia ya pasó">
            <input 
              type="checkbox" 
              className="toggle toggle-primary" 
              checked={acceptsRegistrations}
              onChange={handleToggle}
              disabled={true}
            />
          </div>
        ) : (
          <input 
            type="checkbox" 
            className="toggle toggle-primary" 
            checked={acceptsRegistrations}
            onChange={handleToggle}
          />
        )}
      </label>
    </div>
  );
}
