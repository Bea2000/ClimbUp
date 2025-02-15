import React, { useState } from 'react';

import { formatCurrency, unformatCurrency } from '@/lib/utils';

import FormInput from "./ui/FormInput";

interface PriceInputProps {
  name: string;
  errors: string[] | undefined;
  value?: string;
  onChange?: (value: string) => void;
}

export default function PriceInput({ name, errors, value, onChange }: PriceInputProps) {
  const [displayValue, setDisplayValue] = useState(formatCurrency(value || ''));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value;
    setDisplayValue(formatCurrency(rawValue));
    if (onChange) {
      onChange(unformatCurrency(rawValue));
    }
  }

  return (
    <div>
      <FormInput
        label="Valor de inscripción en CLP"
        name={name}
        type="text"
        required
        min="0"
        value={displayValue}
        placeholder="10.000"
        errors={errors}
        onChange={handleChange}
      />
      
    </div>
  )
}
