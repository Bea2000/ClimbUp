'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image 
            src="/logo.svg" 
            alt="ClimbUp Logo" 
            width={50} 
            height={50} 
            className="mr-3 invert"
          />
          <span className="text-2xl font-bold text-white">ClimbUp</span>
        </div>
        <div className="flex space-x-4">
          <Link href="/login" className="btn btn-ghost text-white">
            Iniciar Sesión
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}
