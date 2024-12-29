'use client';

import React from 'react';
import { FormField } from './FormField';
import { useCompetitionForm } from '../hooks/useCompetitionForm';
import { FORM_FIELDS } from '../config/formFields';

export default function CompetitionForm() {
  const { formData, errors, handleSubmit, handleChange, generateRandomCode } = useCompetitionForm();

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Crear Nueva Competencia</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              {...FORM_FIELDS.name}
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <FormField
              {...FORM_FIELDS.location}
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              required
            />

            <FormField
              {...FORM_FIELDS.date}
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              required
            />

            <FormField
              {...FORM_FIELDS.duration}
              value={formData.duration || ''}
              onChange={handleChange}
              error={errors.duration}
              required
            />

            <FormField
              {...FORM_FIELDS.code}
              value={formData.code}
              onChange={handleChange}
              error={errors.code}
              required
            >
              <button 
                type="button"
                className="btn join-item"
                onClick={generateRandomCode}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
            </FormField>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Crear Competencia
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
