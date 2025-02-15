'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { RutInput } from '@/components/RutInput';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';

import { signupSchema, type SignupFormData } from '../schemas/signupSchema';

export function SignupForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        return;
      }

      toast.success('¡Registro exitoso!');
      router.push('/login');
    } catch (error) {
      toast.error(`Error al conectar con el servidor: ${error}`);
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
          errors={errors.name ? [errors.name] : undefined}
        />

        <FormInput
          name="organizerName"
          type="text"
          placeholder="Nombre del organizador / organización"
          errors={errors.organizerName ? [errors.organizerName] : undefined}
        />

        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          errors={errors.email ? [errors.email] : undefined}
        />

        <RutInput
          errors={errors.rut ? [errors.rut] : undefined}
        />

        <FormInput
          name="password"
          type="password"
          placeholder="Contraseña"
          errors={errors.password ? [errors.password] : undefined}
        />

        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirmar Contraseña"
          errors={errors.confirmPassword ? [errors.confirmPassword] : undefined}
        />
      </div>

      <SubmitButton
        label="Registrarse"
        loadingLabel="Registrando..."
      />

      <div className="text-center">
        <Link href="/login" className="text-sm hover:underline">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>
    </form>
  );
} 
