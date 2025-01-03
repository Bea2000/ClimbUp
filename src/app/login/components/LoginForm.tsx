'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';


import { EmailIcon } from '@/assets/icons/EmailIcon';
import { EyeIcon } from '@/assets/icons/EyeIcon';
import { EyeSlashIcon } from '@/assets/icons/EyeSlashIcon';
import { LockIcon } from '@/assets/icons/LockIcon';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';

import { loginSchema } from '../schemas/loginSchema';

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      return;
    }
  
    const signInData = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
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
      className="mx-auto mt-8 max-w-lg space-y-4"
      noValidate
    >
      <FormInput
        name="email"
        type="email"
        placeholder="Email"
        errors={errors.email ? [errors.email] : undefined}
        leftIcon={<EmailIcon />}
      />

      <FormInput
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Contraseña"
        errors={errors.password ? [errors.password] : undefined}
        leftIcon={<LockIcon />}
        rightIcon={showPassword ? <EyeSlashIcon /> : <EyeIcon />}
        onRightIconClick={() => setShowPassword(!showPassword)}
      />

      <SubmitButton
        label="Iniciar sesión"
        loadingLabel="Iniciando sesión..."
      />

      <p className="text-center">
        <Link href="/signup" className="text-primary hover:underline">
          ¿No tienes una cuenta? Regístrate
        </Link>
      </p>
    </form>
  );
}
