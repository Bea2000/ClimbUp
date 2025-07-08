'use client';

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { CaretRight, FileText, CreditCard } from "@phosphor-icons/react";
import { Competition, Organizer } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { registerToCompetition } from "@/app/actions/competition";
import { RutInput } from "@/components/RutInput";
import FileInput from "@/components/ui/FileInput";
import FormInput from "@/components/ui/FormInput";
import SubmitButton from "@/components/ui/SubmitButton";
import { RegisterFormSettings } from "@/types/competition";

import { createRegisterFormSchema } from "../schemas/RegisterFormSchema";

interface RegisterFormProps {
  competition: Competition
  organizer: Organizer;
  paymentUrl?: string;
  competitionBasesUrl?: string;
}

export default function RegisterForm({ competition, organizer, paymentUrl, competitionBasesUrl }: RegisterFormProps) {
  const router = useRouter();
  const [lastResult, formAction] = useActionState(
    async (state: unknown, formData: FormData) => registerToCompetition(state, formData, competition.id),
    undefined,
  );

  const registerFormSettings = competition.registerFormSettings as RegisterFormSettings;
  
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      const result = parseWithZod(formData, { 
        schema: createRegisterFormSchema(registerFormSettings),
      });
      return result
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Registro completado correctamente');
    } else if (lastResult?.status === 'error') {
      toast.error(lastResult.error?.message?.[0] || 'Error al registrarse');
    }
  }, [lastResult, router, organizer, competition.id]);
  return (
    <div className="my-10 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xl overflow-hidden rounded-xl shadow-lg transition-all">
        <div className="bg-gradient-to-r from-primary/80 to-primary p-6 text-white">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {organizer.name}
          </h1>
          <p className="mt-1 text-lg font-medium md:text-xl">
            {registerFormSettings.title}
          </p>
        </div>
        
        <div className="space-y-6 p-6 md:p-8">
          <div className="dark:prose-invert prose max-w-none">
            <p className="text-gray-600 dark:text-gray-300">
              {registerFormSettings.description}
            </p>
          </div>

          {competitionBasesUrl && (
            <div className="flex items-center gap-3 rounded-lg p-4 transition-all">
              <FileText className="size-5 text-primary" />
              <a 
                href={competitionBasesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-medium text-primary transition-all hover:text-primary/80"
              >
                Ver bases de la competencia
                <CaretRight className="size-4" />
              </a>
            </div>
          )}

          <form id={form.id} action={formAction} onSubmit={form.onSubmit} className="space-y-5">
            <div className="space-y-4">
              <RutInput
                errors={fields.rut?.errors}
              />
              
              {registerFormSettings.fields.map((field, index) => (
                <FormInput
                  key={index}
                  label={field.name}
                  name={`field_${index}`}
                  type={field.type === 'number' ? 'number' : 'text'}
                  placeholder={`Ingrese ${field.name.toLowerCase()}`}
                  errors={fields[`field_${index}` as keyof typeof fields]?.errors}
                />
              ))}
            </div>

            {registerFormSettings.paymentRequired && (
              <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-5 text-primary" />
                    <h2 className="text-lg font-semibold">Información de pago</h2>
                  </div>

                  <div className="flex flex-col gap-3 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Precio:</span>
                      <span className="text-lg font-bold">
                        ${new Intl.NumberFormat('es-CL').format(Number(registerFormSettings.price) || 0)} CLP
                      </span>
                    </div>
                    
                    {paymentUrl ? (
                      <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                        <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">Datos de transferencia:</p>
                        <a 
                          href={paymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-medium text-primary transition-all hover:text-primary/80"
                        >
                          Ver datos de transferencia
                          <CaretRight className="size-4" />
                        </a>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                        <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">Link de pago:</p>
                        <a 
                          href={registerFormSettings.paymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-medium text-primary transition-all hover:text-primary/80"
                        >
                          Ir al link de pago
                          <CaretRight className="size-4" />
                        </a>
                      </div>
                    )}
                  </div>
                  <div>
                    <FileInput 
                      label="Subir comprobante de pago"
                      name="paymentFile"
                      errors={fields.paymentFile?.errors}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4">
              <SubmitButton 
                label="Registrarse"
                loadingLabel="Registrando..."
              />
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Desarrollado por <span className="font-semibold">ClimbUp</span> © 2025
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
