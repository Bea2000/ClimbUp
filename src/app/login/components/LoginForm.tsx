'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { FormInput } from '@/components/FormInput';

import { loginSchema } from '../schemas/loginSchema';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
  
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
  
    const validationResult = loginSchema.safeParse({ email, password });
  
    if (!validationResult.success) {
      const formErrors: { email?: string; password?: string } = {};
      validationResult.error.issues.forEach((err) => {
        if (err.path[0] === 'email') {
          formErrors.email = err.message;
        } else if (err.path[0] === 'password') {
          formErrors.password = err.message;
        }
      });
      setErrors(formErrors);
      setLoading(false);
      return;
    }
  
    const signInData = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (signInData?.error) {
      toast.error(signInData.error);
      return;
    }
    toast.success('¡Inicio de sesión exitoso!');
    router.push('/dashboard');
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md space-y-4"
      noValidate
    >
      <FormInput
        name="email"
        type="email"
        placeholder="Email"
        error={errors.email}
      />

      <FormInput
        name="password"
        type="password"
        placeholder="Contraseña"
        error={errors.password}
      />

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        Iniciar sesión
      </button>

      <h2>
        <Link href="/signup">¿No tienes una cuenta? Regístrate</Link>
      </h2>
    </form>
  );
}