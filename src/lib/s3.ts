import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadPaymentReceipt(file: Buffer, fileName: string, contentType: string, participantId: number) {
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: `payment-receipts/${participantId}/${fileName}`,
    Body: file,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    return `payment-receipts/${participantId}/${fileName}`;
  } catch {
    throw new Error("Error al subir archivo");
  }
}

export async function uploadBases(file: Buffer, fileName: string, contentType: string, competitionId: number) {
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: `bases/${competitionId}/${fileName}`,
    Body: file,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    return `bases/${competitionId}/${fileName}`;
  } catch {
    throw new Error("Error al subir archivo");
  }
}

export async function getSignedUrlForReading(fileName: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: fileName,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch {
    throw new Error("Error al generar URL firmada");
  }
}

export async function uploadPaymentFile(file: Buffer, fileName: string, contentType: string, competitionId: number) {
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: `payment-files/${competitionId}/${fileName}`,
    Body: file,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    return `payment-files/${competitionId}/${fileName}`;
  } catch {
    throw new Error("Error al subir archivo");
  }
}
