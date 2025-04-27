'use server';

import { SubmissionResult } from "@conform-to/react";
import { ClimbingGrade } from "@prisma/client";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { REVERSE_GRADE_TYPES } from "@/lib/constant/problem.conf";
import { addRegisterFormSettingsToCompetitionById, createNewCompetition, getCompetitionById } from "@/lib/db/competition";
import { uploadBases, uploadPaymentFile } from "@/lib/s3";
import { unformatCurrency } from "@/lib/utils";
import { RegisterFormField, RegisterFormSettings } from "@/types/competition";

type CreateCompetitionResult = SubmissionResult | { status: 'success', competitionId: number };

export async function createCompetition(_prevState: unknown, formData: FormData) : Promise<CreateCompetitionResult> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
  }
  
  const name = formData.get('name') as string;
  const location = formData.get('location') as string;
  const date = new Date(formData.get('date') as string);
  const duration = parseInt(formData.get('duration') as string);
  const code = formData.get('code') as string;
  const organizerId = session?.user.organizerId;
  const levelType = formData.get('levelType') as string;

  const levelTypeEnum = REVERSE_GRADE_TYPES[levelType as keyof typeof REVERSE_GRADE_TYPES] as ClimbingGrade;

  const competitionData = { 
    name, 
    location, 
    date, 
    duration, 
    code, 
    organizerId, 
    levelType: levelTypeEnum,
  };
  
  try {
    const newCompetition = await createNewCompetition(competitionData);
    return { status: 'success', competitionId: newCompetition.id };
  } catch (error) {
    return { status: 'error', error: { message: [`Error al crear la competencia: ${error as string}`] } };
  }
}

export async function createCompetitionRegisterForm(_prevState: unknown, formData: FormData, competitionId: number) : Promise<SubmissionResult> {  
  const session = await getServerSession(authOptions);

  if (!session) {
    return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const isFree = formData.get('isFree') as string;
  const price = formData.get('price') as string;
  const paymentData = formData.get('paymentData') as File;
  const paymentLink = formData.get('paymentLink') as string;
  const competitionBases = formData.get('competitionBases') as File;
  const isPaymentToggleChecked = formData.get('isPaymentToggleChecked') as string;
  const registerFields = JSON.parse(formData.get('registerFields') as string) as RegisterFormField[];

  type PaymentFormData = {
    paymentRequired: boolean;
    paymentUrl?: string;
    paymentType?: 'file' | 'url';
    price?: string;
  }
  
  let paymentFormData : PaymentFormData = { paymentRequired: false };
  if (isFree === 'false') {
    if (isPaymentToggleChecked === 'true') {
      const fileBuffer = await paymentData.arrayBuffer();
      const paymentFileUrl = await uploadPaymentFile(Buffer.from(fileBuffer), paymentData.name, paymentData.type, competitionId);
      paymentFormData = {
        paymentRequired: true,
        paymentUrl: paymentFileUrl,
        paymentType: 'file',
        price: unformatCurrency(price),
      };
    } else {
      paymentFormData = {
        paymentRequired: true,
        paymentUrl: paymentLink,
        paymentType: 'url',
        price: unformatCurrency(price),
      };
    }
  }

  let competitionBasesFileUrl : string | undefined;
  if (competitionBases?.size !== 0) {
    const fileBuffer = await competitionBases.arrayBuffer();
    competitionBasesFileUrl = await uploadBases(Buffer.from(fileBuffer), competitionBases.name, competitionBases.type, competitionId);
  }

  const registerFormData : RegisterFormSettings = {
    title,
    description,
    ...paymentFormData,
    competitionBasesFileUrl,
    fields: registerFields,
  };

  try {
    await addRegisterFormSettingsToCompetitionById(registerFormData, competitionId);
    return { status: 'success' };
  } catch {
    return { status: 'error', error: { message: ['Error al crear el formulario de registro'] } };
  }
}

export async function updateCompetitionRegisterForm(_prevState: unknown, formData: FormData, competitionId: number) : Promise<SubmissionResult> {  
  const session = await getServerSession(authOptions);

  if (!session) {
    return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
  }

  const competition = await getCompetitionById(competitionId);

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const isFree = formData.get('isFree') as string;
  const price = formData.get('price') as string;
  const paymentData = formData.get('paymentData') as File | undefined;
  const paymentLink = formData.get('paymentLink') as string;
  const competitionBases = formData.get('competitionBases') as File;
  const isPaymentToggleChecked = formData.get('isPaymentToggleChecked') as string;
  const registerFields = JSON.parse(formData.get('registerFields') as string) as RegisterFormField[];

  type PaymentFormData = {
    paymentRequired: boolean;
    paymentUrl?: string;
    paymentType?: 'file' | 'url';
    price?: string;
  }

  const registerFormSettings = competition?.registerFormSettings as RegisterFormSettings;
  
  let paymentFormData : PaymentFormData = { paymentRequired: false };
  if (isFree === 'false') {
    if (isPaymentToggleChecked === 'true') {
      if (paymentData) {
        const fileBuffer = await paymentData.arrayBuffer();
        const paymentFileUrl = await uploadPaymentFile(Buffer.from(fileBuffer), paymentData.name, paymentData.type, competitionId);
        paymentFormData = {
          paymentRequired: true,
          paymentUrl: paymentFileUrl,
          paymentType: 'file',
          price: unformatCurrency(price),
        };
      }
    } else {
      if (paymentLink) {
        paymentFormData = {
          paymentRequired: true,
          paymentUrl: paymentLink,
          paymentType: 'url',
          price: unformatCurrency(price),
        };
      }
    }
  }

  if (!paymentData && !paymentLink && isFree === 'false') {
    paymentFormData = {
      paymentRequired: registerFormSettings?.paymentRequired,
      paymentUrl: registerFormSettings?.paymentUrl,
      paymentType: registerFormSettings?.paymentType,
      price: registerFormSettings?.price,
    };
  }

  let competitionBasesFileUrl : string | undefined;
  if (competitionBases?.size !== 0) {
    const fileBuffer = await competitionBases.arrayBuffer();
    competitionBasesFileUrl = await uploadBases(Buffer.from(fileBuffer), competitionBases.name, competitionBases.type, competitionId);
  }

  if (!competitionBasesFileUrl) {
    competitionBasesFileUrl = registerFormSettings?.competitionBasesFileUrl;
  }

  const registerFormData : RegisterFormSettings = {
    title,
    description,
    ...paymentFormData,
    competitionBasesFileUrl,
    fields: registerFields,
  };

  try {
    await addRegisterFormSettingsToCompetitionById(registerFormData, competitionId);
    return { status: 'success' };
  } catch {
    return { status: 'error', error: { message: ['Error al crear el formulario de registro'] } };
  }
}
