'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { FormInput } from '@/components/FormInput';
import { RutInput } from '@/components/RutInput';

import { signupSchema, type SignupFormData } from '../schemas/signupSchema';

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      rut: formData.get('rut') as string,
      organizerName: formData.get('organizerName') as string,
    };

    const validationResult = signupSchema.safeParse(data);

    if (!validationResult.success) {
      const formErrors = validationResult.error.issues.reduce((acc, issue) => ({
        ...acc,
        [issue.path[0]]: issue.message,
      }), {});
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || 'Error al registrar usuario');
        setLoading(false);
        return;
      }

      toast.success('¡Registro exitoso!');
      router.push('/login');
    } catch (error) {
      toast.error(`Error al conectar con el servidor: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto space-y-4"
      noValidate
    >
      <div className="flex flex-col gap-4">
        <FormInput
          name="name"
          type="text"
          placeholder="Nombre"
          error={errors.name}
        />

        <FormInput
          name="organizerName"
          type="text"
          placeholder="Nombre del organizador / organización"
          error={errors.organizerName}
        />

        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          error={errors.email}
        />

        <RutInput
          error={errors.rut}
        />

        <FormInput
          name="password"
          type="password"
          placeholder="Contraseña"
          error={errors.password}
        />

        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirmar Contraseña"
          error={errors.confirmPassword}
        />
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        Registrarse
      </button>

      <div className="text-center">
        <Link href="/login" className="text-sm hover:underline">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>
    </form>
  );
} 
