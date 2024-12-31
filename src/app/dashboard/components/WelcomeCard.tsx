import Image from "next/image";
import Link from "next/link";

export default function WelcomeCard() {
  return (
    <div className="card image-full bg-base-100 shadow-xl">
      <figure>
        <Image 
          src="/climbing.png" 
          alt="Climbing" 
          className="h-24 w-full object-cover" 
          height={400} 
          width={800} 
        />
      </figure>
      <div className="card-body flex items-center justify-center">
        <h2 className="card-title mb-4 text-3xl">¡Bienvenido a ClimbApp!</h2>
        <Link href="/competitions/create" className="btn btn-primary">
          Crear Nueva Competencia
        </Link>
      </div>
    </div>
  );
} 
