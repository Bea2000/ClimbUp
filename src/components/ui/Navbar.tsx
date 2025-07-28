'use client';

import { List, SignOut } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  organizerName: string;
  superAdmin: boolean;
}

export default function Navbar({ organizerName, superAdmin }: NavbarProps) {

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1 flex">
        <div className="dropdown">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="btn btn-ghost"
          >
            <List size={24} color="#f0eaea" />
          </button>
          {isOpen && (
            <ul className="menu dropdown-content z-50 mt-3 w-64 rounded-box bg-base-200 p-2 shadow">
              <li><Link href="/dashboard/competitions" onClick={() => setIsOpen(false)}>Competencias</Link></li>
              <li><Link href="/dashboard/competitions/create" onClick={() => setIsOpen(false)}>Crear Competencia</Link></li>
              {isOpen && superAdmin && (
                <li><Link href="/dashboard/admin/manage" onClick={() => setIsOpen(false)}>Administradores</Link></li>
              )}
              <li><Link href="/dashboard/judges" onClick={() => setIsOpen(false)}>Jueces</Link></li>
            </ul>
          )}
        </div>
        <button className="flex items-center" onClick={() => router.push("/dashboard")}>
          <Image 
            src="/images/logo.svg" 
            alt="ClimbUp Logo" 
            width={40}
            height={40} 
            className="mr-2 invert"
          />
          <span className="text-xl font-bold">{organizerName}</span>
        </button>
      </div>
      <div className="flex-none gap-2">
        <ThemeToggle />
        <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-ghost">
          <SignOut size={24} color="#a3aab8" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
