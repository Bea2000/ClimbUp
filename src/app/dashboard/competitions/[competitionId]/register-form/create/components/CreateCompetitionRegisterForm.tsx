'use client';

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Trash } from "@phosphor-icons/react";
import { Competition } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { createCompetitionRegisterForm } from "@/app/actions/competition";
import PriceInput from "@/components/PriceInput";
import GoBackButton from "@/components/goBackButton";
import FileInput from "@/components/ui/FileInput";
import FormCheckbox from "@/components/ui/FormCheckbox";
import FormInput from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import SubmitButton from "@/components/ui/SubmitButton";
import Toogle from "@/components/ui/Toogle";
import { fieldTypeOptions } from "@/lib/constant/competition.conf";

import { createCompetitionRegisterFormSchema } from "../../schemas/CompetitionRegisterFormSchema";

interface CreateCompetitionRegisterFormProps {
  competition: Competition;
}

export default function CreateCompetitionRegisterForm({ competition }: CreateCompetitionRegisterFormProps) {
  const [isFreeChecked, setIsFreeChecked] = useState<boolean>(false);
  const [isPaymentToggleChecked, setIsPaymentToggleChecked] = useState<boolean>(false);
  const [lastResult, formAction] = useActionState(
    async (state: unknown, formData: FormData) => createCompetitionRegisterForm(state, formData, competition.id),
    undefined,
  );
  const [newFieldName, setNewFieldName] = useState<string[]>([]);
  const router = useRouter();
  const [newFieldType, setNewFieldType] = useState<string[]>([]);
  const [currentFieldName, setCurrentFieldName] = useState<string>('');
  const [currentFieldType, setCurrentFieldType] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const [form, fields] = useForm({
    lastResult,
    onValidate({formData}) {
      return parseWithZod(formData, {schema: createCompetitionRegisterFormSchema});
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Formulario de registro creado correctamente');
      router.push(`/dashboard/competitions/${competition.id}`);
    } else if (lastResult?.status === 'error') {
      toast.error(lastResult.error?.message?.[0] || 'Error al crear el formulario de registro');
    }
  }, [lastResult, router, competition.id]);

  function handleAddField() {
    if (currentFieldName && currentFieldType) {
      setNewFieldName([...newFieldName, currentFieldName]);
      setNewFieldType([...newFieldType, currentFieldType]);
      setCurrentFieldName('');
      setCurrentFieldType('');
    }
  }

  function handleDeleteField(index: number) {
    setNewFieldName(newFieldName.filter((_, i) => i !== index));
    setNewFieldType(newFieldType.filter((_, i) => i !== index));
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="mt-4">
        <GoBackButton />
      </div>
      <div className="card-body">
        <h1 className="card-title mb-6 text-2xl">Crear formulario de registro para {competition.name}</h1>

        <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">
          <FormInput
            label="Título"
            name={fields.title.name}
            type="text"
            required
            placeholder="Título del formulario de registro"
            errors={fields.title.errors}
          />

          <FormInput
            label="Descripción"
            name={fields.description.name}
            type="text"
            required
            placeholder="Descripción del formulario de registro"
            errors={fields.description.errors}
          />

          <FormCheckbox
            label="Gratuito"
            name={fields.isFree.name}
            checked={isFreeChecked}
            onChange={() => setIsFreeChecked(!isFreeChecked)}
            errors={fields.isFree.errors}
          />

          {!isFreeChecked && (
            <>
              <PriceInput
                name={fields.price.name}
                errors={fields.price.errors}
                value={price}
                onChange={(value) => setPrice(value)}
              />  
              <br></br>
              <Toogle
                label={isPaymentToggleChecked ? "Link de pago" : "Datos de transferencia"}
                checked={isPaymentToggleChecked}
                onChange={() => setIsPaymentToggleChecked(!isPaymentToggleChecked)}
              />

              <input type="hidden" name={fields.isPaymentToggleChecked.name} value={isPaymentToggleChecked ? 'true' : 'false'} />
              {isPaymentToggleChecked ? (
                <>
                  <FileInput
                    label="Datos de transferencia"
                    name={fields.paymentData.name}
                    accept=".pdf, .jpg, .jpeg, .png, .svg"
                    errors={fields.paymentData.errors}
                  />
                  <p className="mt-8 text-sm text-gray-500">Puedes adjuntar tus datos de transferencia como PDF o imagen.</p>
                </>
              ) : (
                <>
                  <FormInput
                    label="Link de pago"
                    name={fields.paymentLink.name}
                    type="text"
                    errors={fields.paymentLink.errors}
                  />
                  <p className="mt-8 text-sm text-gray-500">Recomendamos el uso de <a href="https://www.slach.cl/accounts" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Slach </a>  
              para recibir pagos. Puedes crear un link de pago y pegarlo en el siguiente campo.</p>
                </>
              )}
            </>
          )}

          <FileInput
            label="Bases de la competencia (opcional)"
            name={fields.competitionBases.name}
            accept=".pdf"
            errors={fields.competitionBases.errors}
          />

          <p className="text-lg text-gray-500">Datos del participante</p>
          <p className="text-sm text-gray-500"> * Climbup pide el RUT del participante para poder registrarlos en la competencia.</p>

          <input
            type="hidden"
            name={fields.registerFields.name}
            value={JSON.stringify(
              newFieldName.map((fieldName, index) => ({
                name: fieldName,
                type: newFieldType[index],
              })),
            )}
          />
          {fields.registerFields.errors?.[0] && (
            <p className="text-error">{fields.registerFields.errors?.[0]}</p>
          )}

          {newFieldName.length > 0 && newFieldName.map((fieldName, index) => (
            <div key={index} className="flex flex-row items-center gap-2">
              <p className="flex-none">- {fieldName}:</p>
              <p className="flex-none text-gray-500">{newFieldType[index]}</p>
              <button
                type="button"
                className="btn btn-ghost btn-sm text-error"
                onClick={() => handleDeleteField(index)}
              >
                <Trash className="size-5" />
              </button>
            </div>
          ))}
          <div className="flex flex-row items-end gap-4">
            <FormInput
              label="Nombre del campo"
              name="currentFieldName"
              type="text"
              value={currentFieldName}
              onChange={(e) => setCurrentFieldName(e.target.value)}
            />

            <FormSelect
              label="Tipo de campo"
              name="currentFieldType"
              options={fieldTypeOptions}
              placeholder="Selecciona un tipo de campo"
              required={false}
              errors={undefined}
              value={currentFieldType}
              onChange={(value) => setCurrentFieldType(value)}
            />

            <button 
              className="btn btn-primary" 
              onClick={handleAddField}
              disabled={!currentFieldName || !currentFieldType}
            >
              Agregar campo
            </button>
          </div>

          <SubmitButton
            label="Crear formulario de registro"
            loadingLabel="Creando..."
          />
        </form>
      </div>
    </div>
  );
}
