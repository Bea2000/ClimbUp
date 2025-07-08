'use client';

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Trash } from "@phosphor-icons/react";
import { Competition } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { updateCompetitionRegisterForm } from "@/app/actions/competition";
import PriceInput from "@/components/PriceInput";
import GoBackButton from "@/components/goBackButton";
import FileInput from "@/components/ui/FileInput";
import FormCheckbox from "@/components/ui/FormCheckbox";
import FormInput from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import SubmitButton from "@/components/ui/SubmitButton";
import Toogle from "@/components/ui/Toogle";
import { fieldTypeOptions } from "@/lib/constant/competition.conf";
import { RegisterFormSettings } from "@/types/competition";

import { editCompetitionRegisterFormSchema } from "../../schemas/CompetitionRegisterFormSchema";

interface EditCompetitionRegisterFormProps {
  competition: Competition;
  basesUrl: string | undefined;
  paymentUrl: string | undefined;
}

export default function EditCompetitionRegisterForm({ competition, basesUrl, paymentUrl }: EditCompetitionRegisterFormProps) {
  const registerFormSettings = competition.registerFormSettings as RegisterFormSettings;
  const [title, setTitle] = useState<string>(registerFormSettings?.title);
  const [description, setDescription] = useState<string>(registerFormSettings?.description);
  const [isFreeChecked, setIsFreeChecked] = useState<boolean>(!registerFormSettings?.paymentRequired);
  const [price, setPrice] = useState<string>(registerFormSettings?.price ? registerFormSettings?.price : '');
  const [isPaymentToggleChecked, setIsPaymentToggleChecked] = useState<boolean>(registerFormSettings?.paymentType === 'file');
  const [paymentLink, setPaymentLink] = useState<string>(registerFormSettings?.paymentType === 'url' ? registerFormSettings?.paymentUrl ?? '' : '');
  const [lastResult, formAction] = useActionState(
    async (state: unknown, formData: FormData) => updateCompetitionRegisterForm(state, formData, competition.id),
    undefined,
  );
  const [newFieldName, setNewFieldName] = useState<string[]>(registerFormSettings?.fields.map((field) => field.name) ?? []);
  const router = useRouter();
  const [newFieldType, setNewFieldType] = useState<string[]>(registerFormSettings?.fields.map((field) => field.type) ?? []);
  const [currentFieldName, setCurrentFieldName] = useState<string>('');
  const [currentFieldType, setCurrentFieldType] = useState<string>('');
  const [form, fields] = useForm({
    lastResult,
    onValidate({formData}) {
      return parseWithZod(formData, {schema: editCompetitionRegisterFormSchema});
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Formulario de registro editado correctamente');
      router.push(`/dashboard/competitions/${competition.id}`);
    } else if (lastResult?.status === 'error') {
      toast.error(lastResult.error?.message?.[0] || 'Error al editar el formulario de registro');
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
    <div className="card flex flex-col gap-4 bg-base-100 shadow-xl">
      <div className="mt-4">
        <GoBackButton />
      </div>
      <div className="card-body">
        <h1 className="card-title mb-6 text-2xl">Editar formulario de registro para {competition.name}</h1>

        <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="space-y-4">
          <FormInput
            label="Título"
            name={fields.title.name}
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            errors={fields.title.errors}
          />

          <FormInput
            label="Descripción"
            name={fields.description.name}
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
                  {registerFormSettings?.paymentType === 'file' && registerFormSettings?.paymentUrl && (
                    <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                      <p className="mt-8 cursor-pointer text-lg text-blue-500">Ver datos de transferencia actuales</p>
                    </a>
                  )}
                  <FileInput
                    label="Cambiar datos de transferencia"
                    name={fields.paymentData.name}
                    accept=".pdf, .jpg, .jpeg, .png, .svg"
                    errors={fields.paymentData.errors}
                  />
                  <p className="mt-8 text-sm text-gray-500">Puedes adjuntar tus datos de transferencia como PDF o imagen.</p>
                </>
              ) : (
                <>
                  <FormInput
                    label="Cambiar link de pago"
                    name={fields.paymentLink.name}
                    type="text"
                    value={paymentLink}
                    errors={fields.paymentLink.errors}
                    onChange={(e) => setPaymentLink(e.target.value)}
                  />
                  <p className="mt-8 text-sm text-gray-500">Recomendamos el uso de <a href="https://www.slach.cl/accounts" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Slach </a>  
              para recibir pagos. Puedes crear un link de pago y pegarlo en el siguiente campo.</p>
                </>
              )}
            </>
          )}

          {registerFormSettings?.competitionBasesFileUrl && (
            <a href={basesUrl} target="_blank" rel="noopener noreferrer">
              <p className="mt-8 cursor-pointer text-lg text-blue-500">Ver bases actuales de la competencia</p>
            </a>
          )}
          <FileInput
            label="Cambiar bases de la competencia"
            name={fields.competitionBases.name}
            accept=".pdf"
            errors={fields.competitionBases.errors}
          />

          <p className="text-lg text-gray-500">Datos del participante</p>

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
            label="Guardar cambios"
            loadingLabel="Guardando..."
          />
        </form>
      </div>
    </div>
  );
}
