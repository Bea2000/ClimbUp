import { getServerSession } from "next-auth/next";

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    return new Response("No autorizado", { status: 401 });
  }
  
  return new Response("Datos protegidos");
} 
