'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { createAdmin } from '@/app/actions/admin';
import { RutInput } from '@/components/RutInput';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';

import { CreateAdminSchema } from '../schemas/createAdminSchema';

export default function CreateAdminForm() {
  const router = useRouter();
  const [lastResult, formAction] = useActionState(createAdmin, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateAdminSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Administrador creado correctamente');
      router.push('/dashboard/admin/manage');
    } else if (lastResult?.status === 'error') {
      const errorMessage = lastResult.error?.message?.[0] || 'Error al crear el administrador';
      toast.error(errorMessage);
    }
  }, [lastResult, router]);

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Crear Nuevo Administrador</h2>
        
        <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">
          <FormInput
            label="Nombre"
            name={fields.name.name}
            type="text"
            placeholder="Nombre completo"
            required
            errors={fields.name.errors}
          />

          <FormInput
            label="Email"
            name={fields.email.name}
            type="email"
            placeholder="email@ejemplo.com"
            required
            errors={fields.email.errors}
          />

          <div className="form-control">
            <label htmlFor={fields.rut.name} className="label">
              <span className="label-text">RUT</span>
            </label>
            <RutInput
              error={fields.rut.errors?.[0]}
            />
          </div>

          <FormInput
            label="Contraseña"
            name={fields.password.name}
            type="password"
            placeholder="********"
            required
            errors={fields.password.errors}
          />

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <span className="label-text">Super Administrador</span>
              <input
                type="checkbox"
                name={fields.isSuperAdmin.name}
                className="checkbox"
              />
            </label>
          </div>

          <SubmitButton 
            label="Crear Administrador"
            loadingLabel="Creando..."
          />
        </form>
      </div>
    </div>
  );
} 
